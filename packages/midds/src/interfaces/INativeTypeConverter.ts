/** Convertible type to one of the Substrate generated type to use in chain operation */
export interface INativeTypeConverter<T> {
  toNativeType(): T
}
