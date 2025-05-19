import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { ref: string } }
) {
  try {
    const receipt = await prisma.receipt.findUnique({
      where: {
        ref_num: params.ref,
      },
    });

    if (!receipt) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }

    return NextResponse.json(receipt);
  } catch (error) {
    console.error("[GET_RECEIPT]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
