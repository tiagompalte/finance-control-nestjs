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
  ValidationPipe
} from '@nestjs/common'
import { IncomeService } from './income.service'
import { CreateIncomeDto } from './dtos/create-income.dto'
import { IncomeDto } from './dtos/income.dto'
import { UpdateIncomeDto } from './dtos/update-income.dto'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { Responses } from '../util'

@Controller('income')
@ApiTags('Income')
@Responses()
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @ApiCreatedResponse({
    type: IncomeDto
  })
  async create(
    @Body(
      new ValidationPipe({
        whitelist: true
      })
    )
    income: CreateIncomeDto
  ): Promise<IncomeDto> {
    return this.incomeService.create(income)
  }

  @Get()
  @ApiOkResponse({
    type: IncomeDto,
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
  ): Promise<IncomeDto[]> {
    return this.incomeService.findAll(description, withDeleted)
  }

  @Get('/:year/:month')
  @ApiOkResponse({
    isArray: true,
    type: IncomeDto
  })
  async findByYearMonth(
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number
  ): Promise<IncomeDto[]> {
    return this.incomeService.findByYearMonth(year, month)
  }

  @Get(':id')
  @ApiOkResponse({
    type: IncomeDto
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
  ): Promise<IncomeDto> {
    return this.incomeService.findById(id, withDeleted)
  }

  @Put(':id')
  @ApiOkResponse({
    type: IncomeDto
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true
      })
    )
    income: UpdateIncomeDto
  ): Promise<IncomeDto> {
    return this.incomeService.update(id, income)
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.incomeService.delete(id)
  }
}
