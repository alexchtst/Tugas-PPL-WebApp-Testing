import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { generateRefNum } from "@/app/utils/generateRefNum";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tax_type, tax_amount, submission_date } = body;

    if (!tax_type || tax_amount == null || !submission_date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const ref_num = generateRefNum();
    console.log("Generated Ref Num:", ref_num);

    const submission = await prisma.receipt.create({
      data: {
        ref_num,
        tax_type,
        tax_amount,
        submission_date,
      },
    });

    console.log("Created Receipt:", submission);
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("[API_SUBMISSION_POST]", error);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
