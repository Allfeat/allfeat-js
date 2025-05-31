import { ISubmittableExtrinsic } from 'dedot/types'
import { MiddsWithClient } from '../types/midds'
import type { IMidds, IMiddsWithClient } from '../interfaces'
import type { MelodieClient } from '@allfeat/client'

class FakeMidds implements IMidds<string, `rw${number}`> {
  private id: number
  constructor(id: number) {
    this.id = id
  }

  toNativeType(): string {
    return `native-${this.id}`
  }

  rw_id(): `rw${number}` {
    return `rw${this.id}`
  }

  withClient(): IMiddsWithClient<string, `rw${number}`> {
    throw new Error('not implemented in test')
  }
}

function createMockClient(name: string): MelodieClient {
  return {
    name: name,
    tx: {
      songs: {
        register: jest.fn(),
      },
      partyIdentifiers: {
        register: jest.fn(),
      },
    },
  } as unknown as MelodieClient
}

describe('MiddsWithClient', () => {
  const fakeExtrinsic = {
    method: 'fake.register',
    toHex: () => '0x00',
    toHuman: () => 'mocked',
  } as unknown as ISubmittableExtrinsic
  const clientA = createMockClient('A')
  const clientB = createMockClient('B')

  const registerFn = jest.fn(() => {
    return fakeExtrinsic
  })

  const base = new FakeMidds(77)
  const wrapped = new MiddsWithClient(base, clientA, registerFn)

  it('should delegate rw_id() and toNativeType()', () => {
    expect(wrapped.rw_id()).toBe('rw77')
    expect(wrapped.toNativeType()).toBe('native-77')
  })

  it('should return the correct client and midds', () => {
    expect(wrapped.getClient()).toBe(clientA)
    expect(wrapped.getMidds()).toBe(base)
  })

  it('should call registerFn correctly', () => {
    const tx = wrapped.register_tx()
    expect(registerFn).toHaveBeenCalledWith(clientA, base)
    expect(tx).toBe(fakeExtrinsic)
  })

  it('should allow switching client with withClient()', () => {
    const other = wrapped.withClient(clientB)

    expect(other.getClient()).toBe(clientB)
    expect(other.rw_id()).toBe('rw77')
    expect(other.toNativeType()).toBe('native-77')
    expect(other.register_tx()).toBe(fakeExtrinsic)
    expect(registerFn).toHaveBeenCalledWith(clientB, base)
  })
})
