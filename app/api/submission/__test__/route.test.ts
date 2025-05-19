import { POST } from "../route";
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

// Mock prisma
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

describe("POST /api/submission", () => {

  it("should create and return new receipt [201]", async () => {
    const mockSubmission = {
      id: 1,
      ref_num: "MOCK-REF-123",
      tax_type: "Property Tax",
      tax_amount: 12000,
      submission_date: "2025-05-19",
    };

    MockedPrisma.prototype.receipt = {
      create: jest.fn().mockResolvedValue(mockSubmission),
    } as any;

    const mockRequestBody = {
      tax_type: "Property Tax",
      tax_amount: 12000,
      submission_date: "2025-05-19",
    };

    const request = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual(mockSubmission);
  });

  it("should return 400 if required fields are missing", async () => {
    const badRequest = {
      json: jest.fn().mockResolvedValue({
        tax_type: "Property Tax", // tax_amount atau submission_date missing
      }),
    } as unknown as Request;

    const response = await POST(badRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Missing required fields" });
  });

  it("should return 500 if database error occurs", async () => {
    MockedPrisma.prototype.receipt = {
      create: jest.fn().mockRejectedValue(new Error("DB failure")),
    } as any;

    const request = {
      json: jest.fn().mockResolvedValue({
        tax_type: "Property Tax",
        tax_amount: 12000,
        submission_date: "2025-05-19",
      }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Server error. Please try again." });
  });
});
