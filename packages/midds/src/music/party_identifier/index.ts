export { Isni, Ipi } from './rw_id/index.js'
export { ArtistAlias, ArtistAliases, ArtistFullName } from './types.js'

import {
  MiddsPartyIdentifier,
  MiddsPartyIdentifierEntity,
  MiddsPartyIdentifierArtist,
} from '@allfeat/chaintypes/allfeat-melodie'
import { Isni, Ipi } from './rw_id'
import { ArtistAliases, ArtistFullName, EntityName } from './types'
import {
  IMidds,
  IMiddsWithClient,
  INativeTypeConverter,
} from '../../interfaces/index.js'
import { MelodieClient } from '@allfeat/client'
import { MiddsWithClient } from '../../types/index.js'

export * from './types.js'

export const ArtistType = {
  Solo: 'Person',
  Group: 'Group',
} as const
export type ArtistType = (typeof ArtistType)[keyof typeof ArtistType]

export const ArtistGender = {
  Male: 'Male',
  Female: 'Female',
  Neither: 'Neither',
} as const
export type ArtistGender = (typeof ArtistGender)[keyof typeof ArtistGender]

export const EntityType = {
  Publisher: 'Publisher',
  Producer: 'Producer',
} as const
export type EntityType = (typeof EntityType)[keyof typeof EntityType]

export interface realWorldIds {
  ipi?: Ipi
  isni?: Isni
}

export class PartyIdentifier
  implements IMidds<MiddsPartyIdentifier, realWorldIds>
{
  constructor(
    public identity: Artist | Entity,
    public ipi?: Ipi,
    public isni?: Isni,
  ) {}

  rw_id(): realWorldIds {
    return { ipi: this.ipi, isni: this.isni }
  }

  withClient(
    client: MelodieClient,
  ): IMiddsWithClient<MiddsPartyIdentifier, realWorldIds> {
    return new MiddsWithClient<MiddsPartyIdentifier, realWorldIds>(
      this,
      client,
      (client, base) =>
        client.tx.partyIdentifiers.register(base.toNativeType()),
    )
  }

  toNativeType(): MiddsPartyIdentifier {
    if (this.ipi === undefined && this.isni === undefined) {
      throw new Error('At least the ISNI or IPI is required to be set.')
    }

    return {
      isni: this.isni ? this.isni.toNativeType() : undefined,
      ipi: this.ipi ? BigInt(this.ipi.toNativeType()) : undefined,
      partyType: this.identity.toNativeType(),
    }
  }
}

export class Artist implements INativeTypeConverter<ArtistVariant> {
  constructor(
    public fullName: ArtistFullName,
    public artistType: ArtistType,
    public aliases: ArtistAliases,
    public gender?: ArtistGender,
  ) {}

  toNativeType(): ArtistVariant {
    return {
      type: 'Artist',
      value: {
        fullName: this.fullName.toNativeType(),
        artistType: this.artistType,
        aliases: this.aliases.toNativeType(),
        genre: this.gender,
      },
    }
  }
}
export class Entity implements INativeTypeConverter<EntityVariant> {
  constructor(
    public name: EntityName,
    public entityType: EntityType,
  ) {}

  toNativeType(): EntityVariant {
    return {
      type: 'Entity',
      value: {
        name: this.name.toNativeType(),
        entityType: this.entityType,
      },
    }
  }
}

export interface EntityVariant {
  type: 'Entity'
  value: MiddsPartyIdentifierEntity
}
export interface ArtistVariant {
  type: 'Artist'
  value: MiddsPartyIdentifierArtist
}
