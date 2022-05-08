import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  SerializeOptions,
  ValidationPipe
} from '@nestjs/common'
import { IncomeService } from './income.service'
import { CreateIncomeDto } from './dtos/create-income.dto'
import { UpdateIncomeDto } from './dtos/update-income.dto'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { Responses } from '../util'
import { IncomeEntity } from './income.entity'

@Controller('income')
@ApiTags('Income')
@Responses()
@SerializeOptions({
  strategy: 'excludeAll'
})
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @ApiCreatedResponse({
    type: IncomeEntity
  })
  async create(
    @Body(
      new ValidationPipe({
        whitelist: true
      })
    )
    income: CreateIncomeDto
  ): Promise<IncomeEntity> {
    return this.incomeService.create(income)
  }

  @Get()
  @ApiOkResponse({
    type: IncomeEntity,
    isArray: true
  })
  @ApiQuery({
    name: 'description',
    type: 'string',
    required: false
  })
  @ApiQuery({
    name: 'withDeleted',
    type: 'boolean',
    required: false
  })
  async findAll(
    @Query('description') description?: string,
    @Query('withDeleted', new DefaultValuePipe(false), ParseBoolPipe)
    withDeleted?: boolean
  ): Promise<IncomeEntity[]> {
    return this.incomeService.findAll(description, withDeleted)
  }

  @Get('/:year/:month')
  @ApiOkResponse({
    isArray: true,
    type: IncomeEntity
  })
  async findByYearMonth(
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number
  ): Promise<IncomeEntity[]> {
    return this.incomeService.findByYearMonth(year, month)
  }

  @Get(':id')
  @ApiOkResponse({
    type: IncomeEntity
  })
  @ApiQuery({
    name: 'withDeleted',
    type: 'boolean',
    required: false
  })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('withDeleted', new DefaultValuePipe(false), ParseBoolPipe)
    withDeleted?: boolean
  ): Promise<IncomeEntity> {
    return this.incomeService.findById(id, withDeleted)
  }

  @Put(':id')
  @ApiOkResponse({
    type: IncomeEntity
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true
      })
    )
    income: UpdateIncomeDto
  ): Promise<IncomeEntity> {
    return this.incomeService.update(id, income)
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.incomeService.delete(id)
  }
}
