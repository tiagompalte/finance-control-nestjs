import { Module } from '@nestjs/common'
import { ExpenseController } from './expense.controller'
import { ExpenseService } from './expense.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExpenseRepository } from './expense.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseRepository])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService]
})
export class ExpenseModule {}
