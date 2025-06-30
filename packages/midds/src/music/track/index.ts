import { MiddsTrack } from '@allfeat/chaintypes/allfeat-melodie'
import { IMidds, IMiddsWithClient } from '../../interfaces'
import { Isrc } from './rw_id/isrc'
import { MelodieClient } from '@allfeat/client'
import { MiddsId, MiddsWithClient } from '../../types'
import {
  Contributors,
  Performers,
  Producers,
  Title,
  TitleAliases,
  TrackDuration,
  TrackGenres,
  TrackMasteringPlace,
  TrackMixingPlace,
  TrackRecordingPlace,
  TrackVersion,
} from './types'
import { MusicBpm, MusicKey, Year } from '../utils'

export * from './types'
export { Isrc } from './rw_id'

export class Track implements IMidds<MiddsTrack, Isrc> {
  constructor(
    public isrc: Isrc,
    public musicalWork: MiddsId,
    public artist: MiddsId,
    public producers: Producers,
    public performers: Performers,
    public contributors: Contributors,
    public title: Title,
    public title_aliases: TitleAliases,
    public genres: TrackGenres,
    public recording_year?: Year,
    public version?: TrackVersion,
    public duration?: TrackDuration,
    public bpm?: MusicBpm,
    public key?: MusicKey,
    public recording_place?: TrackRecordingPlace,
    public mastering_place?: TrackMasteringPlace,
    public mixing_place?: TrackMixingPlace,
  ) {}

  rw_id(): Isrc {
    return this.isrc
  }

  toNativeType(): MiddsTrack {
    return {
      isrc: this.isrc.toNativeType(),
      musicalWork: this.musicalWork,
      artist: this.artist,
      producers: this.producers.toNativeType(),
      performers: this.performers.toNativeType(),
      contributors: this.contributors.toNativeType(),
      title: this.title.toNativeType(),
      titleAliases: this.title_aliases.toNativeType(),
      recordingYear: this.recording_year,
      genres: this.genres.toNativeType(),
      version: this.version,
      duration: this.duration ? this.duration.toNativeType() : undefined,
      bpm: this.bpm ? this.bpm.toNativeType() : undefined,
      key: this.key,
      recordingPlace: this.recording_place
        ? this.recording_place.toNativeType()
        : undefined,
      masteringPlace: this.mastering_place
        ? this.mastering_place.toNativeType()
        : undefined,
      mixingPlace: this.mixing_place
        ? this.mixing_place.toNativeType()
        : undefined,
    }
  }

  withClient(client: MelodieClient): IMiddsWithClient<MiddsTrack, Isrc> {
    return new MiddsWithClient<MiddsTrack, Isrc>(this, client, (client, base) =>
      client.tx.tracks.register(base.toNativeType()),
    )
  }
}
