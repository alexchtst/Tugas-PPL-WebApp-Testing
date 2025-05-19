import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { generateRefNum } from "@/app/utils/generateRefNum";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tax_type, tax_amount, submission_date } = body;

    // Validasi input wajib
    if (!tax_type || tax_amount == null || !submission_date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validasi nilai pajak harus positif
    if (typeof tax_amount !== "number" || tax_amount < 0) {
      return NextResponse.json(
        { error: "Tax amount must be a positive number" },
        { status: 400 }
      );
    }

    const ref_num = generateRefNum();

    const submission = await prisma.receipt.create({
      data: {
        ref_num,
        tax_type,
        tax_amount, // Perbaiki dari tax_ammount ke tax_amount
        submission_date,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("[API_SUBMISSION_POST]", error);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
