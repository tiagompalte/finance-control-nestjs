import { ApiProperty } from '@nestjs/swagger'

export abstract class BaseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  version: number

  @ApiProperty()
  createDate: Date

  @ApiProperty()
  updateDate: Date

  @ApiProperty()
  deleteDate?: Date
}
