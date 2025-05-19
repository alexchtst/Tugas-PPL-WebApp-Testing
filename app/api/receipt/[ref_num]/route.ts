// app/api/receipt/[ref_num]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const ref_num = url.pathname.split("/").pop() || "";
    const cleanRef = decodeURIComponent(ref_num).trim();
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
