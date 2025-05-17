export default function TaxTypeDropdown() {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold font-medium text-gray-700 mb-1 text-left">
        Tax Type
      </label>
      <select
        className="w-full border rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled hidden>
          Select tax type
        </option>
        <option>Income Tax</option>
        <option>Vehicle Tax</option>
        <option>Property Tax</option>
        <option>Business Tax</option>
      </select>
    </div>
  );
}
