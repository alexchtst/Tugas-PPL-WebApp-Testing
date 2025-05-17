import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateRefNum } from '@/app/utils/generateRefNum';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { tax_type, tax_ammount, submission_date } = body;

  if (!tax_type || tax_ammount == null || !submission_date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const ref_num = generateRefNum();

  try {
    const receipt = await prisma.receipt.create({
      data: {
        ref_num,
        tax_type,
        tax_ammount,
        submission_date,
      },
    });

    return NextResponse.json(receipt, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Database error or duplicate ref_num' }, { status: 500 });
  }
}