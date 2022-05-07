import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as ormconfig from './ormconfig'
import { ConfigModule } from '../config/config.module'

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule, TypeOrmModule.forRoot(ormconfig)],
      global: true
    }
  }
}
