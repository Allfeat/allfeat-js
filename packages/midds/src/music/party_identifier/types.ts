import { HexString } from 'dedot/utils'
import { MiddsString } from '../../types/index.js'
import { MiddsArrayConvertible } from '../../types/array.js'

export class EntityName extends MiddsString {
  bound(): number {
    return 128
  }
}

export class PersonFullName extends MiddsString {
  bound(): number {
    return 256
  }
}

export class PersonAlias extends MiddsString {
  bound(): number {
    return 128
  }
}

export class PersonAliases extends MiddsArrayConvertible<
  PersonAlias,
  HexString
> {
  bound(): number {
    return 10
  }
}
