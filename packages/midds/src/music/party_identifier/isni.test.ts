import { ISNI } from "./isni";

describe("ISNI class", () => {
  const validISNIs = [
    "0000 0001 2281 955X",
    "000000012281955X",
    "1234 5678 9012 3456",
    "1234567890123456",
    "1234 5678 9012 345X",
    "0000 0000 0000 0000",
  ];

  const invalidISNIs = [
    "", // empty
    "123", // too short
    "12345678901234567", // too long
    "1234 5678 9012 34XX", // bad characters
    "abcd efgh ijkl mnop", // letters
    "0000 0001 2281 955x", // lowercase x (optional depending on policy)
    "0000 0001 2281 955-", // bad char
    "0000 0001 2281", // too short
    "0000 0001 2281 9555X", // too long
  ];

  describe("constructor", () => {
    it.each(validISNIs)('should create a valid ISNI: "%s"', (input) => {
      const isni = new ISNI(input);
      expect(isni).toBeInstanceOf(ISNI);
      expect(isni.toString()).toMatch(/^[0-9]{15}[0-9X]$/);
    });

    it.each(invalidISNIs)('should throw for invalid ISNI: "%s"', (input) => {
      expect(() => new ISNI(input)).toThrow(Error);
    });
  });

  describe("format()", () => {
    it("should return the ISNI formatted in groups of 4", () => {
      const isni = new ISNI("000000012281955X");
      expect(isni.format()).toBe("0000 0001 2281 955X");
    });
  });

  describe("toString()", () => {
    it("should return the normalized ISNI string", () => {
      const isni = new ISNI("0000 0001 2281 955X");
      expect(isni.toString()).toBe("000000012281955X");
    });
  });
});
