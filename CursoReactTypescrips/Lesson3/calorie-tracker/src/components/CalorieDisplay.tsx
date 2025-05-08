type CalorieDisplayProps = {
  calories: number;
  text: string;
};

export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
  return (
    <div className="text-center bg-white p-5 rounded-lg shadow w-40">
      {/* Calorías en grande */}
      <p className="font-black text-5xl text-lime-600">{calories}</p>
      {/* Texto descriptivo debajo */}
      <p className="text-slate-700 uppercase font-bold mt-2">{text}</p>
    </div>
  );
}
