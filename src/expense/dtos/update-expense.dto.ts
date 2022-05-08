import { CreateExpenseDto } from './create-expense.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'

export class UpdateExpenseDto extends CreateExpenseDto {
  @ApiProperty()
  @IsInt()
  version: number
}
