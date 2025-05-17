'use client'

interface SubmissionReceipt {
    ref_num: string;
    tax_type: string;
    tax_ammount: number;
    submission_date: string
}

import { MoveLeft } from "lucide-react";
import CustomButton from "./CustomButton";
import { redirect } from 'next/navigation';

export default function ReceiptTable({ ref_num, tax_type, tax_ammount, submission_date }: SubmissionReceipt) {
    return (
        <div className="mb-6 space-y-3">
            <div className="w-full flex justify-between">
                <p className="font-light text-gray-500">Reference Number</p>
                <p className="font-bold">{ref_num}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="font-light text-gray-500">Tax Type</p>
                <p className="text-indigo-800 font-semibold">{tax_type}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="font-light text-gray-500">Tax Amount</p>
                <p className="text-green-600 font-bold">Rp{' '}{tax_ammount.toFixed(2)}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="font-light text-gray-500">Submission Date</p>
                <p className="text-indigo-600">{submission_date}</p>
            </div>
            <CustomButton className="mt-9 bg-indigo-800 hover:bg-indigo-600" onClick={() => redirect('/submission')}>
                <MoveLeft color="white" />
                <p className="font-bold text-white">Back to New Submission</p>
            </CustomButton>
        </div>
    );
}
