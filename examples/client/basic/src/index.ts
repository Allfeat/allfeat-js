import { AllfeatProvider, MelodieClient } from '@allfeat/client'
import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'

function formatUnits(balance: bigint, decimals = 12): string {
  const base = 10n ** BigInt(decimals)
  const whole = balance / base
  return `${whole}`
}

async function main(): Promise<void> {
  await cryptoWaitReady()
  const keyring = new Keyring({ type: 'sr25519' })
  const aliceAddress = keyring.addFromUri('//Alice').address

  const provider = new AllfeatProvider('local')
  const client = await MelodieClient.create(provider)

  const balance = await client.getBalanceOf(aliceAddress)
  console.log(`Alice free balance: ${formatUnits(balance, 12)} ALFT`)

  // Metrics examples
  const activeWallets = await client.metrics.countActiveWallets()
  console.log(`Number of active wallets: ${activeWallets}`)

  const activePartyIdentifiers = await client.metrics.CountPartyIdentifiers()
  console.log(`Number of created Party Identifiers: ${activePartyIdentifiers}`)

  const activeMusicalWorks = await client.metrics.CountMusicalWorks()
  console.log(`Number of created Musical Works: ${activeMusicalWorks}`)

  const totalCreatedMidds = await client.metrics.CountTotalCreatedMidds()
  console.log(`Number of created Midds: ${totalCreatedMidds}`)

  await client.disconnect()
}

main().catch(console.error)
