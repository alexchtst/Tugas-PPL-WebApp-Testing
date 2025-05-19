import CustomButton from "@/app/components/CustomButton";
import { Receipt } from "lucide-react";
import { format } from "date-fns";

interface ReceiptData {
  ref_num: string;
  tax_type: string;
  tax_amount: number;
  submission_date: string;
}

export default async function ReceiptPage({ params }: { params: { ref: string } }) {
  try {
    const { ref } = await params;
    const res = await fetch(`http://localhost:3000/api/receipt/${ref}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
          <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Receipt
            </h2>
            <p className="text-gray-600 mb-6">
              Failed to load receipt data. Please try again later.
            </p>
            <CustomButton href="/submission" className="w-full">
              ← Back to New Submission
            </CustomButton>
          </div>
        </div>
      );
    }

    const receipt: ReceiptData = await res.json();

    const formattedDate = format(
      new Date(receipt.submission_date),
      "MMMM d, yyyy"
    );

    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-4">
              <Receipt size={50} className="text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Submission Receipt
          </h2>
          <p className="text-gray-500 mb-8">Your submission was successful!</p>

          <div className="text-left mb-8 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Reference Number</span>
              <span className="text-blue-900 font-semibold">
                {receipt.ref_num}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax Type</span>
              <span className="text-blue-700 font-semibold">
                {receipt.tax_type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax Amount</span>
              <span className="text-green-600 font-semibold">
                ${receipt.tax_amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Submission Date</span>
              <span className="text-blue-600 font-semibold">
                {formattedDate}
              </span>
            </div>
          </div>

          <CustomButton href="/submission" className="w-full">
            ← Back to New Submission
          </CustomButton>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Receipt error:", error);

  }
}
