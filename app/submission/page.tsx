"use client";

import { useState } from "react";
import TaxTypeDropdown from "@/app/components/TaxTypeDropdown";
import { CircleDollarSign, CircleUser, ReceiptText } from "lucide-react";
import CustomInput from "@/app/components/CustomInput";
import CustomButton from "@/app/components/CustomButton";

export default function Submission() {
  const [taxAmount, setTaxAmount] = useState("");
  const [taxType, setTaxType] = useState(""); // Tambahkan state untuk taxType
  const [amountError, setAmountError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Tambahkan state untuk loading

  const handleSubmit = async () => {
    console.log("Submitting with:", { taxType, taxAmount }); // Debug log

    const parsedAmount = parseInt(taxAmount); // Ubah dari parseFloat ke parseInt

    if (isNaN(parsedAmount) || parsedAmount < 0) {
      setAmountError("Tax amount must be a positive number.");
      return;
    }

    if (!taxType) {
      // Tambahkan validasi untuk taxType
      alert("Please select a tax type");
      return;
    }

    setAmountError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tax_type: taxType,
          tax_amount: parsedAmount,
          submission_date: new Date().toISOString().split("T")[0],
        }),
      });

      const data = await response.json();
      console.log("Response:", data); // Debug log
      // Di app/submission/page.tsx (bagian handleSubmit)
      // Di app/submission/page.tsx (bagian handleSubmit)
      // Di app/submission/page.tsx (bagian handleSubmit)
      if (response.ok) {
        // Encode ref_num sebelum redirect
        const encodedRef = encodeURIComponent(data.ref_num);
        window.location.href = `/receipt/${encodedRef}`;
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col justify-between h-screen items-center">
      {/* navigation */}
      <div className="p-5 flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <CircleDollarSign color="blue" size={30} />
          <p className="font-bold text-blue-600 text-xl">TaxEasePortal</p>
        </div>
        <CircleUser color="blue" size={30} />
      </div>
      {/* navigation */}

      {/* card */}
      <div className="p-6 bg-white rounded-xl shadow-none text-center w-[70vw] sm:w-[60vw] xl:w-[32vw]">
        <div className="flex justify-center mb-2">
          <ReceiptText color="blue" size={60} />
        </div>
        <h2 className="text-xl font-bold mb-1 text-indigo-700">
          Submit Tax Payment
        </h2>
        <p className="text-sm font-semibold text-gray-500 mb-6">
          Quickly and securely pay your taxes online.
        </p>
        <TaxTypeDropdown onChange={(value) => setTaxType(value)} />{" "}
        {/* Asumsi TaxTypeDropdown punya onChange */}
        <CustomInput
          label="Tax Amount"
          input_type="number"
          place_holder="Enter Amount (e.g 12000)"
          value={taxAmount}
          onChange={(e) => setTaxAmount(e.target.value)}
          errorMessage={amountError}
        />
        <CustomButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Payment"}
        </CustomButton>
        <p className="text-xs text-gray-400 mt-6">
          Your information is securely encrypted 🔒
        </p>
      </div>
      {/* card */}

      {/* footer */}
      <div className="bg-white p-2 flex justify-center items-center w-full">
        <p className="font-extralight text-gray-400">
          2024 TaxEasePortal. All rights reserved
        </p>
      </div>
      {/* footer */}
    </div>
  );
}
