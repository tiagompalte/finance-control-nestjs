import { Test, TestingModule } from '@nestjs/testing'
import { ExpenseController } from './expense.controller'
import { ExpenseService } from './expense.service'
import { mock } from 'jest-mock-extended'
import { ExpenseRepository } from './expense.repository'
import { CreateExpenseDto } from './dtos/create-expense.dto'
import { ExpenseEntity } from './expense.entity'
import { UpdateExpenseDto } from './dtos/update-expense.dto'

describe('ExpenseController', () => {
  let controller: ExpenseController
  let service: ExpenseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ExpenseService,
          useFactory: () => new ExpenseService(mock<ExpenseRepository>())
        }
      ],
      controllers: [ExpenseController]
    }).compile()

    controller = module.get<ExpenseController>(ExpenseController)
    service = module.get<ExpenseService>(ExpenseService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('create', async () => {
    const dto: CreateExpenseDto = {
      description: 'description',
      date: new Date(),
      value: 10
    }

    const mocked: ExpenseEntity = {
      ...dto,
      id: 'id',
      createDate: new Date(),
      updateDate: new Date(),
      version: 1
    }

    const spyInstance = jest.spyOn(service, 'create').mockResolvedValue(mocked)

    const result = await controller.create(dto)

    expect(spyInstance).toHaveBeenCalledTimes(1)
    expect(spyInstance).toHaveBeenCalledWith(dto)
    expect(result).toStrictEqual(mocked)
  })

  it('update', async () => {
    const dto: UpdateExpenseDto = {
      description: 'description',
      date: new Date(),
      value: 10
    }

    const mocked: ExpenseEntity = {
      ...dto,
      id: 'id',
      createDate: new Date(),
      updateDate: new Date(),
      version: 1
    }

    const spyInstance = jest.spyOn(service, 'update').mockResolvedValue(mocked)

    const result = await controller.update('id', dto)

    expect(spyInstance).toHaveBeenCalledTimes(1)
    expect(spyInstance).toHaveBeenCalledWith('id', dto)
    expect(result).toStrictEqual(mocked)
  })

  it('delete', async () => {
    const spyInstance = jest
      .spyOn(service, 'delete')
      .mockResolvedValue(undefined)

    const result = await controller.delete('id')

    expect(spyInstance).toHaveBeenCalledTimes(1)
    expect(spyInstance).toHaveBeenCalledWith('id')
    expect(result).toBeUndefined()
  })

  it('findAll', async () => {
    const spyInstance = jest.spyOn(service, 'findAll').mockResolvedValue([
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
    ])

    const result = await controller.findAll('desc')

    expect(spyInstance).toHaveBeenCalledTimes(1)
    expect(spyInstance).toHaveBeenCalledWith('desc', undefined)
    expect(result).not.toBeUndefined()
    expect(result.length).toBe(2)
  })

  it('findById', async () => {
    const mock: ExpenseEntity = {
      id: 'id',
      description: 'description',
      value: 10,
      date: new Date(),
      createDate: new Date(),
      updateDate: new Date(),
      version: 1
    }

    const spyInstance = jest.spyOn(service, 'findById').mockResolvedValue(mock)

    const result = await controller.findById('id')

    expect(spyInstance).toHaveBeenCalledTimes(1)
    expect(spyInstance).toHaveBeenCalledWith('id', undefined)
    expect(result).toStrictEqual(mock)
  })

  it('findByYearMonth', async () => {
    const spyInstance = jest
      .spyOn(service, 'findByYearMonth')
      .mockResolvedValue([
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
      ])

    const result = await controller.findByYearMonth(2022, 1)

    expect(spyInstance).toHaveBeenCalledTimes(1)
    expect(spyInstance).toHaveBeenCalledWith(2022, 1)
    expect(result).not.toBeUndefined()
    expect(result.length).toBe(2)
  })
})
