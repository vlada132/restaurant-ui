import React, { HTMLInputTypeAttribute } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps extends RegisterOptions<FieldValues> {
  label: string;
  name: Path<FieldValues>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<FieldValues>;
  classInput?: string;
  classLabel?: string;
  errors: any;
  pattern?: any;
  defaultValue?: any;
}

export default function InputText(props: InputProps) {
  const {
    register,
    label,
    name,
    required,
    errors,
    type = 'text',
    classInput = 'w-full border border-[#E8E8E8] px-4 py-4',
    classLabel = 'block mb-2 text-gray-700',
    placeholder,
    ...restProps
  } = props;
  return (
    <>
      {label && (
        <label className={classLabel}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        {...register(name, { required, ...restProps })}
        type={type}
        className={classInput}
        placeholder={placeholder}
      />
      {errors?.[name] && (
        <span className="text-red-600">{errors?.[name]?.message}</span>
      )}
    </>
  );
}
