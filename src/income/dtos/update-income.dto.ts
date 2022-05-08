import { CreateIncomeDto } from './create-income.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'

export class UpdateIncomeDto extends CreateIncomeDto {
  @ApiProperty()
  @IsInt()
  version: number
}
