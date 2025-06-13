import { MiddsString } from '../../../types/index.js'

export class Isrc extends MiddsString {
  override bound(): number {
    return 12 // Normalized ISRC without dashes
  }

  protected override normalize(): string {
    return this.value.replace(/[-.\s]/g, '').toUpperCase()
  }

  protected override regex(): RegExp {
    return /^[A-Z]{2}[A-Z0-9]{3}\d{2}\d{5}$/ // e.g., FRZ12300123
  }

  public override format(): string {
    const cleaned = this.normalize() // e.g., FRZ12300123
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5, 7)}-${cleaned.slice(7)}`
  }
}
