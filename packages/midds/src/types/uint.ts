import { INativeTypeConverter } from '../index.js'

/// A generic number type used by MIDDS that convert to a Uint on the chain side.
export abstract class MiddsUint implements INativeTypeConverter<number> {
  readonly value: number

  constructor(value: number) {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        'MIDDS number values must be a non-negative finite number.',
      )
    }

    this.value = value
    if (!this.validateMin() || !this.validateMax()) {
      throw new Error(
        'MIDDS number value is not valid, must be in the range of ' +
          this.min +
          '' +
          this.max +
          ', found ' +
          this.value,
      )
    }
  }

  /// Check that ensure a maximum number possible for this type.
  protected max(): number | undefined {
    return undefined
  }

  /// Check that ensure a minimum number possible for this type.
  protected min(): number | undefined {
    /// We likely never have a negative number in the context of a blockchain, so we can set this to 0 for a default.
    return 0
  }

  static from<T extends MiddsUint>(
    this: new (value: number) => T,
    value: string,
  ): T {
    return new this(+value)
  }

  toString(): string {
    return this.value.toString()
  }

  private validateMin(): boolean {
    const min = this.min()
    return min ? this.value >= min : true
  }

  private validateMax(): boolean {
    const max = this.max()
    return max ? this.value <= max : true
  }

  toNativeType(): number {
    return this.value
  }
}
