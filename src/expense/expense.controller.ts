import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  ValidationPipe
} from '@nestjs/common'
import { ExpenseService } from './expense.service'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { ExpenseDto } from './dtos/expense.dto'
import { CreateExpenseDto } from './dtos/create-expense.dto'
import { UpdateExpenseDto } from './dtos/update-expense.dto'

@Controller('expense')
@ApiTags('Expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiCreatedResponse({
    type: ExpenseDto
  })
  async create(
    @Body(ValidationPipe) expense: CreateExpenseDto
  ): Promise<ExpenseDto> {
    return this.expenseService.create(expense)
  }

  @Get()
  @ApiOkResponse({
    type: ExpenseDto,
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
  ): Promise<ExpenseDto[]> {
    return this.expenseService.findAll(description, withDeleted)
  }

  @Get(':id')
  @ApiOkResponse({
    type: ExpenseDto
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
  ): Promise<ExpenseDto> {
    return this.expenseService.findById(id, withDeleted)
  }

  @Put(':id')
  @ApiOkResponse({
    type: ExpenseDto
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) income: UpdateExpenseDto
  ): Promise<ExpenseDto> {
    return this.expenseService.update(id, income)
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.expenseService.delete(id)
  }
}
