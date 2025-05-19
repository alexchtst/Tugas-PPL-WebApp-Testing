interface TaxTypeDropdownProps {
  onChange: (value: string) => void;
}

export default function TaxTypeDropdown({ onChange }: TaxTypeDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold font-medium text-gray-700 mb-1 text-left">
        Tax Type
      </label>
      <select
        className="w-full border rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          Select tax type
        </option>
        <option value="Income Tax">Income Tax</option>
        <option value="Vehicle Tax">Vehicle Tax</option>
        <option value="Property Tax">Property Tax</option>
        <option value="Business Tax">Business Tax</option>
      </select>
    </div>
  );
}
