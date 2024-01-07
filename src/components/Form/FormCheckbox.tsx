import React from 'react'
import style from './FormCheckbox.module.css'

export interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormCheckbox = (props: FormCheckboxProps) => {
  const { onChange, label, ...inputProps } = props
  const inputId = `formCheckbox-${inputProps.name}`
  return (
    <div className={style.container}>
      <input
        id={inputId}
        type="checkbox"
        className={style.checkbox}
        onChange={onChange}
        {...inputProps}
      />
      <label htmlFor={inputId} className={style.label}>
        {label}
      </label>
    </div>
  )
}

export default FormCheckbox
