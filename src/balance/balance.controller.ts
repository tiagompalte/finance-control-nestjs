import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ExpenseService } from '../expense/expense.service'
import { IncomeService } from '../income/income.service'
import { BalanceDto } from './balance.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Responses } from '../util'

@Controller('balance')
@ApiTags('Balance')
@Responses()
export class BalanceController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly incomeService: IncomeService
  ) {}

  @Get('/:year/:month')
  @ApiOkResponse({
    type: BalanceDto
  })
  async findByYearMonth(
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number
  ): Promise<BalanceDto> {
    const result = await Promise.all([
      this.incomeService.balanceByYearMonth(year, month),
      this.expenseService.balanceGroupByCategoryInYearMonth(year, month)
    ])

    const incomeSum = result[0]
    const listCategoryExpense = result[1]
    const expenseSum = listCategoryExpense
      .map((b) => b.value)
      .reduce((prev, curr) => prev + curr)

    return {
      incomeSum,
      listCategoryExpense,
      expenseSum,
      balance: incomeSum - expenseSum
    }
  }
}
