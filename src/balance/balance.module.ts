import { Module } from '@nestjs/common'
import { BalanceController } from './balance.controller'
import { ExpenseModule } from '../expense/expense.module'
import { IncomeModule } from '../income/income.module'

@Module({
  imports: [ExpenseModule, IncomeModule],
  controllers: [BalanceController]
})
export class BalanceModule {}
