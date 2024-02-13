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

  return <>
    <div ref={errorRef} className={`${style.validation} items-center flex flex-col gap-2 justify-center`}>
      <div className={`${style.formSectionTitle} items-baseline flex flex-row font-semibold mb-4`}>לא ניתן לחשב:</div>
      {validationErrors.map((error) => (
        <div key={error} className={`${style.error} font-semibold mb-4`}>
          {error}
        </div>
      ))}
    </div>
  </>;
}

export default ValidationSection
