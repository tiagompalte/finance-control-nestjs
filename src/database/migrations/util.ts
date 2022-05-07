import { TableColumnOptions } from 'typeorm'

export const baseColumns: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'VARCHAR',
    isGenerated: true,
    generationStrategy: 'uuid',
    isPrimary: true
  },
  {
    name: 'version',
    type: 'INTEGER',
    isNullable: false,
    default: 0
  },
  {
    name: 'created_at',
    type: 'TIMESTAMP',
    isNullable: false,
    default: 'now()'
  },
  {
    name: 'updated_at',
    type: 'TIMESTAMP',
    isNullable: false,
    default: 'now()'
  },
  {
    name: 'deleted_at',
    type: 'TIMESTAMP',
    isNullable: true
  }
]
