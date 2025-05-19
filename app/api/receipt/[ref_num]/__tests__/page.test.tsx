import { GET } from "../route";
import { PrismaClient } from "../../../../generated/prisma";

// Mock PrismaClient
jest.mock("../../../../generated/prisma", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        receipt: {
          findUnique: jest.fn(),
        },
        $disconnect: jest.fn(),
      };
    }),
  };
});

// Mock NextRequest because the actual implementation relies on Web APIs not available in Node.js environment
jest.mock("next/server", () => {
  const originalModule = jest.requireActual("next/server");

  // Create a simplified mock of NextRequest
  const MockRequest = function (url) {
    this.url = url;
    this.nextUrl = new URL(url);
  };

  // Create a simplified mock of NextResponse
  const mockNextResponse = {
    json: jest.fn((body, init) => {
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
  let mockPrismaClient;
  let mockFindUnique;
  let mockDisconnect;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Get the mocked instance
    mockPrismaClient = new PrismaClient();
    mockFindUnique = mockPrismaClient.receipt.findUnique;
    mockDisconnect = mockPrismaClient.$disconnect;
  });

  it("should return 400 if ref_num is not provided", async () => {
    // Create a simple mock request instead of NextRequest
    const request = {
      url: "http://localhost:3000/api/receipt/",
      nextUrl: new URL("http://localhost:3000/api/receipt/"),
    };

    // Call the GET function with empty params
    const response = await GET(request, { params: { ref_num: "" } });
    const data = await response.json();

    // Assertions
    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Receipt reference number is required" });
  });

  it("should return 404 if receipt is not found", async () => {
    // Mock findUnique to return null (not found)
    mockFindUnique.mockResolvedValue(null);

    // Create a simple mock request
    const request = {
      url: "http://localhost:3000/api/receipt/NONEXISTENT",
      nextUrl: new URL("http://localhost:3000/api/receipt/NONEXISTENT"),
    };

    // Call the GET function
    const response = await GET(request, { params: { ref_num: "NONEXISTENT" } });
    const data = await response.json();

    // Assertions
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { ref_num: "NONEXISTENT" },
    });
    expect(response.status).toBe(404);
    expect(data).toEqual({ error: "Receipt not found" });
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should return receipt data if found", async () => {
    // Mock data
    const mockReceipt = {
      id: 1,
      ref_num: "TAX2025-001",
      tax_type: "Business Income Tax",
      tax_ammount: 2400,
      submission_date: "May 17, 2025",
    };

    // Mock findUnique to return the mock receipt
    mockFindUnique.mockResolvedValue(mockReceipt);

    // Create a simple mock request
    const request = {
      url: "http://localhost:3000/api/receipt/TAX2025-001",
      nextUrl: new URL("http://localhost:3000/api/receipt/TAX2025-001"),
    };

    // Call the GET function
    const response = await GET(request, { params: { ref_num: "TAX2025-001" } });
    const data = await response.json();

    // Assertions
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { ref_num: "TAX2025-001" },
    });
    expect(response.status).toBe(200);
    expect(data).toEqual(mockReceipt);
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should return 500 if an error occurs", async () => {
    // Mock findUnique to throw an error
    mockFindUnique.mockRejectedValue(new Error("Database error"));

    // Create a simple mock request
    const request = {
      url: "http://localhost:3000/api/receipt/TAX2025-001",
      nextUrl: new URL("http://localhost:3000/api/receipt/TAX2025-001"),
    };

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    // Call the GET function
    const response = await GET(request, { params: { ref_num: "TAX2025-001" } });
    const data = await response.json();

    // Assertions
    expect(consoleSpy).toHaveBeenCalled();
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch receipt data" });
    expect(mockDisconnect).toHaveBeenCalled();

    // Restore console.error
    consoleSpy.mockRestore();
  });
});
