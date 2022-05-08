import { ApiProperty } from '@nestjs/swagger'

export abstract class BaseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  version: number
}
