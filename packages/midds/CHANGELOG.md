# @allfeat/midds

## 0.7.0

### Minor Changes

- 10886be: Update track version enum to adapt to melodie-600 changes

### Patch Changes

- @allfeat/client@0.2.2

## 0.6.0

### Minor Changes

- 19bd34c: - Replaced the concept of Person with Artist in MIDDS. Related types and classes have been renamed accordingly (e.g., ArtistFullName, ArtistAliases). The Artist variant is now reflected in the chain types.
  - Tracks (Track) no longer use a primary genre plus extras. The genres property now accepts an array of genres.
  - Extended MusicKey to cover a broader range of keys, including minor and altered tonalities.
  - Musical works (MusicalWork) now support a new WorkClassicalInfo structure to store opus numbers and catalog references.
  - Simplified the representation of work adaptations: a single reference ID now replaces the previously detailed object.

### Patch Changes

- @allfeat/client@0.2.2

## 0.5.3

### Patch Changes

- 8f2f67e: bump @allfeat/music-genres version

## 0.5.2

### Patch Changes

- f15d3b2: Update dedot to 0.13.2
- Updated dependencies [f15d3b2]
  - @allfeat/client@0.2.2

## 0.5.1

### Patch Changes

- 9b9853a: Fix EntityName incorrect bound
  - @allfeat/client@0.2.1

## 0.5.0

### Minor Changes

- 0a6cd65: Make the IPI/ISNI both optionnals

### Patch Changes

- @allfeat/client@0.2.1

## 0.4.2

### Patch Changes

- Updated dependencies [66c3f0a]
  - @allfeat/client@0.2.1

## 0.4.1

### Patch Changes

- Updated dependencies [46cbecc]
  - @allfeat/client@0.2.0

## 0.4.0

### Minor Changes

- b89e77c: Align with melodie-400
  - Make some fields of Track, MusicalWork and PartyIdentifier optionnals

### Patch Changes

- @allfeat/client@0.1.0

## 0.3.1

### Patch Changes

- 3964685: Add missing exports

## 0.3.0

### Minor Changes

- 98e81d7: Add Track MIDDS support

### Patch Changes

- @allfeat/client@0.1.0

## 0.2.0

### Minor Changes

- 11e985c: Remove mode field for Musical Work MIDDS

## 0.1.1

### Patch Changes

- 31aedb5: Fix missing types exports
