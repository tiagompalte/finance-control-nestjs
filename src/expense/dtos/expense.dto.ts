import { BaseDto } from '../../base'
import { ApiProperty } from '@nestjs/swagger'
import { CategoryEnum } from '../category.enum'

export class ExpenseDto extends BaseDto {
  @ApiProperty()
  description: string

  @ApiProperty({
    type: 'number'
  })
  value: number

  @ApiProperty()
  date: Date

  @ApiProperty({
    enum: CategoryEnum
  })
  category?: CategoryEnum
}
