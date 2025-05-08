import type { Dispatch, SetStateAction } from "react";

type DateSelectorProps = {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
};

export default function DateSelector({ selectedDate, setSelectedDate }: DateSelectorProps) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <label htmlFor="date" className="font-bold text-white">Selecciona una fecha:</label>
      <input
        id="date"
        type="date"
        className="p-2 rounded border"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  );
}
