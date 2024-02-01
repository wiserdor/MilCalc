import React from 'react'
import style from './style/FormInput.module.css'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { FormValues } from '../../store/types'

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  register: UseFormRegister<FormValues>
  registerOptions?: RegisterOptions<FormValues, keyof FormValues>
  name: string

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = (props: FormInputProps) => {
  const { label, register, name, registerOptions = {}, ...inputProps } = props
  const id = `formInput-${name}`
  return (
    <div className={style.inputLabel}>
      {label && (
        <label htmlFor={id} className={style.label}>
          {label}
        </label>
      )}
      <input
        dir="rtl"
        className={style.input}
        id={id}
        {...inputProps}
        {...register(name as any, registerOptions)}
      />
    </div>
  )
}

export default FormInput
