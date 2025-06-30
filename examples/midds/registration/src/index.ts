import { AllfeatProvider, MelodieClient } from '@allfeat/client'
import {
  PartyIdentifier,
  Ipi,
  Isni,
  Track,
  Isrc,
  Producers,
  Performers,
  Contributors,
  Title,
  TitleAliases,
  asYear,
  TrackVersion,
  TrackDuration,
  MusicBpm,
  TrackRecordingPlace,
  TrackMasteringPlace,
  TrackMixingPlace,
  Artist,
  ArtistFullName,
  ArtistType,
  ArtistAlias,
  ArtistAliases,
  ArtistGender,
  TrackGenres,
} from '@allfeat/midds'
import { allGenresUnified } from '@allfeat/music-genres'
import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'

// The account we gonna use to register the MIDDS on the network.
await cryptoWaitReady()
const keyring = new Keyring({ type: 'sr25519' })
const aliceKeyringPair = keyring.addFromUri('//Alice')

// MIDDS creation of a Party.
const theWeeknd = new PartyIdentifier(
  new Artist(
    new ArtistFullName('The Weeknd'),
    ArtistType.Solo,
    new ArtistAliases([new ArtistAlias('Abel Tesfaye')]),
    ArtistGender.Male,
  ),
  new Ipi(422823364),
  new Isni('0000 0001 2130 5493'),
)

const synthpop = allGenresUnified.find((g) => g.id === 'synthpop')
if (!synthpop) {
  throw new Error('Genre Synthpop not found in genre list')
}

// MIDDS Creation of a Track
const blindingLights = new Track(
  new Isrc('USUG11904245'),
  0n,
  0n,
  new Producers([]),
  new Performers([]),
  new Contributors([]),
  new Title('Blinding Lights'),
  new TitleAliases([]),
  new TrackGenres([synthpop]),
  asYear(2019),
  TrackVersion.Original,
  new TrackDuration(200),
  new MusicBpm(171),
  'F',
  new TrackRecordingPlace('Los Angeles, CA'),
  new TrackMasteringPlace('New York, NY'),
  new TrackMixingPlace('Toronto, Canada'),
)

// Creating a client instance to connect to a local dev network.
const provider = new AllfeatProvider('local')
const client = await MelodieClient.create(provider)

// FIXME: fix multiple transaction not being possible

// We can now attach our client to our MIDDS to make available new network operations to our MIDDS object.
const theWeekndConnected = theWeeknd.withClient(client)
const blidingLightsConnected = blindingLights.withClient(client)

// Finally, we register our MIDDS on the network.
const unsubParty = await theWeekndConnected
  .registerTx()
  .signAndSend(aliceKeyringPair, async ({ status }) => {
    console.log('Transaction status', status.type)
    if (status.type === 'BestChainBlockIncluded') {
      // or status.type === 'Finalized'
      console.log(
        `Transaction completed at block hash ${status.value.blockHash}`,
      )
      await unsubParty()
    }
  })

// Finally, we register our MIDDS on the network.
const unsubTrack = await blidingLightsConnected
  .registerTx()
  .signAndSend(aliceKeyringPair, async ({ status }) => {
    console.log('Transaction status', status.type)
    if (status.type === 'BestChainBlockIncluded') {
      // or status.type === 'Finalized'
      console.log(
        `Transaction completed at block hash ${status.value.blockHash}`,
      )
      await unsubTrack()
    }
  })
