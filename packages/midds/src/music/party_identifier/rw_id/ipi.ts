import { MiddsUint } from '../../../types/index.js'

export class Ipi extends MiddsUint {
  protected override max(): number | undefined {
    return 99999999999
  }

  protected override min(): number | undefined {
    return 0
  }

  /// Format return the IPI with padded 0 to be a string with 11 characters as expected for the correct IPI format, where `toString()` only return the raw value.
  format(): string {
    return this.toString().padStart(11, '0')
  }
}
