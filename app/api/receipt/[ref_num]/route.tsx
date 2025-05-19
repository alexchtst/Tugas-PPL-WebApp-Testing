import prisma from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { ref_num: string } }
) {
  try {
    const { ref_num } = params;

    // Cari data receipt berdasarkan ref_num
    const receipt = await prisma.receipt.findUnique({
      where: { ref_num },
    });

    // Jika receipt tidak ditemukan
    if (!receipt) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }

    // Jika receipt ditemukan
    return NextResponse.json(receipt, { status: 200 });
  } catch (error) {
    console.error("Error fetching receipt:", error);
    return NextResponse.json(
      { error: "Failed to fetch receipt" },
      { status: 500 }
    );
  }
}
