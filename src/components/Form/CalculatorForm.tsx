import { useEffect } from 'react'
import useStore from '../../store/store'
import NumberCircle from '../NumberCircle/NumberCircle'
import Toggle from '../Toggle/Toggle'
import FormDateSection from './FormDateSection'
import FormInput from './FormInput'
import ValidationSection from './ValidationSection'
import style from './style/Form.module.css'

const CalculatorForm = () => {
  const setFormState = useStore((state) => state.setFormState)
  const loadStateFromUrl = useStore((state) => state.loadStateFromUrl)
  const updateCalculatorResults = useStore(
    (state) => state.updateCalculatorResults
  )
  const serviceBefore = useStore((state) => state.serviceBefore)
  const isCombat = useStore((state) => state.isCombat)
  const isStudent = useStore((state) => state.isStudent)
  const isOld = useStore((state) => state.isOld)
  const isIndependent = useStore((state) => state.isIndependent)
  const hasChildren = useStore((state) => state.hasChildren)
  const hasChildrenSpecial = useStore((state) => state.hasChildrenSpecial)
  const validateAndSetErrors = useStore((state) => state.validateAndSetErrors)

  useEffect(() => {
    loadStateFromUrl()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(e.target.name, e.target.value)
  }

  const handleToggleChange = (name: string, active: boolean) => {
    setFormState(name, active)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateAndSetErrors() // Validate form and update errors in store
    updateCalculatorResults() // Calculate and update results in store
  }

  return (
    <div className={style.form}>
      <div className={style.arrowSvgWrapper}>
        <img
          className={style.arrowSvg}
          src="/svg/square-arrow.svg"
          alt="arrow"
        />
      </div>
      <div className={style.formHeader}>
        <div className={style.descriptionBold}>
          רוצים לדעת כמה מגיע לכם/ן? בדקו עכשיו
        </div>
        <div className={style.descriptionFill}>אנא מלאו את הפרטים הבאים:</div>
      </div>

      <form className={style.formForm} onSubmit={handleSubmit}>
        <FormDateSection />
        <div className={style.formSection}>
          <div className={style.formSectionTitle}>
            <NumberCircle number={2} />
            <div style={{ flex: 1 }}>
              מספר ימי המילואים שביצעת בשנת 2023 (לפני ה- 7/10):
            </div>
          </div>
          <FormInput
            type="number"
            name="serviceBefore"
            value={serviceBefore}
            min={0}
            step={0.5}
            onChange={(e) => {
              handleInputChange(e)
              if (parseFloat(e.target.value) < 5) {
                setFormState('isDaysStraight', false)
              }
            }}
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
            <div style={{ flex: 1 }}>בחרו בקטגוריות הרלוונטיות לגביכם/ן:</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              rowGap: 20,
            }}
          >
            <Toggle
              label="במערך הלוחם"
              name="isCombat"
              active={isCombat}
              onChange={handleToggleChange}
            />
            <Toggle
              label="ילדים עד גיל 14"
              name="hasChildren"
              active={hasChildren}
              onChange={handleToggleChange}
            />
            <Toggle
              label="ילדים עם צרכים מיוחדים"
              name="hasChildrenSpecial"
              active={hasChildrenSpecial}
              onChange={handleToggleChange}
            />
            <Toggle
              label="מוחרג/ת גיל"
              name="isOld"
              active={isOld}
              onChange={handleToggleChange}
            />
            <Toggle
              label="עצמאי/ת"
              name="isIndependent"
              active={isIndependent}
              onChange={handleToggleChange}
            />
            <Toggle
              label="סטודנט/ית"
              name="isStudent"
              active={isStudent}
              onChange={handleToggleChange}
            />
          </div>
        </div>

        <div className={style.submitButtonWrapper}>
          <button className={style.submitButton}>לחישוב המענקים</button>
        </div>
        <ValidationSection />
      </form>
    </div>
  )
}

export default CalculatorForm
