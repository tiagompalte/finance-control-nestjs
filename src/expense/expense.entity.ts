import { BaseEntity } from '../base'
import { Column, Entity } from 'typeorm'

@Entity('expense')
export class ExpenseEntity extends BaseEntity {
  @Column({
    nullable: false
  })
  description: string

  @Column({
    type: 'double',
    scale: 2,
    nullable: false
  })
  value: number

  @Column({
    type: 'date'
  })
  date: Date
}
