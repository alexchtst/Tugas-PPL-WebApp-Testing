export default function AmountInput() {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium font-semibold text-left text-gray-700 mb-1">
        Tax Amount
      </label>
      <input
        type="number"
        className="w-full border rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none"
        placeholder="Enter amount (e.g. 1200.00)"
      />
    </div>
  );
}
