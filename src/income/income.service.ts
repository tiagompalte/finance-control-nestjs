import { BadRequestException, Injectable } from '@nestjs/common'
import { IncomeRepository } from './income.repository'
import { IncomeEntity } from './income.entity'
import { ILike } from 'typeorm'

@Injectable()
export class IncomeService {
  constructor(private readonly repository: IncomeRepository) {}

  async create(income: Partial<IncomeEntity>): Promise<IncomeEntity> {
    await this.validateDescription(income.description, income.date)
    return this.repository.save(income)
  }

  async findAll(
    description?: string,
    withDeleted = false
  ): Promise<IncomeEntity[]> {
    return this.repository.find({
      where: description
        ? {
            description: ILike(`%${description}%`)
          }
        : {},
      withDeleted
    })
  }

  async findById(id: string, withDeleted = false): Promise<IncomeEntity> {
    return this.repository.findOne(id, { withDeleted })
  }

  async findByYearMonth(year: number, month: number): Promise<IncomeEntity[]> {
    return this.repository
      .createQueryBuilder('income')
      .select()
      .innerJoin(
        (qb) =>
          qb
            .select('id')
            .addSelect('month(date)', 'month')
            .addSelect('year(date)', 'year')
            .from(IncomeEntity, 'inc'),
        'inc',
        'income.id = inc.id'
      )
      .where('inc.month = :month && inc.year = :year', { month, year })
      .getMany()
  }

  async balanceByYearMonth(year: number, month: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('income')
      .select('sum(income.value)', 'balance')
      .innerJoin(
        (qb) =>
          qb
            .select('id')
            .addSelect('month(date)', 'month')
            .addSelect('year(date)', 'year')
            .from(IncomeEntity, 'inc'),
        'inc',
        'income.id = inc.id'
      )
      .where('inc.month = :month && inc.year = :year', { month, year })
      .getRawOne()

    return result.balance
  }

  async update(
    id: string,
    income: Partial<IncomeEntity>
  ): Promise<IncomeEntity> {
    income.id = id
    await this.validateDescription(income.description, income.date, income.id)
    return this.repository.save(income)
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
      'description = :description && inc.month = :month && inc.year = :year'
    const parameters: any = {
      description,
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }
    if (id) {
      where = where.concat(' && inc.id != :id')
      parameters.id = id
    }

    const count = await this.repository
      .createQueryBuilder('income')
      .select(['income.month', 'income.year'])
      .innerJoin(
        (qb) =>
          qb
            .select('id')
            .addSelect('month(date)', 'month')
            .addSelect('year(date)', 'year')
            .from(IncomeEntity, 'inc'),
        'inc',
        'income.id = inc.id'
      )
      .where(where, parameters)
      .getCount()

    if (count) {
      throw new BadRequestException(
        'Income with the same description and date exists'
      )
    }
  }
}
