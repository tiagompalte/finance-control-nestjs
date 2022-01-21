import { Module } from '@nestjs/common'
import { IncomeService } from './income.service'
import { IncomeController } from './income.controller'
import { IncomeRepository } from './income.repository'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([IncomeRepository])],
  providers: [IncomeService],
  controllers: [IncomeController]
})
export class IncomeModule {}
