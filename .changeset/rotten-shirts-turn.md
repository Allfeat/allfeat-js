---
'@allfeat/chaintypes': minor
'@allfeat/midds': minor
---

- Replaced the concept of Person with Artist in MIDDS. Related types and classes have been renamed accordingly (e.g., ArtistFullName, ArtistAliases). The Artist variant is now reflected in the chain types.

- Tracks (Track) no longer use a primary genre plus extras. The genres property now accepts an array of genres.

- Extended MusicKey to cover a broader range of keys, including minor and altered tonalities.

- Musical works (MusicalWork) now support a new WorkClassicalInfo structure to store opus numbers and catalog references.

- Simplified the representation of work adaptations: a single reference ID now replaces the previously detailed object.
