import { AllfeatProvider } from '../src/provider'
import { WsProvider } from 'dedot'

/** Dedot WsProvider mocking to not run any real WS connection */
jest.mock('dedot', () => ({
  WsProvider: jest.fn(),
}))

describe('AllfeatProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should instantiate with a known network', () => {
    new AllfeatProvider('melodie')
    expect(WsProvider).toHaveBeenCalledWith('wss://melodie-rpc.allfeat.io')
  })

  it('should instantiate with a custom URL', () => {
    const customUrl = 'ws://custom-node:9944'
    new AllfeatProvider(customUrl)
    expect(WsProvider).toHaveBeenCalledWith(customUrl)
  })

  it('should throw an error when given an empty string', () => {
    expect(() => new AllfeatProvider('')).toThrow(
      "Network '' is not supported, and no valid URL was provided",
    )
  })

  it('getSupportedNetworks() should return all known networks', () => {
    expect(AllfeatProvider.getSupportedNetworks()).toEqual(['melodie', 'local'])
  })
})
