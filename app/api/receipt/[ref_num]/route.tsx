// app/api/receipt/[ref_num]/route.tsx
import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { ref_num: string } }
) {
  try {
    const cleanRef = decodeURIComponent(params.ref_num).trim().toUpperCase();
    console.log("Searching for receipt:", cleanRef);

    const receipt = await prisma.receipt.findUnique({
      where: {
        ref_num: cleanRef,
      },
    });

    if (!receipt) {
      return NextResponse.json(
        { error: `Receipt with ref ${cleanRef} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(receipt);
  } catch (error: any) {
    console.error("[GET_RECEIPT_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
