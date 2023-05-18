import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { v4 as uuid } from 'uuid';
// import { UseFormRegister, FieldValues } from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  type: string;
  name: string;
  label: string;
  labelId?: string;
  register: any; // UseFormRegister<FieldValues> creates conflicting type inferrance when used
  required?: boolean;
  errors: unknown
  placeholder?: string;
  validationSchema?: any;
}

// TODO: If Input type is password: then enable ability to show the password (eye icon)
const FormInput = ({
  type,
  name,
  label,
  labelId = undefined,
  register,
  required = false,
  validationSchema,
  placeholder,
  errors,
  ...props
}: FormInputProps) => {
  const formLabel = labelId || uuid();

  return (
    <div className="relative">
      <label
        htmlFor={formLabel}
        className="block text-sm font-bold">
        {label}:
        {required && '*'}
      </label>
      <input
        id={formLabel}
        name={name}
        {...register(name, validationSchema)}
        {...props}
        type={type}
        aria-invalid={errors[label] ? 'true' : 'false'}
        aria-describedby={`err-${formLabel}`}
        placeholder={placeholder || ''}
        className="mt-1 w-full rounded-sm border-2 border-current sm:text-sm"
      />
      {errors && errors[name] && (
        <p
          id={`err-${formLabel}`}
          aria-live="polite"
          className="text-secondary absolute bottom">
          {errors[name]?.message}
        </p>
      )}
    </div>
  )
}

export default FormInput