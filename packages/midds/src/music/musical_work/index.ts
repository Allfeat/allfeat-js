import { IMidds, IMiddsWithClient } from '../../interfaces/index.js'
import { MiddsMusicalWork } from '@allfeat/chaintypes/src/allfeat-melodie'
import { Iswc } from './rw_id/iswc.js'
import { MelodieClient } from '@allfeat/client'
import {
  WorkCreationYear,
  WorkParticipants,
  WorkTitle,
  WorkType,
} from './types.js'
import {
  MusicBpm,
  MiddsWithClient,
  MusicKey,
  MusicLanguage,
  MusicMode,
} from '../../index.js'

export class MusicalWork implements IMidds<MiddsMusicalWork, Iswc> {
  constructor(
    public iswc: Iswc,
    public title: WorkTitle,
    public creationYear: WorkCreationYear,
    public isInstrumental: boolean,
    public workType: WorkType,
    public participants: WorkParticipants,
    public bpm?: MusicBpm,
    public language?: MusicLanguage,
    public key?: MusicKey,
    public mode?: MusicMode,
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
      bpm: this.bpm?.toNativeType(),
      workType: this.workType.toNativeType(),
      participants: this.participants.toNativeType(),
    }
  }
}
