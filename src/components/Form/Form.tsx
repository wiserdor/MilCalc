import useStore from '../../store/store'
import NumberCircle from '../NumberCircle/NumberCircle'
import style from './style/Form.module.css'
import FormCheckbox from './FormCheckbox'
import FormDateSection from './FormDateSection'
import FormInput from './FormInput'
import ValidationSection from './ValidationSection'

const Form = () => {
  const {
    setFormState,
    updateCalculatorResults,
    serviceBefore,
    isCombat,
    isStudent,
    operation24Days,
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
      <FormDateSection />
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
          step={0.5}
          onChange={handleInputChange}
          onInvalid={(e: any) => {
            if (parseFloat(e.target.value) % 0.5 !== 0) {
              e.target.setCustomValidity('המספר צריך להיות בקפיצות של 0.5')
            }
          }}
          onInput={(e: any) => e.target.setCustomValidity('')}
        />
      </div>
      <div className={style.formSection}>
        <div className={style.formSectionTitle}>
          <NumberCircle number={3} />
          <div style={{ flex: 1 }}>
            כמות ימי תעסוקה מבצעית שביצעת בשנת 2024:
          </div>
        </div>
        <FormInput
          type="number"
          name="operation24Days"
          value={operation24Days}
          min={0}
          max={365}
          step={0.5}
          onInvalid={(e: any) => {
            if (parseFloat(e.target.value) % 0.5 !== 0) {
              e.target.setCustomValidity('המספר צריך להיות בקפיצות של 0.5')
            }
          }}
          onInput={(e: any) => e.target.setCustomValidity('')}
          onChange={handleInputChange}
        />
      </div>
      <div className={style.formSection}>
        <div className={style.formSectionTitle}>
          <NumberCircle number={4} />
          <div style={{ flex: 1 }}>סמנו אחת או יותר מהאפשרויות הבאות:</div>
        </div>
        <FormCheckbox
          label="אני במערך הלוחם"
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
        <button className={style.submitButton}>לחישוב המענקים</button>
      </div>
      <ValidationSection />
    </form>
  )
}

export default Form
