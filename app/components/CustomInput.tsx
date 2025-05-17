import { twMerge } from 'tailwind-merge';

interface CustomInputInterface {
  label: string;
  input_type: string;
  place_holder: string;
  className?: string; // optional external class
}

export default function CustomInput({ label, input_type, place_holder, className }: CustomInputInterface) {
  const inputClass = twMerge(
    "w-full border rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none",
    className
  );

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium font-semibold text-left text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={input_type}
        className={inputClass}
        placeholder={place_holder}
      />
    </div>
  );
}
