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

  async CountPartyIdentifiers(): Promise<bigint> {
    const nextId = await this.client.query.partyIdentifiers.nextId()
    return nextId - BigInt(1)
  }

  async CountMusicalWorks(): Promise<bigint> {
    const nextId = await this.client.query.musicalWorks.nextId()
    return nextId - BigInt(1)
  }

  async CountTracks(): Promise<bigint> {
    const nextId = await this.client.query.tracks.nextId()
    return nextId - BigInt(1)
  }

  async CountReleases(): Promise<bigint> {
    const nextId = await this.client.query.releases.nextId()
    return nextId - BigInt(1)
  }

  async CountTotalCreatedMidds(): Promise<bigint> {
    return (
      (await this.CountPartyIdentifiers()) +
      (await this.CountMusicalWorks()) +
      (await this.CountTracks()) +
      (await this.CountReleases())
    )
  }
}
