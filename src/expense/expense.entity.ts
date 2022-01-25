import { BaseEntity } from '../base'
import { Column, Entity } from 'typeorm'
import { CategoryEnum } from './category.enum'

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
    type: 'date',
    nullable: false
  })
  date: Date

  @Column({
    type: 'enum',
    enum: CategoryEnum,
    nullable: true,
    default: CategoryEnum.OTHERS
  })
  category?: CategoryEnum
}
