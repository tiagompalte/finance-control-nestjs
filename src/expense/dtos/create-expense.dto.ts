import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator'

export class CreateExpenseDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsNumber({
    maxDecimalPlaces: 2
  })
  @Min(0.01)
  value: number

  @ApiProperty()
  @IsDateString()
  date: Date
}
