import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent
} from 'typeorm'
import { VersionConcurrencyException } from './version-concurrency.exception'

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
        throw new VersionConcurrencyException(
          event.metadata.name,
          expectedVersion,
          actualVersion
        )
      }
    }
  }
}
