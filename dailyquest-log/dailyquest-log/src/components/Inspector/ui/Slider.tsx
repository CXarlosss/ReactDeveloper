"use client";

interface Props {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
}

export default function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: Props) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="
        w-full h-2
        rounded-lg appearance-none cursor-pointer
        bg-neutral-200
        accent-neutral-800
        transition
      "
    />
  );
}
