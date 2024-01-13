import useStore from '../../store/store'
import NumberCircle from '../NumberCircle/NumberCircle'
import formStyle from './style/Form.module.css'
import style from './style/FormDateSection.module.css'
import FormInput from './FormInput'
import { Fragment } from 'react'

const FormDateSection = () => {
  const { dateRanges } = useStore()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target
    const newDateRanges = [...dateRanges]
    newDateRanges[index] = {
      ...newDateRanges[index],
      [name]: value,
    }
    useStore.setState({ dateRanges: newDateRanges })
  }

  const onAddDateRange = () => {
    const newDateRanges = [...dateRanges]
    newDateRanges.push({
      startDate: '2023-10-07',
      endDate: new Date().toISOString().split('T')[0],
    })
    useStore.setState({ dateRanges: newDateRanges })
  }

  const onRemoveDateRange = (index: number) => {
    if (dateRanges.length === 1) return
    const newDateRanges = [...dateRanges]
    newDateRanges.splice(index, 1)
    useStore.setState({ dateRanges: newDateRanges })
  }

  return (
    <div className={`${formStyle.formSection}`}>
      <div className={formStyle.formSectionTitle}>
        <NumberCircle number={1} />
        <div style={{ flex: 1 }}>בחרו את תאריכי שירות המילואים</div>
      </div>
      <div className={style.dateRangesWrapper}>
        {dateRanges.map((dateRange, index) => (
          <Fragment key={index}>
            <div className={style.dateRange}>
              <FormInput
                type="date"
                label="תאריך גיוס:"
                name="startDate"
                value={dateRange.startDate}
                min="2023-10-07"
                onChange={(e) => handleInputChange(e, index)}
                onFocus={(e) => e.target.showPicker()}
                style={{ cursor: 'pointer' }}
              />
              <FormInput
                type="date"
                label="תאריך שחרור:"
                name="endDate"
                value={dateRange.endDate}
                min="2023-10-07"
                onChange={(e) => handleInputChange(e, index)}
                onFocus={(e) => e.target.showPicker()}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div
              className={style.removeDateRangeWrapper}
              onClick={() => onRemoveDateRange(index)}
            >
              <div
                className={style.removeDateRange}
                style={{ display: dateRanges.length === 1 ? 'none' : 'block' }}
              >
                -
              </div>
            </div>
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
