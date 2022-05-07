import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base'

@Entity('tb_income')
export class IncomeEntity extends BaseEntity {
  @Column()
  description: string

  @Column()
  value: number

  @Column()
  date: Date
}
