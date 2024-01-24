import useStore from '../../store/store'
import NumberCircle from '../NumberCircle/NumberCircle'
import useIsExperimental from '../common/hooks/useIsExperimental'
import FormCheckbox from './FormCheckbox'
import FormDateSection from './FormDateSection'
import FormInput from './FormInput'
import ValidationSection from './ValidationSection'
import style from './style/Form.module.css'

const CalculatorForm = () => {
  const setFormState = useStore((state) => state.setFormState)
  const updateCalculatorResults = useStore(
    (state) => state.updateCalculatorResults
  )
  const serviceBefore = useStore((state) => state.serviceBefore)
  const isCombat = useStore((state) => state.isCombat)
  const isDaysStraight = useStore((state) => state.isDaysStraight)
  const isStudent = useStore((state) => state.isStudent)
  const isIndependent = useStore((state) => state.isIndependent)
  const isOld = useStore((state) => state.isOld)
  const wifePregnant = useStore((state) => state.wifePregnant)
  const isUnemployed = useStore((state) => state.isUnemployed)
  const isSpouseUnemployed = useStore((state) => state.isSpouseUnemployed)
  const hasLostMoney = useStore((state) => state.hasLostMoney)
  const hasLostMoneyBothServing = useStore(
    (state) => state.hasLostMoneyBothServing
  )
  const isLivingAbroad = useStore((state) => state.isLivingAbroad)
  const didVacationCancelled = useStore((state) => state.didVacationCancelled)
  const personalEquipment = useStore((state) => state.personalEquipment)
  const hasChildren = useStore((state) => state.hasChildren)
  const hasChildrenSpecial = useStore((state) => state.hasChildrenSpecial)
  const validateAndSetErrors = useStore((state) => state.validateAndSetErrors)

  const isExperimentalQueryParams = useIsExperimental()

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
              כמות ימי המילואים שביצעת בשנת 2023 (לפני ה- 7/10):
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
          <FormCheckbox
            label="האם ביצעת בין 5-9 ימי שמ״פ רצופים לפני ה7 לאוקטובר?"
            name="isDaysStraight"
            checked={isDaysStraight}
            onChange={handleInputChange}
            disabled={parseFloat(serviceBefore) < 5}
          />
        </div>

        <div className={style.formSection}>
          <div className={style.formSectionTitle}>
            <NumberCircle number={3} />
            <div style={{ flex: 1 }}>סמנו אחת או יותר מהאפשרויות הבאות:</div>
          </div>
          <FormCheckbox
            label="אני במערך הלוחם"
            name="isCombat"
            checked={isCombat}
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
          <FormCheckbox
            label="אני מוחרג/ת גיל"
            name="isOld"
            checked={isOld}
            onChange={handleInputChange}
          />
          <FormCheckbox
            label="אני סטודנט/ית"
            name="isStudent"
            checked={isStudent}
            onChange={handleInputChange}
          />
        </div>
        {isExperimentalQueryParams && (
          <div className={style.formSection}>
            <FormCheckbox
              label="אני עצמאי"
              name="isIndependent"
              checked={isIndependent}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="בן/בת הזוג לא חזר/ה מחל״ד"
              name="wifePregnant"
              checked={wifePregnant}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="אני לא עובד"
              name="isUnemployed"
              checked={isUnemployed}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="בן/בת הזוג לא עובד/ת"
              name="isSpouseUnemployed"
              checked={isSpouseUnemployed}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="אובדן הכנסה של בן/בת הזוג הנוכחי/ת"
              name="hasLostMoney"
              checked={hasLostMoney}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="אובדן הכנסה כששני בני הזוג משרתים במילואים"
              name="hasLostMoneyBothServing"
              checked={hasLostMoneyBothServing}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="מרכז החיים בחו״ל"
              name="isLivingAbroad"
              checked={isLivingAbroad}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="טיסות / חופשות בוטלו"
              name="didVacationCancelled"
              checked={didVacationCancelled}
              onChange={handleInputChange}
            />
            <FormCheckbox
              label="אובדן או נזק לציוד אישי"
              name="personalEquipment"
              checked={personalEquipment}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className={style.submitButtonWrapper}>
          <button className={style.submitButton}>לחישוב המענקים</button>
        </div>
        <ValidationSection />
      </form>
    </div>
  )
}

export default CalculatorForm
