import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'
import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export abstract class BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    insert: true,
    update: false
  })
  @ApiProperty()
  @Expose()
  id: string

  @VersionColumn({
    insert: false,
    update: false
  })
  @ApiProperty()
  @Expose()
  version: number

  @CreateDateColumn({
    name: 'created_at',
    insert: false,
    update: false,
    select: false
  })
  createDate: Date

  @UpdateDateColumn({
    name: 'updated_at',
    insert: false,
    update: false,
    select: false
  })
  updateDate: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    insert: false,
    update: false,
    select: false
  })
  deleteDate?: Date
}
