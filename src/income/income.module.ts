import { Module } from '@nestjs/common'
import { IncomeService } from './income.service'
import { IncomeController } from './income.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IncomeRepository } from './income.repository'

@Module({
  imports: [TypeOrmModule.forFeature([IncomeRepository])],
  providers: [IncomeService],
  controllers: [IncomeController],
  exports: [IncomeService]
})
export class IncomeModule {}
