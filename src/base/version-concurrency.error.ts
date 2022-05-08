import { BadRequestException } from '@nestjs/common'

export class VersionConcurrencyError extends BadRequestException {
  constructor(entity: string, expectedVersion: number, actualVersion: number) {
    super(
      `The version concurrency lock on entity ${entity} failed, version ${expectedVersion} was expected, but is actually ${actualVersion}`
    )
    this.name = 'VersionConcurrencyError'
  }
}
