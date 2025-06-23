import { Metrics } from '../src/metrics'
import type { DedotClient } from 'dedot'
import type { AllfeatMelodieApi } from '@allfeat/chaintypes'

interface TestClient {
  consts: { balances: { existentialDeposit: bigint } }
  query: {
    system: { account: { entries: jest.Mock<Promise<unknown>, []> } }
  }
}

describe('Metrics.countActiveWallets', () => {
  it('counts entries with balance greater than existential deposit', async () => {
    const entries = [
      [null, { data: { free: 10n } }],
      [null, { data: { free: 3n } }],
      [null, { data: { free: 7n } }],
    ]
    const ctx: TestClient = {
      consts: { balances: { existentialDeposit: 5n } },
      query: {
        system: {
          account: { entries: jest.fn().mockResolvedValue(entries) },
        },
      },
    }

    const metrics = new Metrics(
      ctx as unknown as DedotClient<AllfeatMelodieApi>,
    )
    const result = await metrics.countActiveWallets()

    expect(ctx.query.system.account.entries).toHaveBeenCalled()
    expect(result).toBe(2)
  })
})
