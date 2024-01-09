import useStore from '../../store/store'
import NumberCircle from '../NumberCircle/NumberCircle'
import formStyle from './style/Form.module.css'
import style from './style/FormDateSection.module.css'
import FormInput from './FormInput'

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
      {dateRanges.map((dateRange, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            gridTemplateColumns: '45% 45% 10%',
            columnGap: '0.5rem',
          }}
        >
          <FormInput
            type="date"
            label="תאריך גיוס:"
            name={`startDate-${index}}`}
            value={dateRange.startDate}
            min="2023-10-07"
            onChange={(e) => handleInputChange(e, index)}
            onFocus={(e) => e.target.showPicker()}
            style={{ cursor: 'pointer' }}
          />
          <FormInput
            type="date"
            label="תאריך שחרור:"
            name={`endDate-${index}}`}
            value={dateRange.endDate}
            min="2023-10-07"
            onChange={(e) => handleInputChange(e, index)}
            onFocus={(e) => e.target.showPicker()}
            style={{ cursor: 'pointer' }}
          />
          <div
            className={style.removeDateRange}
            onClick={() => onRemoveDateRange(index)}
          >
            X
          </div>
        </div>
      ))}
      <div className={style.addDateRange} onClick={onAddDateRange}>
        <img className={style.plusSvg} src="/svg/plus.svg" alt="הוסף תאריך" />
        <div className={style.addDateRangeText}>להוספת טווח תאריכים נוסף</div>
      </div>
    </div>
  )
}

export default FormDateSection
