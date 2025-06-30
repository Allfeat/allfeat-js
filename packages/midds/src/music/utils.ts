/// Shared common industry types

import { MiddsUint } from '../types/index.js'

export const MUSIC_LANGUAGES = [
  'English',
  'French',
  'Spanish',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Chinese',
  'Japanese',
  'Korean',
  'Arabic',
  'Hindi',
  'Dutch',
  'Swedish',
  'Norwegian',
  'Finnish',
  'Polish',
  'Turkish',
  'Hebrew',
  'Greek',
  'Latin',
  'Esperanto',
] as const
export type MusicLanguage = (typeof MUSIC_LANGUAGES)[number]

export const MUSIC_KEYS = [
  'A',
  'Am',
  'As',
  'Asm',
  'Ab',
  'Abm',
  'B',
  'Bm',
  'Bs',
  'Bsm',
  'Bb',
  'Bbm',
  'C',
  'Cm',
  'Cs',
  'Csm',
  'Cb',
  'Cbm',
  'D',
  'Dm',
  'Ds',
  'Dsm',
  'Db',
  'Dbm',
  'E',
  'Em',
  'Es',
  'Esm',
  'Eb',
  'Ebm',
  'F',
  'Fm',
  'Fs',
  'Fsm',
  'Fb',
  'Fbm',
  'G',
  'Gm',
  'Gs',
  'Gsm',
  'Gb',
  'Gbm',
] as const
export type MusicKey = (typeof MUSIC_KEYS)[number]

export const MUSIC_MODES = [
  'Major',
  'Minor',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian',
  'Locrian',
] as const
export type MusicMode = (typeof MUSIC_MODES)[number]

/**
 * BPM (Beats Per Minute) representation in the MIDDS system.
 * Only allows values between 20 and 300 (inclusive).
 */
export class MusicBpm extends MiddsUint {
  protected override min(): number {
    return 20 // minimal practical tempo
  }

  protected override max(): number {
    return 300 // upper bound for musical tempo
  }
}

/**
 * Generic type representing a Year to ensure logic year input.
 */
export type Year = number & { __type: 'Year' }
export function asYear(n: number): Year {
  if (!Number.isInteger(n) || n < 1 || n > 2999) {
    throw new Error(`Invalid year: ${n}`)
  }
  return n as Year
}
