import { EntityRepository, Repository } from 'typeorm'
import { IncomeEntity } from './income.entity'

@EntityRepository(IncomeEntity)
export class IncomeRepository extends Repository<IncomeEntity> {}
