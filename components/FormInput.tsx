// components/FormInput.tsx
"use client";

import React from "react";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

export default function FormInput({
  label,
  name,
  type = "text",
  required = false,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );
}
