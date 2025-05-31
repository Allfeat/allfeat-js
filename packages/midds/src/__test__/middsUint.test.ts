import { MiddsUint } from '../types/uint'

// Classe concrète pour tests
class TestUint extends MiddsUint {
  protected override min(): number {
    return 10
  }

  protected override max(): number {
    return 100
  }
}

describe('MiddsUint (refactor abstract)', () => {
  it('should create a valid instance within bounds', () => {
    const u = new TestUint(42)
    expect(u.value).toBe(42)
    expect(u.toNativeType()).toBe(42)
    expect(u.toString()).toBe('42')
  })

  it('should throw for a value below min()', () => {
    expect(() => new TestUint(5)).toThrow('MIDDS number value is not valid')
  })

  it('should throw for a value above max()', () => {
    expect(() => new TestUint(150)).toThrow('MIDDS number value is not valid')
  })

  it('should allow value equal to min and max boundaries', () => {
    expect(() => new TestUint(10)).not.toThrow()
    expect(() => new TestUint(100)).not.toThrow()
  })

  it('should throw for negative values', () => {
    expect(() => new TestUint(-1)).toThrow(
      'MIDDS number values must be a non-negative finite number.',
    )
  })

  it('should throw for NaN or Infinity', () => {
    expect(() => new TestUint(NaN)).toThrow()
    expect(() => new TestUint(Infinity)).toThrow()
  })

  it('should allow value 0 if min() is overridden to 0', () => {
    class ZeroAllowed extends MiddsUint {
      protected override min(): number {
        return 0
      }
    }

    const u = new ZeroAllowed(0)
    expect(u.value).toBe(0)
  })

  it('should use from() factory correctly', () => {
    class FactoryUint extends MiddsUint {
      protected override max() {
        return 1000
      }

      protected override min() {
        return 1
      }
    }

    const u = FactoryUint.from('123')
    expect(u.value).toBe(123)
    expect(u.toNativeType()).toBe(123)
  })
})
