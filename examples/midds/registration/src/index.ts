import { AllfeatProvider, MelodieClient } from '@allfeat/client'
import {
  PartyIdentifier,
  Ipi,
  Isni,
  Person,
  PersonFullName,
  PersonAliases,
  PersonType,
  PersonGender,
  PersonAlias,
} from '@allfeat/midds'
import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'

// The account we gonna use to register the MIDDS on the network.
await cryptoWaitReady()
const keyring = new Keyring({ type: 'sr25519' })
const aliceKeyringPair = keyring.addFromUri('//Alice')

// MIDDS creation of a Party.
const theWeeknd = new PartyIdentifier(
  new Ipi(422823364),
  new Isni('0000 0001 2130 5493'),
  new Person(
    new PersonFullName('The Weeknd'),
    PersonType.Solo,
    new PersonAliases([new PersonAlias('Abel Tesfaye')]),
    PersonGender.Male,
  ),
)

// Creating a client instance to connect to a local dev network.
const provider = new AllfeatProvider('local')
const client = await MelodieClient.create(provider)

// We can now attach our client to our MIDDS to make available new network operations to our MIDDS object.
const theWeekndConnected = theWeeknd.withClient(client)

// Finally, we register our MIDDS on the network.
const unsub = await theWeekndConnected
  .register_tx()
  .signAndSend(aliceKeyringPair, async ({ status }) => {
    console.log('Transaction status', status.type)
    if (status.type === 'BestChainBlockIncluded') {
      // or status.type === 'Finalized'
      console.log(
        `Transaction completed at block hash ${status.value.blockHash}`,
      )
      await unsub()
    }
  })
