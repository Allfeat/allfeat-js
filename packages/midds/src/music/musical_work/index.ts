import { IMidds, IMiddsWithClient } from '../../interfaces/index.js'
import { MiddsMusicalWork } from '@allfeat/chaintypes/allfeat-melodie'
import { Iswc } from './rw_id/iswc.js'
import { MelodieClient } from '@allfeat/client'
import {
  WorkClassicalInfo,
  WorkParticipants,
  WorkTitle,
  WorkType,
} from './types.js'
import {
  MusicBpm,
  MiddsWithClient,
  MusicKey,
  MusicLanguage,
  Year,
} from '../../index.js'

export * from './types.js'
export { Iswc } from './rw_id/iswc.js'

export class MusicalWork implements IMidds<MiddsMusicalWork, Iswc> {
  constructor(
    public iswc: Iswc,
    public title: WorkTitle,
    public participants: WorkParticipants,
    public creationYear?: Year,
    public isInstrumental?: boolean,
    public workType?: WorkType,
    public bpm?: MusicBpm,
    public language?: MusicLanguage,
    public key?: MusicKey,
    public classical_info?: WorkClassicalInfo,
  ) {}

  rw_id(): Iswc {
    return this.iswc
  }

  withClient(client: MelodieClient): IMiddsWithClient<MiddsMusicalWork, Iswc> {
    return new MiddsWithClient<MiddsMusicalWork, Iswc>(
      this,
      client,
      (client, base) => client.tx.musicalWorks.register(base.toNativeType()),
    )
  }

  toNativeType(): MiddsMusicalWork {
    return {
      iswc: this.iswc.toNativeType(),
      title: this.title.toNativeType(),
      creationYear: this.creationYear,
      instrumental: this.isInstrumental,
      language: this.language,
      key: this.key,
      bpm: this.bpm?.toNativeType(),
      workType: this.workType ? this.workType.toNativeType() : undefined,
      participants: this.participants.toNativeType(),
      classicalInfo: this.classical_info
        ? this.classical_info.toNativeType()
        : undefined,
    }
  }
}
