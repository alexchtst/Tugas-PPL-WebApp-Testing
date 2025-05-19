import { GET } from "../route";
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

jest.mock("@/app/generated/prisma");
jest.mock("next/server", () => {
  const original = jest.requireActual("next/server");
  return {
    ...original,
    NextResponse: {
      json: jest.fn((data, init) => ({
        status: init?.status || 200,
        json: async () => data,
      })),
    },
  };
});

const MockedPrisma = PrismaClient as jest.MockedClass<typeof PrismaClient>;

describe("GET /api/receipt/[ref_num] - found Income Tax", () => {
  it("should return receipt data when found [200]", async () => {
    const refNum = "REF-MAMAUIBO-W8";
    const mockReceipt = {
      id: 3,
      ref_num: refNum,
      tax_type: "Income Tax",
      tax_amount: 33333,
      submission_date: "2025-05-19"
    };

    MockedPrisma.prototype.receipt = {
      findUnique: jest.fn().mockResolvedValue(mockReceipt),
    } as any;

    const request = {
      url: `http://localhost/api/receipt/${refNum}`,
    } as unknown as NextRequest;

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockReceipt);
  });
});


describe("GET /api/receipt/[ref_num] - found Vehicle Tax", () => {
  it("should return receipt data when found [200]", async () => {
    const refNum = "REF-MAJQ92-U00K";
    const mockReceipt = {
      id: 5,
      ref_num: refNum,
      tax_type: "Vehicle Tax",
      tax_amount: 6666,
      submission_date: "2025-05-19"
    };

    MockedPrisma.prototype.receipt = {
      findUnique: jest.fn().mockResolvedValue(mockReceipt),
    } as any;

    const request = {
      url: `http://localhost/api/receipt/${refNum}`,
    } as unknown as NextRequest;

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockReceipt);
  });
});


describe("GET /api/receipt/[ref_num] - mismatch", () => {
  it("should not match incorrect receipt data [200]", async () => {
    const ref = "REF-MAMAUIAI-1D";
    const wrongReciept = {
      "id": 2,
      "ref_num": "REF-MAMAUIBC-6X",
      "tax_type": "Property Tax",
      "tax_amount": 33333,
      "submission_date": "2025-05-19"
    };

    const expectedReceipt = {
      "id": 1,
      "ref_num": "REF-MAMAUIAI-1D",
      "tax_type": "Income Tax",
      "tax_amount": 22222,
      "submission_date": "2025-05-19"
    };

    MockedPrisma.prototype.receipt = {
      findUnique: jest.fn().mockResolvedValue(wrongReciept),
    } as any;

    const request = {
      url: `http://localhost/api/receipt/${ref}`,
    } as unknown as NextRequest;

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).not.toEqual(expectedReceipt);
  });
});


describe("GET /api/receipt/[ref_num] - not found", () => {
  it("should return 404 when receipt not found", async () => {
    const refNum = "haha";
    const expectedError = {
      error: `Receipt with ref ${refNum} not found`,
    };

    MockedPrisma.prototype.receipt = {
      findUnique: jest.fn().mockResolvedValue(null),
    } as any;

    const request = {
      url: `http://localhost/api/receipt/${refNum}`,
    } as unknown as NextRequest;

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual(expectedError);
  });
});



// get all data
// [
//     {
//         "id": 1,
//         "ref_num": "REF-MAMAUIAI-1D",
//         "tax_type": "Income Tax",
//         "tax_amount": 22222,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 2,
//         "ref_num": "REF-MAMAUIBC-6X",
//         "tax_type": "Property Tax",
//         "tax_amount": 33333,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 3,
//         "ref_num": "REF-MAMAUIBO-W8",
//         "tax_type": "Income Tax",
//         "tax_amount": 33333,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 4,
//         "ref_num": "REF-MAJJS1-AJPR",
//         "tax_type": "Vehicle Tax",
//         "tax_amount": 44444,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 5,
//         "ref_num": "REF-MAJQ92-U00K",
//         "tax_type": "Vehicle Tax",
//         "tax_amount": 6666,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 6,
//         "ref_num": "REF-MA2D9Q-Q0FM",
//         "tax_type": "Property Tax",
//         "tax_amount": 2222,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 7,
//         "ref_num": "REF-MA30T2-UK62",
//         "tax_type": "Income Tax",
//         "tax_amount": 44444,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 8,
//         "ref_num": "REF-MAGC56-63ZG",
//         "tax_type": "Property Tax",
//         "tax_amount": 4,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 9,
//         "ref_num": "REF-MAURG9-R6JU",
//         "tax_type": "Vehicle Tax",
//         "tax_amount": 333,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 10,
//         "ref_num": "REF-MAXI6F-IIRS",
//         "tax_type": "Vehicle Tax",
//         "tax_amount": 455,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 11,
//         "ref_num": "REF-MAN4J3-76KM",
//         "tax_type": "Vehicle Tax",
//         "tax_amount": 100,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 12,
//         "ref_num": "REF-MANV9O-LQRH",
//         "tax_type": "Income Tax",
//         "tax_amount": 1200,
//         "submission_date": "2025-05-19"
//     },
//     {
//         "id": 13,
//         "ref_num": "REF-MA304X-2HDA",
//         "tax_type": "Property Tax",
//         "tax_amount": 1200,
//         "submission_date": "2025-05-19"
//     }
// ]