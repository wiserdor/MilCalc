import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useStore from '../../store/store'
import { FormValues } from '../../store/types'
import NumberCircle from '../NumberCircle/NumberCircle'
import Toggle from '../Toggle/Toggle'
import FormDateSection from './FormDateSection'
import FormInput from './FormInput'
import ValidationSection from './ValidationSection'
import style from './style/Form.module.css'
import { validateForm } from './validation'

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
  const dateRanges = useStore((state) => state.dateRanges)

  const setValidationErrors = useStore((state) => state.setValidationErrors)

  const { handleSubmit, control, register } = useForm<FormValues>({
    defaultValues: {
      dateRanges,
      serviceBefore,
      isCombat,
      isStudent,
      isOld,
      isIndependent,
      hasChildren,
      hasChildrenSpecial,
    },
  })

  useEffect(() => {
    loadStateFromUrl()
  }, [])

  const onSubmit = (data: FormValues) => {
    const errors = validateForm(
      data.dateRanges,
      data.serviceBefore,
      data.operation24Days
    )
    setValidationErrors(errors)
    if (errors.length > 0) {
      return
    }
    setFormState({ ...data })
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

      <form className={style.formForm} onSubmit={handleSubmit(onSubmit)}>
        <FormDateSection control={control} register={register} />
        <div className={style.formSection}>
          <div className={style.formSectionTitle}>
            <NumberCircle number={2} />
            <div style={{ flex: 1 }}>
              מספר ימי המילואים שביצעת בשנת 2023 (לפני ה- 7/10):
            </div>
          </div>
          <FormInput
            type="number"
            min={0}
            step={0.5}
            register={register}
            registerOptions={{ required: true, min: 0, max: 365 }}
            name="serviceBefore"
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
            <Controller
              control={control}
              name="isCombat"
              render={({ field: { onChange, value, name, ref } }) => {
                return (
                  <Toggle
                    label="במערך הלוחם"
                    name={name}
                    active={value}
                    onChange={onChange}
                    ref={ref}
                  />
                )
              }}
            />
            <Controller
              control={control}
              name="hasChildren"
              render={({ field: { onChange, value, name, ref } }) => (
                <Toggle
                  label="ילדים עד גיל 14"
                  name={name}
                  active={value}
                  onChange={onChange}
                  ref={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="hasChildrenSpecial"
              render={({ field: { onChange, value, name, ref } }) => (
                <Toggle
                  label="ילדים עם צרכים מיוחדים"
                  name={name}
                  active={value}
                  onChange={onChange}
                  ref={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="isOld"
              render={({ field: { onChange, value, name, ref } }) => (
                <Toggle
                  label="מוחרג/ת גיל"
                  name={name}
                  active={value}
                  onChange={onChange}
                  ref={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="isIndependent"
              render={({ field: { onChange, value, name, ref } }) => (
                <Toggle
                  label="עצמאי/ת"
                  name={name}
                  active={value}
                  onChange={onChange}
                  ref={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="isStudent"
              render={({ field: { onChange, value, name, ref } }) => (
                <Toggle
                  label="סטודנט/ית"
                  name={name}
                  active={value}
                  onChange={onChange}
                  ref={ref}
                />
              )}
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
