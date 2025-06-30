import { HexString } from 'dedot/utils'
import { MiddsString } from '../../types/index.js'
import { MiddsArrayConvertible } from '../../types/array.js'

export class EntityName extends MiddsString {
  bound(): number {
    return 128
  }
}

export class ArtistFullName extends MiddsString {
  bound(): number {
    return 256
  }
}

export class ArtistAlias extends MiddsString {
  bound(): number {
    return 128
  }
}

export class ArtistAliases extends MiddsArrayConvertible<
  ArtistAlias,
  HexString
> {
  bound(): number {
    return 10
  }
}
