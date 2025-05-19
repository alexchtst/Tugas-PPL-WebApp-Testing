import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { ref_num: string } }
) {
  try {
    const { ref_num } = params;

    if (!ref_num) {
      return NextResponse.json(
        { error: "Receipt reference number is required" },
        { status: 400 }
      );
    }

    const receipt = await prisma.receipt.findUnique({
      where: {
        ref_num: ref_num,
      },
    });

    if (!receipt) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }

    return NextResponse.json(receipt, { status: 200 });
  } catch (error) {
    console.error("Error fetching receipt:", error);
    return NextResponse.json(
      { error: "Failed to fetch receipt data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
