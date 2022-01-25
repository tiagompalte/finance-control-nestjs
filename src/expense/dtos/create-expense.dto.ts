import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min
} from 'class-validator'
import { CategoryEnum } from '../category.enum'

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

  @ApiProperty({
    enum: CategoryEnum
  })
  @IsOptional()
  @IsEnum(CategoryEnum)
  category?: CategoryEnum
}
