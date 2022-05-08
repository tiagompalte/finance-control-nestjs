import { ValueTransformer } from 'typeorm'
import { Util } from './util'

export class ColumnNumericTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (!Util.isNullOrUndefined(data)) {
      return data
    }
    return null
  }

  from(data?: string | null): number | null {
    if (!Util.isNullOrUndefined(data)) {
      const res = parseFloat(data)
      if (isNaN(res)) {
        return null
      } else {
        return res
      }
    }
    return null
  }
}
