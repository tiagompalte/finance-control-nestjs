import { ApiProperty } from '@nestjs/swagger'
import { BalanceCategoryExpenseDto } from './balance-category-expense.dto'

export class BalanceDto {
  @ApiProperty()
  incomeSum: number

  @ApiProperty()
  expenseSum: number

  @ApiProperty({
    isArray: true,
    type: BalanceCategoryExpenseDto
  })
  listCategoryExpense: BalanceCategoryExpenseDto[]

  @ApiProperty()
  balance: number
}
