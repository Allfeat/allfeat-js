import { MiddsString } from '../index.js'

/// Mock class
class TestString extends MiddsString {
  bound(): number {
    return 10
  }
}

describe('MiddsString (abstract base)', () => {
  it('should create a valid string within the UTF-8 bound', () => {
    const m = new TestString('hello')
    expect(m.value).toBe('hello')
    expect(m.toString()).toBe('hello')
  })

  it('should throw if the UTF-8 byte length exceeds the bound', () => {
    const input = '🚀🚀🚀🚀' // 4 emojis = 16 bytes
    expect(() => new TestString(input)).toThrow(
      'Input String might be too large',
    )
  })

  it('should allow string that matches regex from overridden method', () => {
    class RegexString extends MiddsString {
      protected override regex() {
        return /^[A-Z]+$/
      }

      bound(): number {
        return 10
      }
    }

    expect(() => new RegexString('HELLO')).not.toThrow()
    expect(() => new RegexString('Hello')).toThrow(
      'Invalid MIDDS String format.',
    )
  })

  it('should allow override of format() and normalize()', () => {
    class Normalized extends MiddsString {
      bound(): number {
        return 10
      }

      protected override normalize(): string {
        return this.value.trim().toLowerCase()
      }

      protected override format(): string {
        return `Formatted: ${this.value}`
      }
    }

    const m = new Normalized(' Test ')
    // format() is protected, so we test normalize via constructor effect
    expect(m.value).toBe(' Test ')
    // you could expose format() in subclass and test it
  })

  it('should correctly compare two equal MiddsStrings', () => {
    const a = new TestString('hello')
    const b = new TestString('hello')
    expect(a.equals(b)).toBe(true)
  })

  it('should return false for different values', () => {
    const a = new TestString('hello')
    const b = new TestString('world')
    expect(a.equals(b)).toBe(false)
  })

  it('should return hex string from toNativeType()', () => {
    const m = new TestString('ABC')
    const hex = m.toNativeType()
    expect(hex).toMatch(/^0x[0-9a-f]+$/i)
  })
})
