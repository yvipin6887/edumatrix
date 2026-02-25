"use client";

import { useFormContext } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';

interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    name: string;
    label?: string,
    options: Option[],
    isMulti?: boolean;
    placeholder?: string;
    defaultValue?: any;
    className?: string;
    onChange?: (value: any) => void;
}

export default function SelectField({
    name,
    label,
    options,
    isMulti = false,
    placeholder = "Select...",
    className,
    defaultValue,
    onChange,
}: SelectProps) {
    const form = useFormContext();
    const hasRHF = !!form;

    const handleChange = (value: MultiValue<Option> | Option | null) => {
        if (hasRHF) {
        form.setValue(name, value); // use RHF setter
        }
        onChange?.(value); // fallback for non-RHF
    };

    return (
        <div className='mb-4'>
            {label && <label className='block font-medium mb-1' >{label}</label>}

            <Select 
                name={name}
                options={options}
                isMulti={isMulti}
                defaultValue={defaultValue}
                onChange={handleChange}
                placeholder={placeholder}
                className={className}
            />

            
            {hasRHF && form.formState.errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                {(form.formState.errors[name] as any)?.message || "Invalid selection"}
                </p>
            )}
        </div>
    )
}