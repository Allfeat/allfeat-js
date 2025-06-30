import { HexString } from 'dedot/utils'
import { MiddsId, MiddsString, MiddsUint } from '../../types'
import { MiddsArrayConvertible, MiddsArrayRaw } from '../../types/array.js'
import { UnifiedGenreEntry } from '@allfeat/music-genres'
import { AllfeatMusicGenresGeneratedGenreId } from '../../../../chaintypes/dist/allfeat-melodie2'

export class Producers extends MiddsArrayRaw<MiddsId> {
  bound(): number {
    return 64
  }
}

export class Performers extends MiddsArrayRaw<MiddsId> {
  bound(): number {
    return 256
  }
}

export class Contributors extends MiddsArrayRaw<MiddsId> {
  bound(): number {
    return 256
  }
}

export class Title extends MiddsString {
  bound(): number {
    return 256
  }
}

export class TitleAliases extends MiddsArrayConvertible<Title, HexString> {
  bound(): number {
    return 16
  }
}

export class TrackGenres extends MiddsArrayConvertible<
  UnifiedGenreEntry,
  AllfeatMusicGenresGeneratedGenreId
> {
  bound(): number {
    return 5
  }
}

export const TrackVersion = {
  Original: 'Original',
  RadioEdit: 'RadioEdit',
  Extended: 'Extended',
  Instrumental: 'Instrumental',
  Acapella: 'Acapella',
  Remix: 'Remix',
  Live: 'Live',
  Acoustic: 'Acoustic',
  Demo: 'Demo',
  ReRecorded: 'ReRecorded',
  AlternateTake: 'AlternateTake',
  Orchestral: 'Orchestral',
  Karaoke: 'Karaoke',
  Clean: 'Clean',
  Explicit: 'Explicit',
  TvTrack: 'TvTrack',
  Dub: 'Dub',
  Edit: 'Edit',
  Mono: 'Mono',
  Stereo: 'Stereo',
  Rehearsal: 'Rehearsal',
} as const
export type TrackVersion = (typeof TrackVersion)[keyof typeof TrackVersion]

export class TrackDuration extends MiddsUint {
  protected min(): number | undefined {
    return 1
  }
  protected max(): number | undefined {
    return 65535 // Rust u16 MAX
  }
}

export class TrackRecordingPlace extends MiddsString {
  bound(): number {
    return 256
  }
}

export class TrackMixingPlace extends MiddsString {
  bound(): number {
    return 256
  }
}

export class TrackMasteringPlace extends MiddsString {
  bound(): number {
    return 256
  }
}
