# @allfeat/chaintypes

## 0.7.0

### Minor Changes

- 19bd34c: - Replaced the concept of Person with Artist in MIDDS. Related types and classes have been renamed accordingly (e.g., ArtistFullName, ArtistAliases). The Artist variant is now reflected in the chain types.
  - Tracks (Track) no longer use a primary genre plus extras. The genres property now accepts an array of genres.
  - Extended MusicKey to cover a broader range of keys, including minor and altered tonalities.
  - Musical works (MusicalWork) now support a new WorkClassicalInfo structure to store opus numbers and catalog references.
  - Simplified the representation of work adaptations: a single reference ID now replaces the previously detailed object.

## 0.6.1

### Patch Changes

- 9b9853a: Fix EntityName incorrect bound

## 0.6.0

### Minor Changes

- 0a6cd65: Make the IPI/ISNI both optionnals

## 0.5.0

### Minor Changes

- b89e77c: Align with melodie-400
  - Make some fields of Track, MusicalWork and PartyIdentifier optionnals

## 0.4.0

### Minor Changes

- 98e81d7: Add Track MIDDS support

## 0.3.0

### Minor Changes

- 24d5ea3: align with melodie-300 (New Genres types)

## 0.2.0

### Minor Changes

- 9826648: Align types with melodie-200

## 0.1.1

### Patch Changes

- 97f1557: Adjusting devDependencies
