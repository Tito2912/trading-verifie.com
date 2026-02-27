'use client';

import type { ChangeEvent } from 'react';

export type LanguageOption = {
  value: string;
  label: string;
};

export function LanguageSelect({ ariaLabel, options, value }: { ariaLabel: string; options: LanguageOption[]; value: string }) {
  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    window.location.assign(e.target.value);
  }

  return (
    <select aria-label={ariaLabel} className="lang-select" onChange={onChange} value={value}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

