import { Ipi } from '../ipi'

describe('Ipi', () => {
  it('should create a valid Ipi with a number < 11 digits', () => {
    const ipi = new Ipi(12345678)
    expect(ipi.value).toBe(12345678)
    expect(ipi.toString()).toBe('12345678')
    expect(ipi.format()).toBe('00012345678')
  })

  it('should create a valid Ipi with 11 digits', () => {
    const ipi = new Ipi(12345678901)
    expect(ipi.format()).toBe('12345678901')
  })

  it('should throw for values > 11 digits', () => {
    expect(() => new Ipi(123456789012)).toThrow()
  })

  it('should throw for negative values', () => {
    expect(() => new Ipi(-1)).toThrow()
  })

  it('should format 0 correctly', () => {
    const ipi = new Ipi(0)
    expect(ipi.format()).toBe('00000000000')
  })

  it('should always return string of length 11 from format()', () => {
    for (let i = 0; i <= 10; i++) {
      const n = Number('1'.repeat(i))
      const ipi = new Ipi(n)
      expect(ipi.format().length).toBe(11)
    }
  })
})
