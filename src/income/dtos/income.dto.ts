import { ApiProperty } from '@nestjs/swagger'
import { BaseDto } from '../../base'

export class IncomeDto extends BaseDto {
  @ApiProperty()
  description: string

  @ApiProperty()
  value: number

  @ApiProperty()
  date: Date
}
