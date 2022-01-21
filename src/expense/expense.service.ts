import { BadRequestException, Injectable } from '@nestjs/common'
import { ExpenseRepository } from './expense.repository'
import { ExpenseEntity } from './expense.entity'
import { DateUtil } from '../util/DateUtil'

@Injectable()
export class ExpenseService {
  constructor(private readonly repository: ExpenseRepository) {}

  async create(expense: Partial<ExpenseEntity>): Promise<ExpenseEntity> {
    expense.date = DateUtil.convertToDate(expense.date)
    await this.validateDescription(
      expense.description,
      expense.date,
      expense.id
    )
    return this.repository.save(expense)
  }

  async findAll(withDeleted?: boolean): Promise<ExpenseEntity[]> {
    return this.repository.find({ withDeleted })
  }

  async findById(id: string, withDeleted?: boolean): Promise<ExpenseEntity> {
    return this.repository.findOne(id, { withDeleted })
  }

  async update(
    id: string,
    expense: Partial<ExpenseEntity>
  ): Promise<ExpenseEntity> {
    expense.date = DateUtil.convertToDate(expense.date)
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
      .createQueryBuilder()
      .select(['exp.month', 'exp.year'])
      .addFrom((subQuery) => {
        return subQuery
          .select('month(date)', 'month')
          .addSelect('year(date)', 'year')
          .from(ExpenseEntity, 'expense')
      }, 'exp')
      .where(where, parameters)
      .getCount()

    if (count) {
      throw new BadRequestException(
        'Expense with the same description and date exists'
      )
    }
  }
}
