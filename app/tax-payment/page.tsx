'use client'

import { ClipboardList, Search } from "lucide-react";
import CustomInput from '@/app/components/CustomInput';
import CustomButton from "../components/CustomButton";
import { redirect } from 'next/navigation';
import { useState } from "react";


export default function TaxPayment() {
  const [search, setSearch] = useState('');

  return (
    <div className='flex flex-col justify-between h-screen items-center'>
      {/* navigation */}
      <div className='p-5 flex items-center justify-between w-full'>
        <div className='flex items-center space-x-2'>
          <Search color='blue' size={30} />
          <p className='font-bold text-blue-600 text-xl'>Reference Lookup</p>
        </div>
        <button type="button" className='text-gray-300 cursor-pointer' onClick={() => redirect('/submission')}>Home</button>
      </div>
      {/* navigation */}

      {/* card */}
      <div className="p-6 bg-white rounded-xl shadow-none text-center w-[90vw] sm:w-[70vw] xl:w-[40vw]">
        <div className="flex justify-center mb-2">
          <ClipboardList color='blue' size={60} />
        </div>

        <h2 className="text-xl font-bold mb-1 text-indigo-700">Find Your Submission</h2>
        <p className="text-sm font-semibold text-gray-500 mb-6">
          Enter your reference number to view your submission details.
        </p>
        <div className="flex items-center space-x-1 w-full">
          <div className="w-full sm:w-3/4">
            <CustomInput
              label="Reference Number"
              input_type="text"
              place_holder="e.g., REF123456"
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="w-1/4">
            <CustomButton className="bg-indigo-800 hover:bg-indigo-600 text-[2.5vw] md:text-[1vw]" href={`/receipt/${search}`}>
              <Search color="white" size={18} className="hidden md:flex" />
              <p className="font-bold text-white">Search</p>
            </CustomButton>
          </div>
        </div>
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
