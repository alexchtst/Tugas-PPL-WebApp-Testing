import { GET } from "../route";
import prisma from "../../../../generated/prisma";

// Mock PrismaClient
jest.mock("../../../../generated/prisma", () => {
  return {
    receipt: {
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
});

// Mock NextRequest and NextResponse
jest.mock("next/server", () => {
  const originalModule = jest.requireActual("next/server");

  // Create a simplified mock of NextRequest
  const MockRequest = function (url: string) {
    this.url = url;
    this.nextUrl = new URL(url);
  };

  // Create a simplified mock of NextResponse
  const mockNextResponse = {
    json: jest.fn((body: any, init?: { status?: number }) => {
      return {
        status: init?.status || 200,
        body,
        json: async () => body,
      };
    }),
  };

  return {
    ...originalModule,
    NextRequest: MockRequest,
    NextResponse: mockNextResponse,
  };
});

describe("Receipt API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if ref_num is not provided", async () => {
    const request = { url: "http://localhost:3000/api/receipt/" };
    const response = await GET(request as any, { params: { ref_num: "" } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Receipt reference number is required" });
  });

  it("should return 404 if receipt is not found", async () => {
    (prisma.receipt.findUnique as jest.Mock).mockResolvedValue(null);

    const request = { url: "http://localhost:3000/api/receipt/NONEXISTENT" };
    const response = await GET(request as any, {
      params: { ref_num: "NONEXISTENT" },
    });
    const data = await response.json();

    expect(prisma.receipt.findUnique).toHaveBeenCalledWith({
      where: { ref_num: "NONEXISTENT" },
    });
    expect(response.status).toBe(404);
    expect(data).toEqual({ error: "Receipt not found" });
  });

  it("should return receipt data if found", async () => {
    const mockReceipt = {
      id: 1,
      ref_num: "TAX2025-001",
      tax_type: "Business Income Tax",
      tax_amount: 2400,
      submission_date: "May 17, 2025",
    };

    (prisma.receipt.findUnique as jest.Mock).mockResolvedValue(mockReceipt);

    const request = { url: "http://localhost:3000/api/receipt/TAX2025-001" };
    const response = await GET(request as any, {
      params: { ref_num: "TAX2025-001" },
    });
    const data = await response.json();

    expect(prisma.receipt.findUnique).toHaveBeenCalledWith({
      where: { ref_num: "TAX2025-001" },
    });
    expect(response.status).toBe(200);
    expect(data).toEqual(mockReceipt);
  });

  it("should return 500 if an error occurs", async () => {
    (prisma.receipt.findUnique as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const request = { url: "http://localhost:3000/api/receipt/TAX2025-001" };
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const response = await GET(request as any, {
      params: { ref_num: "TAX2025-001" },
    });
    const data = await response.json();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching receipt:",
      expect.any(Error)
    );
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch receipt" });

    consoleSpy.mockRestore();
  });
});
