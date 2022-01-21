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

  @CreateDateColumn()
  createDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deleteDate?: Date
}
