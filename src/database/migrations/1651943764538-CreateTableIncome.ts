import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { baseColumns } from './util'

export class CreateTableIncome1651943764538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_income',
        columns: [
          ...baseColumns,
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 6,
            scale: 2,
            isNullable: false
          },
          {
            name: 'date',
            type: 'date'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_income', true, true, true)
  }
}
