import { Injectable, Scope } from '@nestjs/common'
import { EnvConfig } from './env-config.interface'

import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { NodeEnvEnum } from './node-env.enum'
import * as path from 'path'

@Injectable({
  scope: Scope.DEFAULT
})
export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor() {
    const nodeEnv = process.env.NODE_ENV?.toLowerCase()
    if (
      nodeEnv &&
      (nodeEnv === NodeEnvEnum.PRODUCTION || nodeEnv === NodeEnvEnum.STAGE)
    ) {
      this.envConfig = {}
      Object.keys(process.env).forEach(
        (key) => (this.envConfig[key] = process.env[key])
      )
    } else {
      const envFile = path.resolve(process.cwd(), '.env')
      this.envConfig = dotenv.parse(fs.readFileSync(envFile))
    }
  }

  get(key: string): string {
    return this.envConfig[key]
  }
}
