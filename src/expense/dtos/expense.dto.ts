import { BaseDto } from '../../base'
import { ApiProperty } from '@nestjs/swagger'

export class ExpenseDto extends BaseDto {
  @ApiProperty()
  description: string

  @ApiProperty()
  value: number

  @ApiProperty()
  date: Date
}
