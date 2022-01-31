import { BadRequestException, Injectable } from '@nestjs/common'
import { ExpenseRepository } from './expense.repository'
import { ExpenseEntity } from './expense.entity'
import { ILike } from 'typeorm'
import { BalanceCategoryExpenseDto } from '../balance/balance-category-expense.dto'

@Injectable()
export class ExpenseService {
  constructor(private readonly repository: ExpenseRepository) {}

  async create(expense: Partial<ExpenseEntity>): Promise<ExpenseEntity> {
    await this.validateDescription(
      expense.description,
      expense.date,
      expense.id
    )
    return this.repository.save(expense)
  }

  async findAll(
    description?: string,
    withDeleted = false
  ): Promise<ExpenseEntity[]> {
    return this.repository.find({
      where: description
        ? {
            description: ILike(`%${description}%`)
          }
        : {},
      withDeleted
    })
  }

  async findById(id: string, withDeleted = false): Promise<ExpenseEntity> {
    return this.repository.findOne(id, { withDeleted })
  }

  async findByYearMonth(year: number, month: number): Promise<ExpenseEntity[]> {
    return this.repository
      .createQueryBuilder('expense')
      .select()
      .innerJoin(
        (qb) =>
          qb
            .select('id')
            .addSelect('month(date)', 'month')
            .addSelect('year(date)', 'year')
            .from(ExpenseEntity, 'exp'),
        'exp',
        'expense.id = exp.id'
      )
      .where('exp.month = :month && exp.year = :year', { month, year })
      .getMany()
  }

  async balanceGroupByCategoryInYearMonth(
    year: number,
    month: number
  ): Promise<BalanceCategoryExpenseDto[]> {
    return this.repository
      .createQueryBuilder('expense')
      .select('expense.category', 'category')
      .addSelect('sum(expense.value)', 'value')
      .innerJoin(
        (qb) =>
          qb
            .select('id')
            .addSelect('month(date)', 'month')
            .addSelect('year(date)', 'year')
            .from(ExpenseEntity, 'exp'),
        'exp',
        'expense.id = exp.id'
      )
      .where('exp.month = :month && exp.year = :year', { month, year })
      .groupBy('category')
      .getRawMany()
  }

  async update(
    id: string,
    expense: Partial<ExpenseEntity>
  ): Promise<ExpenseEntity> {
    expense.id = id
    await this.validateDescription(
      expense.description,
      expense.date,
      expense.id
    )
    return this.repository.recover(expense)
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }

  private async validateDescription(
    description: string,
    date: Date,
    id?: string
  ): Promise<void> {
    let where =
      'description = :description && exp.month = :month && exp.year = :year'
    const parameters: any = {
      description,
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }
    if (id) {
      where = where.concat(' && id != :id')
      parameters.id = id
    }

    const count = await this.repository
      .createQueryBuilder('expense')
      .select(['expense.month', 'expense.year'])
      .innerJoin(
        (qb) =>
          qb
            .select('id')
            .addSelect('month(date)', 'month')
            .addSelect('year(date)', 'year')
            .from(ExpenseEntity, 'exp'),
        'exp',
        'expense.id = exp.id'
      )
      .where(where, parameters)
      .getCount()

    if (count) {
      throw new BadRequestException(
        'Expense with the same description and date exists'
      )
    }
  }
}
