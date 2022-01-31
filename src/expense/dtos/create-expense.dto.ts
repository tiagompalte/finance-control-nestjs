import { ApiProperty } from '@nestjs/swagger'
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min
} from 'class-validator'
import { CategoryEnum } from '../category.enum'
import { Type } from 'class-transformer'

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
  @IsDate()
  @Type(() => Date)
  date: Date

  @ApiProperty({
    enum: CategoryEnum
  })
  @IsOptional()
  @IsEnum(CategoryEnum)
  category?: CategoryEnum
}
