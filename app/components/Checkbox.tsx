// app/components/Checkbox.tsx texto de recuerdame

import { useState } from 'react'

export default function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 mr-2 accent-blue-900"
      />
      <label className="text-stone-900 text-xl font-normal">{label}</label>
    </div>
  )
}