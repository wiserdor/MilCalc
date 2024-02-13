import React from 'react'
import style from './style/FormCheckbox.module.css'

export interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormCheckbox = (props: FormCheckboxProps) => {
  const { onChange, label, ...inputProps } = props
  const inputId = `formCheckbox-${inputProps.name}`
  return (
    <div className={`${style.container} items-center flex gap-2`}>
      <input
        id={inputId}
        type="checkbox"
        className={`${style.checkbox} cursor-pointer h-6 w-6`}
        onChange={onChange}
        {...inputProps}
      />
      <label htmlFor={inputId} className={`${style.label} cursor-pointer font-normal ml-2 w-full`}>
        {label}
      </label>
    </div>
  );
}

export default FormCheckbox
