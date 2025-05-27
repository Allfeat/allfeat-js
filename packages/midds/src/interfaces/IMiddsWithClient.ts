import { MelodieClient } from '@allfeat/client'
import { IMidds } from './IMidds.js'
import { ISubmittableExtrinsic } from 'dedot/types'

export interface IMiddsWithClient<T, R> extends IMidds<T, R> {
  getClient(): MelodieClient
  getMidds(): IMidds<T, R>

  register_tx(): ISubmittableExtrinsic
}
