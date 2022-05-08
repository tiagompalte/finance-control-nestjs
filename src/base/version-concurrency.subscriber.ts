import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent
} from 'typeorm'
import { VersionConcurrencyError } from './version-concurrency.error'

@EventSubscriber()
export class VersionConcurrencySubscriber implements EntitySubscriberInterface {
  async beforeUpdate(event: UpdateEvent<any>): Promise<void> {
    if (event.metadata.versionColumn && event.entity) {
      const versionPropName = event.metadata.versionColumn.propertyName
      const expectedVersion = Reflect.get(event.entity, versionPropName)

      let actualVersion = event.databaseEntity?.[versionPropName]
      if (actualVersion == null) {
        const entityDb = await event.connection
          .getRepository(event.metadata.name)
          .createQueryBuilder()
          .select(event.metadata.versionColumn.databaseName)
          .whereInIds(event.entity.id)
          .getRawOne()

        actualVersion = entityDb[versionPropName]
      }

      if (actualVersion !== expectedVersion) {
        throw new VersionConcurrencyError(
          event.metadata.name,
          expectedVersion,
          actualVersion
        )
      }
    }
  }
}
