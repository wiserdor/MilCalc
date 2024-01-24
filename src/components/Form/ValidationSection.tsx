import { useEffect, useRef } from 'react'
import useStore from '../../store/store'
import style from './style/Form.module.css'

const ValidationSection = () => {
  const validationErrors = useStore((state) => state.validationErrors)

  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length > 0 && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validationErrors])

  if (validationErrors.length === 0) return null

  return (
    <>
      <div ref={errorRef} className={style.validation}>
        <div className={style.formSectionTitle}>לא ניתן לחשב:</div>
        {validationErrors.map((error) => (
          <div key={error} className={style.error}>
            {error}
          </div>
        ))}
      </div>
    </>
  )
}

export default ValidationSection
