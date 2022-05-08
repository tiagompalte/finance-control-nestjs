import { BaseEntity } from '../base'
import { Column, Entity } from 'typeorm'
import { CategoryEnum } from './category.enum'
import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Entity('tb_expense')
export class ExpenseEntity extends BaseEntity {
  @Column()
  @ApiProperty()
  @Expose()
  description: string

  @Column()
  @ApiProperty()
  @Expose()
  value: number

  @Column()
  @ApiProperty()
  @Expose()
  date: Date

  @Column()
  @ApiProperty()
  @Expose()
  category?: CategoryEnum
}
