import { BaseEntity } from '../base'
import { Column, Entity } from 'typeorm'
import { CategoryEnum } from './category.enum'

@Entity('tb_expense')
export class ExpenseEntity extends BaseEntity {
  @Column()
  description: string

  @Column()
  value: number

  @Column()
  date: Date

  @Column()
  category?: CategoryEnum
}
