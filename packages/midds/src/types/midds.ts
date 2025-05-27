import { MelodieClient } from '@allfeat/client'
import { IMiddsWithClient, IMidds } from '../interfaces/index.js'
import { ISubmittableExtrinsic } from 'dedot/types'

export class MiddsWithClient<T, R> implements IMiddsWithClient<T, R> {
  private base: IMidds<T, R>
  private client: MelodieClient
  private readonly registerFn: (
    client: MelodieClient,
    base: IMidds<T, R>,
  ) => ISubmittableExtrinsic

  constructor(
    base: IMidds<T, R>,
    client: MelodieClient,
    registerFn: (
      client: MelodieClient,
      base: IMidds<T, R>,
    ) => ISubmittableExtrinsic,
  ) {
    this.client = client
    this.base = base
    this.registerFn = registerFn
    Object.assign(this, base)
  }

  rw_id(): R {
    return this.base.rw_id()
  }

  getMidds(): IMidds<T, R> {
    return this.base
  }

  getClient(): MelodieClient {
    return this.client
  }

  register_tx(): ISubmittableExtrinsic {
    return this.registerFn(this.client, this.base)
  }

  toNativeType(): T {
    return this.base.toNativeType()
  }

  withClient(client: MelodieClient): IMiddsWithClient<T, R> {
    return new MiddsWithClient(this.base, client, this.registerFn)
  }
}
