import { Injectable } from '@nestjs/common'
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
    return this.repository.recover(income)
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }
}
