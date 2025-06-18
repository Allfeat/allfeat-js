export { Isni, Ipi } from './rw_id/index.js'
export { PersonAliases, PersonAlias, PersonFullName } from './types.js'

import {
  MiddsPartyIdentifier,
  MiddsPartyIdentifierEntity,
  MiddsPartyIdentifierPerson,
} from '@allfeat/chaintypes/allfeat-melodie'
import { Isni, Ipi } from './rw_id'
import { EntityName, PersonAliases, PersonFullName } from './types'
import {
  IMidds,
  IMiddsWithClient,
  INativeTypeConverter,
} from '../../interfaces/index.js'
import { MelodieClient } from '@allfeat/client'
import { MiddsWithClient } from '../../types/index.js'

export * from './types.js'

export const PersonType = {
  Solo: 'Solo',
  Group: 'Group',
} as const
export type PersonType = (typeof PersonType)[keyof typeof PersonType]

export const PersonGender = {
  Male: 'Male',
  Female: 'Female',
  Neither: 'Neither',
} as const
export type PersonGender = (typeof PersonGender)[keyof typeof PersonGender]

export const EntityType = {
  Publisher: 'Publisher',
  Producer: 'Producer',
  DistribAggr: 'DistribAggr',
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
    public identity: Person | Entity,
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

export class Person implements INativeTypeConverter<PersonVariant> {
  constructor(
    public fullName: PersonFullName,
    public personType: PersonType,
    public aliases: PersonAliases,
    public gender?: PersonGender,
  ) {}

  toNativeType(): PersonVariant {
    return {
      type: 'Person',
      value: {
        fullName: this.fullName.toNativeType(),
        personType: this.personType,
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
export interface PersonVariant {
  type: 'Person'
  value: MiddsPartyIdentifierPerson
}
