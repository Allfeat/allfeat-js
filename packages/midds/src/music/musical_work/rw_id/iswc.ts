import { MiddsString } from '../../../types/index.js'

export class Iswc extends MiddsString {
  override bound(): number {
    return 15 // T123456789C
  }

  protected override normalize(): string {
    return this.value.replace(/[-.\s]/g, '').toUpperCase()
  }

  protected override regex(): RegExp {
    return /^T\d{9}[0-9A-Z]$/
  }

  public override format(): string {
    const cleaned = this.normalize() // Ex: T123456789C
    return `T-${cleaned.slice(1, 4)}.${cleaned.slice(4, 7)}.${cleaned.slice(7, 10)}-${cleaned.slice(10)}`
  }
}
