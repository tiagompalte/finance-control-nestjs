import { Module } from '@nestjs/common'
import { IncomeModule } from './income/income.module'
import { ExpenseModule } from './expense/expense.module'
import { BalanceModule } from './balance/balance.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [
    ConfigModule.register(),
    DatabaseModule.register(),
    IncomeModule,
    ExpenseModule,
    BalanceModule,
    DatabaseModule,
    ConfigModule
  ]
})
export class AppModule {}
