import { Isni } from '../isni.js'

describe('Isni', () => {
  it('should create a valid ISNI with proper format', () => {
    const isni = new Isni('123456789012345X')
    expect(isni.value).toBe('123456789012345X')
  })

  it('should normalize and accept ISNI with spaces', () => {
    const isni = new Isni('1234 5678 9012 345X')
    expect(isni.value).toBe('123456789012345X')
  })

  it('should reject invalid ISNI with wrong characters', () => {
    expect(() => new Isni('123456789012345Z')).toThrow(
      'Invalid MIDDS String format.',
    )
    expect(() => new Isni('ABCDEFGHIJKLMNOX')).toThrow(
      'Invalid MIDDS String format.',
    )
  })

  it('should reject ISNI of incorrect length', () => {
    expect(() => new Isni('123456789012345')).toThrow(
      'Invalid MIDDS String format.',
    ) // too short
    expect(() => new Isni('123456789012345XX')).toThrow(
      'Invalid MIDDS String format.',
    ) // too long
  })

  it('should throw if UTF-8 length exceeds 16 bytes', () => {
    // use characters that expand in UTF-8 (e.g., emoji)
    expect(() => new Isni('🚀🚀🚀🚀🚀🚀🚀🚀')).toThrow(
      'Invalid MIDDS String format.',
    )
  })

  it('should format the ISNI into blocks of 4 digits', () => {
    const isni = new Isni('123456789012345X')
    expect(isni.format()).toBe('1234 5678 9012 345X')
  })

  it('should return string of correct length after formatting', () => {
    const isni = new Isni('123456789012345X')
    const formatted = isni.format()
    expect(formatted.length).toBe(19) // "1234 5678 9012 345X" => 4*4 + 3 spaces = 19
  })

  it('should preserve padding and checksum X correctly', () => {
    const isni = new Isni('000012341234123X')
    expect(isni.format()).toBe('0000 1234 1234 123X')
  })
})
