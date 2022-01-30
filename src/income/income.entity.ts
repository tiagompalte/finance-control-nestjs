import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base'

@Entity('income')
export class IncomeEntity extends BaseEntity {
  @Column({
    nullable: false
  })
  description: string

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: false
  })
  value: number

  @Column({
    type: 'date'
  })
  date: Date
}
