import { Test, TestingModule } from '@nestjs/testing'
import { IncomeController } from './income.controller'
import { IncomeService } from './income.service'
import { CreateIncomeDto } from './dtos/create-income.dto'
import { IncomeEntity } from './income.entity'
import { mock } from 'jest-mock-extended'
import { UpdateIncomeDto } from './dtos/update-income.dto'
import { IncomeRepository } from './income.repository'

describe('IncomeController', () => {
  let controller: IncomeController
  let service: IncomeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IncomeService,
          useFactory: () => new IncomeService(mock<IncomeRepository>())
        }
      ],
      controllers: [IncomeController]
    }).compile()

    controller = module.get<IncomeController>(IncomeController)
    service = module.get<IncomeService>(IncomeService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('create', async () => {
    const dto: CreateIncomeDto = {
      description: 'description',
      date: new Date(),
      value: 10
    }

    const mocked: IncomeEntity = {
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
    const dto: UpdateIncomeDto = {
      description: 'description',
      date: new Date(),
      value: 10
    }

    const mocked: IncomeEntity = {
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
    const mock: IncomeEntity = {
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
