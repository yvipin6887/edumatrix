// components/form/Input.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { ChangeEvent } from "react";
import { getError } from "@/utility/getError";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;             // for non-RHF mode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // for non-RHF mode
  className?: string;
  validation?: object; 
}

export default function Input({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  validation={}
}: InputProps) {
  const form = useFormContext();  // will be undefined if RHF not used

  const hasRHF = !!form; // check if inside FormProvider
    console.log('form.formState.errors')
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      {hasRHF ? (
        // React Hook Form Mode
        <input
          {...form.register(name, validation)}
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className} ${
                form.formState.errors[name] ? 'border-red-500' : 'border-gray-300'
                }`}
        />
      ) : (
        // Normal input mode (no RHF)
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`border p-2 rounded w-full ${className}`}
        />
      )}

      {/* Show validation error only if RHF is used */}
      {hasRHF && getError(form.formState.errors, name) && (
        <p className="text-red-500 text-sm mt-1">
          {getError(form.formState.errors, name)}
        </p>
      )}
    </div>
  );
}
