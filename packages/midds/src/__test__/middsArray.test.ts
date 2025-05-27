import { MiddsArrayConvertible, MiddsArrayRaw } from '../types/array.js'
import type { INativeTypeConverter } from '../interfaces/INativeTypeConverter.js'

// Mock convertible type
class MockItem implements INativeTypeConverter<number> {
  constructor(public value: number) {}
  toNativeType(): number {
    return this.value
  }
  toString() {
    return this.value.toString()
  }
}

// Concrete array classes for testing
class TestConvertibleArray extends MiddsArrayConvertible<MockItem, number> {
  bound() {
    return 3
  }
}

class TestRawArray extends MiddsArrayRaw<string> {
  bound() {
    return 3
  }
}

describe('MiddsArrayConvertible', () => {
  it('initializes and converts to native type', () => {
    const arr = new TestConvertibleArray([new MockItem(1), new MockItem(2)])
    expect(arr.toNativeType()).toEqual([1, 2])
  })

  it('throws when adding over bound', () => {
    const arr = new TestConvertibleArray([
      new MockItem(1),
      new MockItem(2),
      new MockItem(3),
    ])
    expect(() => arr.add(new MockItem(4))).toThrow()
  })

  it('removes item correctly', () => {
    const arr = new TestConvertibleArray([
      new MockItem(1),
      new MockItem(2),
      new MockItem(3),
    ])
    arr.remove(1)
    expect(arr.toNativeType()).toEqual([1, 3])
  })

  it('replaces all values within bound', () => {
    const arr = new TestConvertibleArray([new MockItem(1)])
    arr.replaceAll([new MockItem(7), new MockItem(8)])
    expect(arr.toNativeType()).toEqual([7, 8])
  })

  it('clears all values', () => {
    const arr = new TestConvertibleArray([new MockItem(1), new MockItem(2)])
    arr.clear()
    expect(arr.length).toBe(0)
  })

  it('returns correct item with at()', () => {
    const arr = new TestConvertibleArray([new MockItem(10), new MockItem(20)])
    expect(arr.at(1)?.value).toBe(20)
    expect(arr.at(-1)?.value).toBe(20)
  })

  it('removes item with removeWhere()', () => {
    const arr = new TestConvertibleArray([
      new MockItem(1),
      new MockItem(2),
      new MockItem(3),
    ])
    arr.removeWhere((v) => v.value === 2)
    expect(arr.toNativeType()).toEqual([1, 3])
  })

  it('checks equality', () => {
    const a = new TestConvertibleArray([new MockItem(1)])
    const b = new TestConvertibleArray([new MockItem(1)])
    expect(a.equals(b)).toBe(true)
  })
})

describe('MiddsArrayRaw', () => {
  it('initializes and exposes native array', () => {
    const arr = new TestRawArray(['a', 'b'])
    expect(arr.toNativeType()).toEqual(['a', 'b'])
  })

  it('throws when adding over bound', () => {
    const arr = new TestRawArray(['a', 'b', 'c'])
    expect(() => arr.add('d')).toThrow()
  })

  it('removes item correctly', () => {
    const arr = new TestRawArray(['x', 'y', 'z'])
    arr.remove(1)
    expect(arr.toNativeType()).toEqual(['x', 'z'])
  })

  it('replaces all values', () => {
    const arr = new TestRawArray(['foo'])
    arr.replaceAll(['bar', 'baz'])
    expect(arr.toNativeType()).toEqual(['bar', 'baz'])
  })

  it('clears all values', () => {
    const arr = new TestRawArray(['1', '2'])
    arr.clear()
    expect(arr.length).toBe(0)
  })

  it('returns correct item with at()', () => {
    const arr = new TestRawArray(['first', 'last'])
    expect(arr.at(1)).toBe('last')
    expect(arr.at(-1)).toBe('last')
  })

  it('removes item with removeWhere()', () => {
    const arr = new TestRawArray(['apple', 'banana', 'cherry'])
    arr.removeWhere((val) => val.startsWith('b'))
    expect(arr.toNativeType()).toEqual(['apple', 'cherry'])
  })

  it('checks equality', () => {
    const a = new TestRawArray(['alpha'])
    const b = new TestRawArray(['alpha'])
    expect(a.equals(b)).toBe(true)
  })
})
