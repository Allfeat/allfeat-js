import { MelodieClient } from '@allfeat/client'
import { INativeTypeConverter } from '../index.js'
import { IMiddsWithClient } from './IMiddsWithClient.js'

/** API definition of a Music Industry Decentralized Data Structure. */
export interface IMidds<T, R> extends INativeTypeConverter<T> {
  rw_id(): R

  withClient(client: MelodieClient): IMiddsWithClient<T, R>
}
