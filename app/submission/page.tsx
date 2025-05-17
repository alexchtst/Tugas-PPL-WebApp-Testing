import TaxTypeDropdown from '@/app/components/TaxTypeDropdown';
import AmountInput from '@/app/components/AmountInput';
import SubmitButton from '@/app/components/SubmitButton';
import Image from 'next/image';

export default function Submission() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-none text-center">
      <div className="flex justify-center mb-2">
        <Image
          src="/receipt.jpeg"
          alt="Receipt Icon"
          width={40}
          height={40}
        />
      </div>

      <h2 className="text-xl font-bold mb-1 text-indigo-700">Submit Tax Payment</h2>
      <p className="text-sm font-semibold text-gray-500 mb-6">
        Quickly and securely pay your taxes online.
      </p>

      <TaxTypeDropdown />
      <AmountInput />
      <SubmitButton />

      <p className="text-xs text-gray-400 mt-6">
        Your information is securely encrypted 🔒
      </p>
    </div>
  );
}
