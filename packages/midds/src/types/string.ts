import { Bytes } from 'dedot/codecs'
import { INativeTypeConverter } from '../index.js'
import { stringToU8a, toHex } from 'dedot/utils'

/// A generic string type used by MIDDS that convert to a BoundedVec of u8 on the chain side.
export abstract class MiddsString implements INativeTypeConverter<Bytes> {
  readonly value: string

  constructor(value: string) {
    const regex = this.regex()
    if (regex && !regex.test(value)) {
      throw new Error('Invalid MIDDS String format.')
    }
    if (!this.validateUtf8ByteSize(value)) {
      throw new Error(
        'Input String might be too large for the expected MIDDS bound.',
      )
    }

    this.value = value
  }

  /// Max length expected on the chain
  abstract bound(): number

  protected format(): string {
    return this.toString()
  }

  protected normalize(): string {
    return this.toString()
  }

  /// Optional regex verification to apply to this string.
  protected regex(): RegExp | undefined {
    return undefined
  }

  equals(other: MiddsString): boolean {
    return (
      this.value === other.value &&
      this.bound() === other.bound() &&
      String(this.regex()) === String(other.regex())
    )
  }

  toString(): string {
    return this.value
  }

  private validateUtf8ByteSize(value: string): boolean {
    const u8_array = stringToU8a(value)
    return u8_array.length <= this.bound()
  }

  toNativeType(): `0x${string}` {
    return toHex(this.value)
  }
}
