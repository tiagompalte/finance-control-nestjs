import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @VersionColumn()
  version: number

  @CreateDateColumn({
    name: 'created_at'
  })
  createDate: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updateDate: Date

  @DeleteDateColumn({
    name: 'deleted_at'
  })
  deleteDate?: Date
}
