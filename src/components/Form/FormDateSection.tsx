import { Fragment } from 'react'
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'
import { FormValues } from '../../store/types'
import NumberCircle from '../NumberCircle/NumberCircle'
import FormInput from './FormInput'
import formStyle from './style/Form.module.css'
import style from './style/FormDateSection.module.css'

interface FormDateSectionProps {
  control: Control<FormValues>
  register: UseFormRegister<FormValues>
}

const FormDateSection = (props: FormDateSectionProps) => {
  const { control, register } = props

  const { fields, append, remove } = useFieldArray({
    name: 'dateRanges',
    control,
  })

  // Modify onAddDateRange and onRemoveDateRange to use append and remove
  const onAddDateRange = () => {
    append({
      startDate: '2023-10-07',
      endDate: new Date().toISOString().split('T')[0],
    })
  }

  const onRemoveDateRange = (index: number) => {
    remove(index)
  }

  return (
    <div className="border-solid border-[1.5px] border-idf rounded-2xl px-4 pt-4 pb-6 bg-white flex flex-col">
      <div className="flex flex-row items-baseline gap-3 mb-4 text-base font-semibold">
        <NumberCircle number={1} />
        <div style={{ flex: 1 }}>בחרו את תאריכי שירות המילואים</div>
      </div>
      <div className="flex flex-col w-full gap-2">
        {fields.map((_, index) => (
          <Fragment key={index}>
            <div
              className={`${
                fields.length > 1
                  ? `border-dotted border-b-[#ccc] border-b-[1.5px]`
                  : ''
              } ${
                fields.length > 1 ? 'pb-6' : ''
              } grid-cols-2 gap-x-2 grid pb-6`}
            >
              <FormInput
                type="date"
                label="תאריך גיוס:"
                name={`dateRanges[${index}].startDate`}
                min="2023-10-07"
                onFocus={(e) => e.target.showPicker()}
                style={{ cursor: 'pointer' }}
                register={register}
              />
              <FormInput
                type="date"
                label="תאריך שחרור:"
                name={`dateRanges[${index}].endDate`}
                min="2023-10-07"
                onFocus={(e) => e.target.showPicker()}
                style={{ cursor: 'pointer' }}
                register={register}
              />
            </div>
            {fields.length > 1 && (
              <div
                className={`bottom-[9px] items-center flex justify-center relative w-full`}
                onClick={() => onRemoveDateRange(index)}
              >
                <div className="absolute flex items-center justify-center w-8 h-6 text-lg font-bold text-center cursor-pointer bg-stone rounded-2xl text-blue">
                  <div>-</div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div
        className={`${style.addDateRange} items-center cursor-pointer flex flex-col justify-center mt-6 w-full`}
        onClick={onAddDateRange}
      >
        <img className={style.plusSvg} src="/svg/plus.svg" alt="הוסף תאריך" />
        <div className={`${style.addDateRangeText} font-bold`}>
          להוספת טווח תאריכים נוסף
        </div>
      </div>
    </div>
  )
}

export default FormDateSection
