import { Isrc } from '../isrc.js'

describe('Isrc', () => {
  test('accepts valid ISRC in normalized form', () => {
    const isrc = new Isrc('FRZ123001234')
    expect(isrc.toString()).toBe('FRZ123001234')
    expect(isrc.format()).toBe('FR-Z12-30-01234')
    expect(isrc.toNativeType()).toMatch(/^0x/)
  })

  test('normalizes and accepts formatted ISRC', () => {
    const isrc = new Isrc('fr-z12-30-01234')
    expect(isrc.toString()).toBe('FRZ123001234')
    expect(isrc.format()).toBe('FR-Z12-30-01234')
  })

  test('normalizes and accepts ISRC with dots/spaces', () => {
    const isrc = new Isrc(' fr. z12 30.01234 ')
    expect(isrc.toString()).toBe('FRZ123001234')
    expect(isrc.format()).toBe('FR-Z12-30-01234')
  })

  test('throws on invalid ISRC: too short', () => {
    expect(() => new Isrc('FRZ1230012')).toThrow('Invalid MIDDS String format.')
  })

  test('throws on invalid ISRC: wrong structure', () => {
    expect(() => new Isrc('123456789012')).toThrow(
      'Invalid MIDDS String format.',
    )
  })

  test('throws if normalized string exceeds byte bound', () => {
    // bound = 12, adding emoji or multibyte chars should cause failure
    expect(() => new Isrc('FR-Z12-30-0123🎵')).toThrow(
      'Input String might be too large for the expected MIDDS bound.',
    )
  })

  test('equality check works', () => {
    const a = new Isrc('fr-z12-30-01234')
    const b = new Isrc('FRZ123001234')
    expect(a.equals(b)).toBe(true)
  })
})
