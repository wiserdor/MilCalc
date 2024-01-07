import useStore from '../../store'
import NumberCircle from '../NumberCircle/NumberCircle'
import style from './Form.module.css'
import FormCheckbox from './FormCheckbox'
import FormInput from './FormInput'
import ValidationSection from './ValidationSection'

const Form = () => {
  const {
    setFormState,
    updateCalculatorResults,
    startDate,
    endDate,
    serviceBefore,
    isCombat,
    isStudent,
    didOperation24,
    hasChildren,
    hasChildrenSpecial,
    validateAndSetErrors,
  } = useStore()

  // Results ref

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(
      e.target.name,
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateAndSetErrors() // Validate form and update errors in store
    updateCalculatorResults() // Calculate and update results in store
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={`${style.formSection}`}>
        <div className={style.formSectionTitle}>
          <NumberCircle number={1} />
          <div style={{ flex: 1 }}>בחרו את תאריכי שירות המילואים</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          <FormInput
            type="date"
            label="תאריך גיוס:"
            name="startDate"
            value={startDate}
            min="2023-10-07"
            onChange={handleInputChange}
          />
          <FormInput
            type="date"
            label="תאריך שחרור:"
            name="endDate"
            value={endDate}
            min="2023-10-07"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={style.formSection}>
        <div className={style.formSectionTitle}>
          <NumberCircle number={2} />
          <div style={{ flex: 1 }}>
            כמות ימי המילואים שביצעת בשנת 2023 (לפני ה- 7/10):
          </div>
        </div>
        <FormInput
          type="number"
          name="serviceBefore"
          value={serviceBefore}
          min={0}
          onChange={handleInputChange}
        />
      </div>
      <div className={style.formSection}>
        <div className={style.formSectionTitle}>
          <NumberCircle number={3} />
          <div style={{ flex: 1 }}>סמנו אחת או יותר מהאפשרויות הבאות:</div>
        </div>
        <FormCheckbox
          label="אני לוחם/ת"
          name="isCombat"
          checked={isCombat}
          onChange={handleInputChange}
        />
        <FormCheckbox
          label="אני סטודנט/ית"
          name="isStudent"
          checked={isStudent}
          onChange={handleInputChange}
        />
        <FormCheckbox
          label="ביצעתי תעסוקה מבצעית בשנת 2024"
          name="didOperation24"
          checked={didOperation24}
          onChange={handleInputChange}
        />
        <FormCheckbox
          label="יש לי ילד/ים עד גיל 14"
          name="hasChildren"
          checked={hasChildren}
          onChange={handleInputChange}
        />
        <FormCheckbox
          label="יש לי ילד/ים עם צרכים מיוחדים"
          name="hasChildrenSpecial"
          checked={hasChildrenSpecial}
          onChange={handleInputChange}
        />
      </div>

      <div className={style.submitButtonWrapper}>
        <button className={style.submitButton}>לחצו כאן לחישוב המענקים</button>
      </div>
      <ValidationSection />
    </form>
  )
}

export default Form