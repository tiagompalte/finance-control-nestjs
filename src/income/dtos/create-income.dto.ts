import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateIncomeDto {
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
  @IsDate()
  @Type(() => Date)
  date: Date
}
