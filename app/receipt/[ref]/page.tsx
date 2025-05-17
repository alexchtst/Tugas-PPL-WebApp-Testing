import { use } from 'react';
import { Receipt } from "lucide-react";
import ReceiptTable from "../../components/ReceiptTable";

interface PageProps {
  params: {
    ref: string;
  };
}

export default async function Recipt({ params }: PageProps) {
  const { ref } = await params;

  return (
    <div className='flex justify-center h-screen items-center'>
      {/* card */}
      <div className="p-6 bg-white rounded-xl shadow-none text-center w-[70vw] sm:w-[60vw] xl:w-[32vw]">
        <div className="flex justify-center mb-2">
          <Receipt size={48} color="blue" />
        </div>

        <h2 className="text-xl font-bold mb-1 text-indigo-700">Submission Receipt</h2>
        <p className="text-sm font-semibold text-gray-500 mb-6">
          Your submission was successful!
        </p>

        <ReceiptTable
          ref_num="TAX2025-001"
          tax_type="Business Income Tax"
          tax_ammount={2400}
          submission_date="May 17, 2025"
        />

        <p className="text-xs text-gray-400 mt-6">
          Your information is securely encrypted 🔒
        </p>
      </div>
      {/* card */}
    </div>
  );
}
