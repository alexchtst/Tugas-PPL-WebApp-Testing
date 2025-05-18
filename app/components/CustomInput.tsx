import { twMerge } from 'tailwind-merge';
import { ChangeEvent } from 'react';

interface CustomInputInterface {
  label: string;
  input_type: string;
  place_holder: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export default function CustomInput({
  label,
  input_type,
  place_holder,
  className,
  value,
  onChange,
  errorMessage,
}: CustomInputInterface) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  const inputClass = twMerge(
    "w-full border rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none",
    errorMessage ? "border-red-500" : "",
    className
  );

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium font-semibold text-left text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={input_type}
        className={inputClass}
        placeholder={place_holder}
        value={value}
        onChange={onChange}
      />
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
