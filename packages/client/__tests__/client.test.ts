import { MelodieClient } from '../src/client'
import { AllfeatProvider } from '../src/provider'

jest.mock('dedot', () => {
  class DedotClient {
    provider: unknown
    constructor(provider: unknown) {
      this.provider = provider
    }
    connect() {
      return Promise.resolve(this)
    }
  }
  return { DedotClient, WsProvider: jest.fn() }
})

describe('MelodieClient.new', () => {
  it('returns an instance of MelodieClient', async () => {
    const provider = new AllfeatProvider('melodie')
    const client = await MelodieClient.new(provider)

    expect(client).toBeInstanceOf(MelodieClient)
    expect(typeof client.getBalanceOf).toBe('function')
  })
})

describe('MelodieClient.getBalanceOf', () => {
  it('returns the free balance from system.account', async () => {
    const address = 'addr'
    const mockBalance = { data: { free: 123n } }
    const ctx = {
      query: { system: { account: jest.fn().mockResolvedValue(mockBalance) } },
    } as unknown as MelodieClient

    const balance = await MelodieClient.prototype.getBalanceOf.call(
      ctx,
      address,
    )

    expect(ctx.query.system.account).toHaveBeenCalledWith(address)
    expect(balance).toBe(mockBalance.data.free)
  })
})
