import { MiddsString } from '../../../types/string'

/**
 * ISRC (International Standard Recording Code) representation.
 * Valid format (normalized): FRZ123001234
 */
export class Isrc extends MiddsString {
  constructor(input: string) {
    const normalized = Isrc._normalize(input)

    super(normalized)
  }

  static _normalize(input: string): string {
    return input.toUpperCase().replace(/[^A-Z0-9]/g, '')
  }

  protected regex(): RegExp {
    // Country (2 letters), registrant (3 alnum), year (2 digits), designation (5 digits)
    return /^[A-Z]{2}[A-Z0-9]{3}[0-9]{2}[0-9]{5}$/
  }

  bound(): number {
    return 12 // 12 bytes max for on-chain bounded vec
  }

  /**
   * Returns the canonical hyphenated ISRC format (e.g. FR-Z12-30-01234)
   */
  format(): string {
    return `${this.value.slice(0, 2)}-${this.value.slice(2, 5)}-${this.value.slice(5, 7)}-${this.value.slice(7)}`
  }
}
