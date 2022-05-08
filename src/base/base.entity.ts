import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'

export abstract class BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    insert: true,
    update: false
  })
  id: string

  @VersionColumn({
    insert: false,
    update: false
  })
  version: number

  @CreateDateColumn({
    name: 'created_at',
    insert: false,
    update: false
  })
  createDate: Date

  @UpdateDateColumn({
    name: 'updated_at',
    insert: false,
    update: false
  })
  updateDate: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    insert: false,
    update: false
  })
  deleteDate?: Date
}
