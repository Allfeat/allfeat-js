import type { DedotClient } from 'dedot'
import type { AllfeatMelodieApi } from '@allfeat/chaintypes'

export class Metrics {
  constructor(private client: DedotClient<AllfeatMelodieApi>) {}

  /**
   * Counts the number of accounts whose free balance is greater than the chain existential deposit.
   */
  async countActiveWallets(): Promise<number> {
    const ed = this.client.consts.balances.existentialDeposit
    const entries = await this.client.query.system.account.entries()
    return entries.reduce(
      (acc: number, [, info]: [unknown, { data: { free: bigint } }]) =>
        acc + (info.data.free > ed ? 1 : 0),
      0,
    )
  }
}
