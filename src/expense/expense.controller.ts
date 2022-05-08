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
import { ExpenseService } from './expense.service'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { CreateExpenseDto } from './dtos/create-expense.dto'
import { Responses } from '../util'
import { ExpenseEntity } from './expense.entity'
import { UpdateExpenseDto } from './dtos/update-expense.dto'

@Controller('expense')
@ApiTags('Expense')
@Responses()
@SerializeOptions({
  strategy: 'excludeAll'
})
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiCreatedResponse({
    type: ExpenseEntity
  })
  async create(
    @Body(
      new ValidationPipe({
        whitelist: true
      })
    )
    expense: CreateExpenseDto
  ): Promise<ExpenseEntity> {
    return this.expenseService.create(expense)
  }

  @Get()
  @ApiOkResponse({
    type: ExpenseEntity,
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
  ): Promise<ExpenseEntity[]> {
    return this.expenseService.findAll(description, withDeleted)
  }

  @Get('/:year/:month')
  @ApiOkResponse({
    isArray: true,
    type: ExpenseEntity
  })
  async findByYearMonth(
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number
  ): Promise<ExpenseEntity[]> {
    return this.expenseService.findByYearMonth(year, month)
  }

  @Get(':id')
  @ApiOkResponse({
    type: ExpenseEntity
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
  ): Promise<ExpenseEntity> {
    return this.expenseService.findById(id, withDeleted)
  }

  @Put(':id')
  @ApiOkResponse({
    type: ExpenseEntity
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true
      })
    )
    income: UpdateExpenseDto
  ): Promise<ExpenseEntity> {
    return this.expenseService.update(id, income)
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.expenseService.delete(id)
  }
}
