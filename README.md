# Allfeat SDK

> JavaScript/TypeScript SDK for interacting with the Allfeat blockchain.

This monorepo provides essential tooling to interface with the Allfeat networks ecosystem.

## 📦 Packages

### [`@allfeat/client`](./packages/client)

A high-level wrapper around [`dedot`](https://github.com/hi-dust/dedot), preconfigured for Allfeat networks. It simplifies connection setup and interaction with Allfeat-specific runtime modules.

```ts
import { MelodieClient, AllfeatProvider } from '@allfeat/client'

const provider = new AllfeatProvider('melodie') // or 'local' | 'custom-url'
const client = await MelodieClient.new(provider)

// Query free balance
const { data: balance } = await client.query.system.account('your-address-here')

console.log(`Free balance: ${balance.free.toString()}`)
```

---

### [`@allfeat/midds`](./packages/midds)

Core MIDDS (Music Industry Decentralized Data Structure) definitions and utilities.
This package contains types, validation logic, chain encoding helpers and client interfaces for working with musical metadata on Allfeat.

---

### [`@allfeat/chaintypes`](./packages/chaintypes)

TypeScript bindings for the Allfeat runtime, auto-generated via `dedot`.
These types are used internally by the client but can be imported for advanced usage or custom tooling.

```ts
import type { AllfeatMelodieApi } from '@allfeat/chaintypes'

type BalanceCall = AllfeatMelodieApi['tx']['balances']['transferKeepAlive']
```

---

## 🚀 Getting Started

```bash
pnpm install @allfeat/sdk
```

---

## 🌐 Supported Networks

The SDK supports predefined networks or custom WebSocket endpoints:

- `melodie` — Main testnet (`wss://melodie-rpc.allfeat.io`)
- `local` — Local development node (`ws://127.0.0.1:9944`)
- `custom` — Any valid WebSocket URL (e.g. `ws://your-node:9944`)

Example with custom URL:

```ts
const provider = new AllfeatProvider('ws://your-node:9944')
```

---

## 📁 Examples

Usage examples are available in the examples/ directory for real-world integration and testing scenarios.

---

## 🧪 Development

To build and lint/format all packages:

```bash
pnpm install
pnpm build
pnpm format && pnpm lint
```
