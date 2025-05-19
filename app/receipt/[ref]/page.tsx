import Image from "next/image";
import CustomButton from "@/app/components/CustomButton";
import { Receipt } from "lucide-react";

export default function ReceiptPage({
  refNum = "TAX2025-001",
  taxType = "Business Income Tax",
  taxAmount = 2400.0,
  submissionDate = "May 17, 2025",
}) {
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
        <div className="text-left mb-8">
          <p className="text-gray-600 mb-2">
            Reference Number{" "}
            <span className="text-blue-900 font-semibold float-right">
              {refNum}
            </span>
          </p>
          <p className="text-gray-600 mb-2">
            Tax Type{" "}
            <span className="text-blue-700 font-semibold float-right">
              {taxType}
            </span>
          </p>
          <p className="text-gray-600 mb-2">
            Tax Amount{" "}
            <span className="text-green-600 font-semibold float-right">
              ${taxAmount.toFixed(2)}
            </span>
          </p>
          <p className="text-gray-600">
            Submission Date{" "}
            <span className="text-blue-600 font-semibold float-right">
              {submissionDate}
            </span>
          </p>
        </div>
        <CustomButton href="/submission" className="w-full">
          ← Back to New Submission
        </CustomButton>
      </div>
    </div>
  );
}
