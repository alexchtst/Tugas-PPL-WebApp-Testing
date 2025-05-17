import TaxTypeDropdown from '@/app/components/TaxTypeDropdown';
import AmountInput from '@/app/components/AmountInput';
import SubmitButton from '@/app/components/SubmitButton';
import Image from 'next/image';

import { CircleDollarSign, CircleUser } from 'lucide-react';

export default function Submission() {
  return (
    <div className='flex flex-col justify-between h-screen items-center'>
      {/* navigation */}
      <div className='p-5 flex items-center justify-between w-full'>
        <div className='flex items-center space-x-2'>
          <CircleDollarSign color='blue' size={30} />
          <p className='font-bold text-blue-600 text-xl'>TaxEasePortal</p>
        </div>
        <CircleUser color='blue' size={30} />
      </div>
      {/* navigation */}

      {/* card */}
      <div className="p-6 bg-white rounded-xl shadow-none text-center w-[70vw] sm:w-[60vw] xl:w-[32vw]">
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
      {/* card */}

      {/* footer */}
      <div className='bg-white p-2 flex justify-center items-center w-full'>
        <p className='font-extralight text-gray-400'>
          2024 TaxEase Portal. All rights reserved
        </p>
      </div>
      {/* footer */}

    </div>
  );
}
