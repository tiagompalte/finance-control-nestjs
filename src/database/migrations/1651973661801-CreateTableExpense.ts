import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { baseColumns } from './util'
import { CategoryEnum } from '../../expense/category.enum'

export class CreateTableExpense1651973661801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_expense',
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
          },
          {
            name: 'category',
            type: 'enum',
            isNullable: false,
            enum: [
              CategoryEnum.FOOD,
              CategoryEnum.HEALTH,
              CategoryEnum.HOME,
              CategoryEnum.TRANSPORT,
              CategoryEnum.EDUCATION,
              CategoryEnum.LEISURE,
              CategoryEnum.UNFORESEEN,
              CategoryEnum.OTHERS
            ],
            default: "'OTHERS'"
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_expense', true, true, true)
  }
}
