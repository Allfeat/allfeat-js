import { INativeTypeConverter } from '../interfaces/index.js'

export abstract class MiddsArrayConvertible<
  T extends INativeTypeConverter<U>,
  U,
> implements INativeTypeConverter<U[]>
{
  protected items: T[]

  constructor(values: T[]) {
    this.items = []
    values.forEach((v) => this.add(v))
  }

  abstract bound(): number

  get length(): number {
    return this.items.length
  }

  at(index: number): T | undefined {
    if (index < 0) index = this.items.length + index
    return this.items[index]
  }

  toArray(): T[] {
    return [...this.items]
  }

  toString(): string {
    return JSON.stringify(this.items)
  }

  equals(other: MiddsArrayConvertible<T, U>): boolean {
    if (this.length !== other.length) return false
    return this.items.every((item, i) => {
      const otherItem = other.items[i]
      return (
        otherItem !== undefined &&
        item.toNativeType() === otherItem.toNativeType()
      )
    })
  }

  toNativeType(): U[] {
    return this.items.map((item) => item.toNativeType())
  }

  add(value: T): void {
    if (this.items.length >= this.bound()) {
      throw new Error(
        `Cannot add: MiddsArray has reached its maximum length of ${this.bound()}`,
      )
    }
    this.items.push(value)
  }

  remove(index: number): void {
    if (index < 0 || index >= this.items.length) {
      throw new Error(`Index ${index} is out of bounds`)
    }
    this.items.splice(index, 1)
  }

  removeWhere(predicate: (value: T, index: number) => boolean): void {
    this.items = this.items.filter((item, i) => !predicate(item, i))
  }

  replaceAll(values: T[]): void {
    if (values.length > this.bound()) {
      throw new Error(`Too many elements (max ${this.bound()})`)
    }
    this.items = [...values]
  }

  clear(): void {
    this.items = []
  }
}

export abstract class MiddsArrayRaw<T> implements INativeTypeConverter<T[]> {
  protected items: T[]

  constructor(values: T[]) {
    this.items = []
    values.forEach((v) => this.add(v))
  }

  abstract bound(): number

  get length(): number {
    return this.items.length
  }

  at(index: number): T | undefined {
    if (index < 0) index = this.items.length + index
    return this.items[index]
  }

  toArray(): T[] {
    return [...this.items]
  }

  toString(): string {
    return JSON.stringify(this.items)
  }

  equals(other: MiddsArrayRaw<T>): boolean {
    if (this.length !== other.length) return false
    return this.items.every((item, i) => item === other.items[i])
  }

  toNativeType(): T[] {
    return [...this.items]
  }

  add(value: T): void {
    if (this.items.length >= this.bound()) {
      throw new Error(
        `Cannot add: MiddsArray has reached its maximum length of ${this.bound()}`,
      )
    }
    this.items.push(value)
  }

  remove(index: number): void {
    if (index < 0 || index >= this.items.length) {
      throw new Error(`Index ${index} is out of bounds`)
    }
    this.items.splice(index, 1)
  }

  removeWhere(predicate: (value: T, index: number) => boolean): void {
    this.items = this.items.filter((item, i) => !predicate(item, i))
  }

  replaceAll(values: T[]): void {
    if (values.length > this.bound()) {
      throw new Error(`Too many elements (max ${this.bound()})`)
    }
    this.items = [...values]
  }

  clear(): void {
    this.items = []
  }
}
