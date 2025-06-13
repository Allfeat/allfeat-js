import {
  MiddsMusicalWorkMusicalWorkType,
  MiddsMusicalWorkParticipant,
} from '@allfeat/chaintypes/allfeat-melodie'

import { MiddsId, MiddsString } from '../../types/index.js'
import { INativeTypeConverter } from '../../interfaces/INativeTypeConverter.js'
import { MiddsArrayConvertible, MiddsArrayRaw } from '../../types/array.js'

export class WorkTitle extends MiddsString {
  bound(): number {
    return 256
  }
}

export type isInstrumentalWork = boolean

export type WorkType = OriginalWork | MedleyWork | MashupWork | AdaptationWork

export class OriginalWork
  implements INativeTypeConverter<MiddsMusicalWorkMusicalWorkType>
{
  toNativeType(): MiddsMusicalWorkMusicalWorkType {
    return { type: 'Original' }
  }
}
export class MedleyWork
  implements INativeTypeConverter<MiddsMusicalWorkMusicalWorkType>
{
  constructor(public references: WorkReferences) {}

  toNativeType(): MiddsMusicalWorkMusicalWorkType {
    return { type: 'Medley', value: this.references.toNativeType() }
  }
}
export class MashupWork
  implements INativeTypeConverter<MiddsMusicalWorkMusicalWorkType>
{
  constructor(public references: WorkReferences) {}

  toNativeType(): MiddsMusicalWorkMusicalWorkType {
    return { type: 'Mashup', value: this.references.toNativeType() }
  }
}
export class AdaptationWork
  implements INativeTypeConverter<MiddsMusicalWorkMusicalWorkType>
{
  constructor(
    public references: WorkReferences,
    public isLyricsAdaptation: boolean,
    public isSongAdaptation: boolean,
  ) {}

  toNativeType(): MiddsMusicalWorkMusicalWorkType {
    return {
      type: 'Adaptation',
      value: {
        references: this.references.toNativeType(),
        lyricsAdaptation: this.isLyricsAdaptation,
        songAdaptation: this.isSongAdaptation,
      },
    }
  }
}

export class WorkReferences extends MiddsArrayRaw<MiddsId> {
  bound(): number {
    return 512
  }
}

export const WorkParticipantRole = {
  Author: 'Author',
  Composer: 'Composer',
  Arranger: 'Arranger',
  Adapter: 'Adapter',
  Editor: 'Editor',
} as const
export type WorkParticipantRole =
  (typeof WorkParticipantRole)[keyof typeof WorkParticipantRole]

export class WorkParticipant
  implements INativeTypeConverter<MiddsMusicalWorkParticipant>
{
  constructor(
    public id: MiddsId,
    public role: WorkParticipantRole,
  ) {}

  toNativeType(): MiddsMusicalWorkParticipant {
    return {
      id: this.id,
      role: this.role,
    }
  }
}

export class WorkParticipants extends MiddsArrayConvertible<
  WorkParticipant,
  MiddsMusicalWorkParticipant
> {
  bound(): number {
    return 512
  }
}
