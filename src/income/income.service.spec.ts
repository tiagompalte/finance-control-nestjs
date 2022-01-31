import { Test, TestingModule } from '@nestjs/testing'
import { IncomeService } from './income.service'
import * as jestMock from 'jest-mock-extended'
import { IncomeRepository } from './income.repository'
import { IncomeEntity } from './income.entity'
import { UpdateIncomeDto } from './dtos/update-income.dto'
import { BadRequestException } from '@nestjs/common'
import { CreateIncomeDto } from './dtos/create-income.dto'

describe('IncomeService', () => {
  let service: IncomeService
  const mockRepository = jestMock.mock<IncomeRepository>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomeService,
        {
          provide: IncomeRepository,
          useValue: mockRepository
        }
      ]
    }).compile()

    service = module.get<IncomeService>(IncomeService)
  })

  beforeEach(() => {
    jestMock.mockReset(mockRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll', async () => {
    const value: IncomeEntity[] = [
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
    const value: IncomeEntity = {
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

  it('balanceByYearMonth', async () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawOne: () => ({
        balance: 10
      })
    }

    jest
      .spyOn(mockRepository, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder)

    const balance = await service.balanceByYearMonth(2022, 1)
    expect(balance).toBe(10)
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

    const updateIncome: UpdateIncomeDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    const entity: IncomeEntity = {
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

    const updateIncome: UpdateIncomeDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    try {
      await service.update('id', updateIncome)
    } catch (e) {
      expect(e).toStrictEqual(
        new BadRequestException(
          'Income with the same description and date exists'
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

    const createIncomeDto: CreateIncomeDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    const entity: IncomeEntity = {
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

    const createIncomeDto: CreateIncomeDto = {
      description: 'description',
      value: 10,
      date: new Date()
    }

    try {
      await service.create(createIncomeDto)
    } catch (e) {
      expect(e).toStrictEqual(
        new BadRequestException(
          'Income with the same description and date exists'
        )
      )
    }
  })

  it('findByYearMonth', async () => {
    const result: IncomeEntity[] = [
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
