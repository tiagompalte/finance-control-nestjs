import { ConfigService } from '../config/config.service'
import { ConnectionOptions, DatabaseType } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import * as path from 'path'

const config = new ConfigService()

const connectionOptions: ConnectionOptions = {
  type: config.get('CONNECTION') as DatabaseType,
  host: config.get('HOST'),
  port: +config.get('PORT'),
  username: config.get('USERNAME'),
  password: config.get('PASSWORD'),
  database: config.get('DATABASE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
  migrations: [path.resolve(__dirname, 'migrations', '*.ts')],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations')
  },
  timezone: 'Z'
} as MysqlConnectionOptions

export = connectionOptions
