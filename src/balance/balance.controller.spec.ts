import { Test, TestingModule } from '@nestjs/testing'
import { BalanceController } from './balance.controller'
import { ExpenseService } from '../expense/expense.service'
import { IncomeService } from '../income/income.service'
import { mock } from 'jest-mock-extended'
import { ExpenseRepository } from '../expense/expense.repository'
import { IncomeRepository } from '../income/income.repository'
import { CategoryEnum } from '../expense/category.enum'
import { BalanceCategoryExpenseDto } from './balance-category-expense.dto'

describe('BalanceController', () => {
  let controller: BalanceController
  let expenseService: ExpenseService
  let incomeService: IncomeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ExpenseService,
          useFactory: () => new ExpenseService(mock<ExpenseRepository>())
        },
        {
          provide: IncomeService,
          useFactory: () => new IncomeService(mock<IncomeRepository>())
        }
      ],
      controllers: [BalanceController]
    }).compile()

    controller = module.get<BalanceController>(BalanceController)
    expenseService = module.get<ExpenseService>(ExpenseService)
    incomeService = module.get<IncomeService>(IncomeService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('findByYearMonth', async () => {
    const incomeSum = 100
    const listCategoryExpense: BalanceCategoryExpenseDto[] = [
      {
        category: CategoryEnum.FOOD,
        value: 10
      },
      {
        category: CategoryEnum.OTHERS,
        value: 10
      }
    ]
    const expenseSum = listCategoryExpense
      .map((b) => b.value)
      .reduce((prev, curr) => prev + curr)

    const spyInstanceIncome = jest
      .spyOn(incomeService, 'balanceByYearMonth')
      .mockResolvedValue(incomeSum)

    const spyInstanceExpense = jest
      .spyOn(expenseService, 'balanceGroupByCategoryInYearMonth')
      .mockResolvedValue(listCategoryExpense)

    const result = await controller.findByYearMonth(2022, 1)

    expect(spyInstanceIncome).toHaveBeenCalledTimes(1)
    expect(spyInstanceIncome).toHaveBeenCalledWith(2022, 1)

    expect(spyInstanceExpense).toHaveBeenCalledTimes(1)
    expect(spyInstanceExpense).toHaveBeenCalledWith(2022, 1)

    expect(result).toStrictEqual({
      incomeSum,
      listCategoryExpense,
      expenseSum,
      balance: incomeSum - expenseSum
    })
  })
})
