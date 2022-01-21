import { BadRequestException, Injectable } from '@nestjs/common'
import { IncomeRepository } from './income.repository'
import { IncomeEntity } from './income.entity'

@Injectable()
export class IncomeService {
  constructor(private readonly repository: IncomeRepository) {}

  private static validateDate(date: Date): Date {
    if (!date) {
      return date
    }
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return new Date(
      [date?.getFullYear(), date?.getMonth() + 1, date?.getDate()].join('-')
    )
  }

  async create(income: Partial<IncomeEntity>): Promise<IncomeEntity> {
    income.date = IncomeService.validateDate(income.date)
    await this.validateDescription(income.description, income.date, income.id)
    return this.repository.save(income)
  }

  async findAll(withDeleted?: boolean): Promise<IncomeEntity[]> {
    return this.repository.find({ withDeleted })
  }

  async findById(id: string, withDeleted?: boolean): Promise<IncomeEntity> {
    return this.repository.findOne(id, { withDeleted })
  }

  async update(
    id: string,
    income: Partial<IncomeEntity>
  ): Promise<IncomeEntity> {
    income.date = IncomeService.validateDate(income.date)
    income.id = id
    await this.validateDescription(income.description, income.date, income.id)
    return this.repository.recover(income)
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
      where = where.concat(' && id != :id')
      parameters.id = id
    }

    const count = await this.repository
      .createQueryBuilder()
      .select(['inc.month', 'inc.year'])
      .addFrom((subQuery) => {
        return subQuery
          .select('month(date)', 'month')
          .addSelect('year(date)', 'year')
          .from(IncomeEntity, 'income')
      }, 'inc')
      .where(where, parameters)
      .getCount()

    if (count) {
      throw new BadRequestException(
        'Income with the same description and date exists'
      )
    }
  }
}
