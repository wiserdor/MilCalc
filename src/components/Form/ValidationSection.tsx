import { useEffect, useRef } from 'react'
import useStore from '../../store'
import style from './Form.module.css'

const ValidationSection = () => {
  const { validationErrors } = useStore()

  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length > 0 && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validationErrors])

  if (validationErrors.length === 0) return null

  return (
    <div ref={errorRef}>
      {validationErrors.map((error) => (
        <div key={error} className={style.error}>
          {error}
        </div>
      ))}
    </div>
  )
}

export default ValidationSection
