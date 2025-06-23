import { DedotClient } from 'dedot'
import { AllfeatProvider } from './provider.js'
import { Metrics } from './metrics.js'
import { AllfeatMelodieApi } from '@allfeat/chaintypes'

/**
 * A typed client to interact with the Melodie network (Allfeat Testnet).
 *
 * This class extends the generic `DedotClient` and provides a strongly-typed interface
 * to the Melodie runtime via the `AllfeatMelodieApi` type.
 *
 * Example usage:
 * ```ts
 * const provider = new AllfeatProvider("melodie");
 * const client = await MelodieClient.new(provider);
 * const block = await client.api.rpc.chain.getBlock();
 * ```
 */
export class MelodieClient extends DedotClient<AllfeatMelodieApi> {
  /** Helper metrics utilities */
  readonly metrics: Metrics

  private constructor(provider: AllfeatProvider) {
    super(provider)
    this.metrics = new Metrics(this)
  }

  static override async create(
    provider: AllfeatProvider,
  ): Promise<MelodieClient> {
    const client = new MelodieClient(provider)
    await client.connect()
    return client
  }

  static override async new(provider: AllfeatProvider): Promise<MelodieClient> {
    return this.create(provider)
  }

  /**
   * Get the free token balance of an account.
   *
   * @param address - Allfeat SS58 address of the account to query.
   * @returns The account free balance as bigint.
   */
  async getBalanceOf(address: string): Promise<bigint> {
    const account = await this.query.system.account(address)
    return account.data.free
  }
}
