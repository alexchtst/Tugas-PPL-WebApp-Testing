import { generateRefNum } from "@/app/utils/generateRefNum";

describe("generateRefNum", () => {
  it("should generate ref in format REF-MAxxxx-YYYY", () => {
    const ref = generateRefNum();

    // REF-MA1234-ABCD
    const pattern = /^REF-MA[A-Z0-9]{4}-[A-Z0-9]{4}$/;

    expect(ref).toMatch(pattern);
  });

  it("should always start with 'REF-MA'", () => {
    const ref = generateRefNum();
    expect(ref.startsWith("REF-MA")).toBe(true);
  });

  it("should generate unique values", () => {
    const ref1 = generateRefNum();
    const ref2 = generateRefNum();

    expect(ref1).not.toBe(ref2);
  });
});
