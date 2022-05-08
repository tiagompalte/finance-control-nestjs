import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { ColumnNumericTransformer } from '../util'

@Entity('tb_income')
export class IncomeEntity extends BaseEntity {
  @Column()
  @ApiProperty()
  @Expose()
  description: string

  @Column({
    transformer: new ColumnNumericTransformer()
  })
  @ApiProperty()
  @Expose()
  value: number

  @Column()
  @ApiProperty()
  @Expose()
  date: Date
}
