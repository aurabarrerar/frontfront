"use client";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center font-sans text-[15px] text-[#16469B]">
      <input
        type="checkbox"
        className="mr-2"
        style={{ accentColor: "#16469B" }}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
