import { MiddsTrack } from '@allfeat/chaintypes/allfeat-melodie'
import { IMidds, IMiddsWithClient } from '../../interfaces'
import { Isrc } from './rw_id/isrc'
import { MelodieClient } from '@allfeat/client'
import { MiddsId, MiddsWithClient } from '../../types'
import {
  Contributors,
  ExtraGenres,
  Performers,
  Producers,
  Title,
  TitleAliases,
  TrackDuration,
  TrackMasteringPlace,
  TrackMixingPlace,
  TrackRecordingPlace,
  TrackVersion,
} from './types'
import { MusicBpm, MusicKey, Year } from '../utils'
import { UnifiedGenreEntry } from '@allfeat/music-genres'

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
    public recording_year: Year,
    public genre: UnifiedGenreEntry,
    public genre_extras: ExtraGenres,
    public version: TrackVersion,
    public duration: TrackDuration,
    public bpm: MusicBpm,
    public key: MusicKey,
    public recording_place: TrackRecordingPlace,
    public mastering_place: TrackMasteringPlace,
    public mixing_place: TrackMixingPlace,
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
      genre: this.genre.toNativeType(),
      genreExtras: this.genre_extras.toNativeType(),
      version: this.version,
      duration: this.duration.toNativeType(),
      bpm: this.bpm.toNativeType(),
      key: this.key,
      recordingPlace: this.recording_place.toNativeType(),
      masteringPlace: this.mastering_place.toNativeType(),
      mixingPlace: this.mixing_place.toNativeType(),
    }
  }

  withClient(client: MelodieClient): IMiddsWithClient<MiddsTrack, Isrc> {
    return new MiddsWithClient<MiddsTrack, Isrc>(this, client, (client, base) =>
      client.tx.tracks.register(base.toNativeType()),
    )
  }
}
