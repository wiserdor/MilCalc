import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../store/types";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: UseFormRegister<FormValues>;
  registerOptions?: RegisterOptions<FormValues, keyof FormValues>;
  name: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: FormInputProps) => {
  const { label, register, name, registerOptions = {}, ...inputProps } = props;
  const id = `formInput-${name}`;
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-1 mt-2 block font-normal">
          {label}
        </label>
      )}
      <input
        dir="rtl"
        className="box-border rounded-md border border-solid border-bright-gray p-2 text-sm font-light text-dark-gray outline-none focus:border focus:border-solid focus:border-bright-gray focus:outline-none"
        id={id}
        {...inputProps}
        {...register(name as any, registerOptions)}
      />
    </div>
  );
};

export default FormInput;
