/** API definition of a Model IP Decentralized Data Structure. */
export interface Midds {
  /** Blake2 integrity hash of the MIDDS data */
  hash(): string;
}

/** Convertible type to one of the Substrate generated type to use in chain operation */
export interface IChainTypeConverter<T> {
  toChainType(): T;
}
