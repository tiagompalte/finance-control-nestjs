import { CategoryEnum } from '../expense/category.enum'
import { ApiProperty } from '@nestjs/swagger'

export class BalanceCategoryExpenseDto {
  @ApiProperty()
  category: CategoryEnum

  @ApiProperty()
  value: number
}
