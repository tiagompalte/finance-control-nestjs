import { Test, TestingModule } from '@nestjs/testing'
import { ExpenseService } from './expense.service'
import * as jestMock from 'jest-mock-extended'
import { ExpenseRepository } from './expense.repository'
import { ExpenseEntity } from './expense.entity'
import { UpdateExpenseDto } from './dtos/update-expense.dto'
import { BadRequestException } from '@nestjs/common'
import { CreateExpenseDto } from './dtos/create-expense.dto'
import { CategoryEnum } from './category.enum'
import { BalanceCategoryExpenseDto } from '../balance/balance-category-expense.dto'

describe('ExpenseService', () => {
  let service: ExpenseService
  const mockRepository = jestMock.mock<ExpenseRepository>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: ExpenseRepository,
          useValue: mockRepository
        }
      ]
    }).compile()

    service = module.get<ExpenseService>(ExpenseService)
  })

  beforeEach(() => {
    jestMock.mockReset(mockRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll', async () => {
    const value: ExpenseEntity[] = [
      {
        id: 'id1',
        description: 'description',
        value: 10,
        date: new Date(),
        createDate: new Date(),
        updateDate: new Date(),
        version: 1
      },
      {
        id: 'id2',
        description: 'description',
        value: 10,
        date: new Date(),
        createDate: new Date(),
        updateDate: new Date(),
        version: 1
      }
    ]

    const mockFind = mockRepository.find.mockResolvedValue(value)
    const result = await service.findAll()

    expect(result).toStrictEqual(value)
    expect(mockFind).toHaveBeenCalledTimes(1)
    expect(mockFind).toHaveBeenCalledWith({ where: {}, withDeleted: false })
  })

  it('findById', async () => {
    const value: ExpenseEntity = {
      id: 'id',
      description: 'description',
      value: 10,
      date: new Date(),
      createDate: new Date(),
      updateDate: new Date(),
      version: 1
    }

    const mockFind = mockRepository.findOne.mockResolvedValue(value)
    const result = await service.findById('id')

    expect(result).toStrictEqual(value)
    expect(mockFind).toHaveBeenCalledTimes(1)
    expect(mockFind).toHaveBeenCalledWith('id', { withDeleted: false })
  })

  it('delete', async () => {
    const mockDelete = mockRepository.softDelete.mockResolvedValue(undefined)
    const result = await service.delete('id')

    expect(result).toBeUndefined()
    expect(mockDelete).toHaveBeenCalledTimes(1)
    expect(mockDelete).toHaveBeenCalledWith('id')
  })

  it('balanceGroupByCategoryInYearMonth', async () => {
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

    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      addSelect: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      groupBy: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawMany: () => listCategoryExpense
    }

    jest
      .spyOn(mockRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder)

    const result = await service.balanceGroupByCategoryInYearMonth(2022, 1)
    expect(result).toStrictEqual(listCategoryExpense)
    expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(1)
  })

  it('update', async () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getCount: () => 0
    }

    jest
      .spyOn(mockRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder)

    const updateIncome: UpdateExpenseDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    const entity: ExpenseEntity = {
      ...updateIncome,
      id: 'id',
      createDate: new Date(),
      updateDate: new Date(),
      version: 1
    }

    jest.spyOn(mockRepository, 'recover').mockResolvedValue(entity)

    const result = await service.update('id', updateIncome)
    expect(result).toStrictEqual(entity)
  })

  it('update with exception', async () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getCount: () => 1
    }

    jest
      .spyOn(mockRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder)

    const updateIncome: UpdateExpenseDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    try {
      await service.update('id', updateIncome)
    } catch (e) {
      expect(e).toStrictEqual(
        new BadRequestException(
          'Expense with the same description and date exists'
        )
      )
    }
  })

  it('create', async () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getCount: () => 0
    }

    jest
      .spyOn(mockRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder)

    const createIncomeDto: CreateExpenseDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    const entity: ExpenseEntity = {
      ...createIncomeDto,
      id: 'id',
      createDate: new Date(),
      updateDate: new Date(),
      version: 0
    }

    jest.spyOn(mockRepository, 'save').mockResolvedValue(entity)

    const result = await service.create(createIncomeDto)
    expect(result).toStrictEqual(entity)
  })

  it('create with exception', async () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getCount: () => 1
    }

    jest
      .spyOn(mockRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder)

    const createIncomeDto: CreateExpenseDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    try {
      await service.create(createIncomeDto)
    } catch (e) {
      expect(e).toStrictEqual(
        new BadRequestException(
          'Expense with the same description and date exists'
        )
      )
    }
  })

  it('findByYearMonth', async () => {
    const result: ExpenseEntity[] = [
      {
        id: 'id',
        description: 'description',
        value: 10,
        date: new Date(),
        createDate: new Date(),
        updateDate: new Date(),
        version: 0
      }
    ]

    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getMany: () => result
    }

    jest
      .spyOn(mockRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder)

    const response = await service.findByYearMonth(2022, 1)
    expect(response).toStrictEqual(result)
  })
})
