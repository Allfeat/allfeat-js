import { Bytes } from "dedot/codecs";
import { toHex } from "dedot/utils";

import { IChainTypeConverter } from "../..";

export class ISNI implements IChainTypeConverter<Bytes> {
  readonly value: string;

  constructor(input: string) {
    const normalized = input.replace(/\s/g, "");
    if (!/^[0-9]{15}[0-9X]$/.test(normalized)) {
      throw new Error("Invalid ISNI input");
    }
    this.value = normalized;
  }

  toString(): string {
    return this.value;
  }

  format(): string {
    return this.value.replace(/(.{4})/g, "$1 ").trim();
  }

  toChainType(): `0x${string}` {
    return toHex(this.value);
  }
}
