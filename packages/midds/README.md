# @allfeat/midds

> Types, validators, encoders and blockchain helpers for the Allfeat MIDDS system.

MIDDS (Music Industry Decentralized Data Structures) is the core metadata model powering the Allfeat blockchain. This package provides composable classes and tools to create, validate, serialize and register music-related data on-chain.

## 🎼 What is MIDDS?

MIDDS represent structured metadata for music industry entities such as:

- Musical works (songs, adaptations, mashups)
- Recordings (tracks)
- Releases (albums, singles)
- Rights and roles (stakeholders, rights splits)

Each MIDDS type maps to a specific on-chain structure and is responsible for its own validation, normalization and serialization logic.

## 📦 Installation

```bash
pnpm add @allfeat/midds
# or
npm install @allfeat/midds
```
