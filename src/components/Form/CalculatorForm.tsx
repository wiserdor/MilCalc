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
import ArrowLeft from '../../svg/ArrowLeft'

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
    <div className="pb-12">
      <div className="relative flex items-center justify-center">
        <img
          className={style.arrowSvg}
          src="/svg/square-arrow.svg"
          alt="arrow"
        />
      </div>
      <div className="pb-5">
        <div
          className={`text-[1.4rem] leading-tight px-4 py-2 font-semibold text-center`}
        >
          רוצים לדעת כמה מגיע לכם/ן? בדקו עכשיו
        </div>
        <div className={`text-dark-gray font-normal text-center`}>
          אנא מלאו את הפרטים הבאים:
        </div>
      </div>

      <form className={`gap-6 flex flex-col`} onSubmit={handleSubmit(onSubmit)}>
        <FormDateSection control={control} register={register} />
        <div
          className={`border-solid border-[1.5px] border-idf rounded-2xl px-4 pt-4 pb-6 bg-white flex flex-col`}
        >
          <div
            className={`text-base gap-3 items-baseline flex flex-row font-semibold mb-4`}
          >
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

        <div className="border-solid border-[1.5px] border-idf rounded-2xl px-4 pt-4 pb-6 bg-white flex flex-col">
          <div>
            <div className="flex flex-row items-baseline gap-3 mb-2 text-base font-semibold">
              <NumberCircle number={3} />
              <div style={{ flex: 1 }}>בחרו בקטגוריות הרלוונטיות לגביכם/ן:</div>
            </div>
            <div className="mb-6 flex gap-6 text-xs px-2 py-[6px] rounded-[3px] w-fit text-[#A15FF7] justify-start items-center font-semibold bg-[#F2F6FD]">
              <ArrowLeft strokeColor="#A15FF7" />
              <div>הוספנו קטגוריות חדשות!</div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap w-full gap-2 gap-5">
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

        <div className="flex justify-center">
          <button
            className={`${style.submitButton} text-white cursor-pointer font-semibold text-center whitespace-nowrap`}
          >
            לחישוב המענקים
          </button>
        </div>
        <ValidationSection />
      </form>
    </div>
  )
}

export default CalculatorForm
