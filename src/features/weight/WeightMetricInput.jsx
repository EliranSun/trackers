export const MetricInput = ({ value, onChange, label }) => {
  return (
    <div className="flex flex-col bg-gray-600 rounded-lg items-center relative">
      <input
        value={value}
        type="number"
        className="bg-transparent text-8xl w-full text-center"
        onChange={event => onChange(Number(event.target.value))}
      />
      <label className="text-xl">{label}</label>
    </div>
  );
};