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
    <div className={`${formStyle.formSection}`}>
      <div className={formStyle.formSectionTitle}>
        <NumberCircle number={1} />
        <div style={{ flex: 1 }}>בחרו את תאריכי שירות המילואים</div>
      </div>
      <div className={style.dateRangesWrapper}>
        {fields.map((_, index) => (
          <Fragment key={index}>
            <div
              className={style.dateRange}
              style={{
                borderBottom: fields.length > 1 ? '1.5px dotted #ccc' : 'none',
                paddingBottom: fields.length > 1 ? '24px' : '0',
              }}
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
                className={style.removeDateRangeWrapper}
                onClick={() => onRemoveDateRange(index)}
              >
                <div className={style.removeDateRange}>-</div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className={style.addDateRange} onClick={onAddDateRange}>
        <img className={style.plusSvg} src="/svg/plus.svg" alt="הוסף תאריך" />
        <div className={style.addDateRangeText}>להוספת טווח תאריכים נוסף</div>
      </div>
    </div>
  )
}

export default FormDateSection
