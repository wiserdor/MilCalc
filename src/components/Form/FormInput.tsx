import React from 'react'
import style from './style/FormInput.module.css'

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = (props: FormInputProps) => {
  const { onChange, label, ...inputProps } = props
  return (
    <div className={style.inputLabel}>
      {label && (
        <label htmlFor="serviceDate" className={style.label}>
          {label}
        </label>
      )}
      <input
        dir="rtl"
        className={style.input}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  )
}

export default FormInput
