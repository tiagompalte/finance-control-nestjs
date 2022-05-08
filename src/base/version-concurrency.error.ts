export class VersionConcurrencyError extends Error {
  constructor(entity: string, expectedVersion: number, actualVersion: number) {
    super()
    this.name = 'VersionConcurrencyError'
    this.message = `The version concurrency lock on entity ${entity} failed, version ${expectedVersion} was expected, but is actually ${actualVersion}`
  }
}
