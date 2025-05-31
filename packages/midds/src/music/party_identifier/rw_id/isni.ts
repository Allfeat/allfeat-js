import { MiddsString } from '../../../types/string'

export class Isni extends MiddsString {
  constructor(value: string) {
    /// Normalization
    const normalized = value.replace(/\s/g, '')
    super(normalized)
  }

  bound(): number {
    return 16
  }

  override regex(): RegExp | undefined {
    return /^[0-9]{15}[0-9X]$/
  }

  override normalize(): string {
    return this.toString()
  }

  override format(): string {
    return this.value.replace(/(.{4})/g, '$1 ').trim()
  }
}
