import { useEffect, useMemo, useRef } from 'react'
import useStore from '../../store'
import style from './Results.module.css'

const Results = () => {
  const {
    totalPerMonth,
    totalMoreThan45,
    totalOperation24,
    totalFromChildren,
    totalVacation,
    totalSpecialChildren,
    totalMental,
    totalFamilyCare,
    validationErrors,
    compensationPerYear,
    startDate,
    isStudent,
    isCombat,
  } = useStore()

  const resultsRef = useRef<HTMLDivElement>(null)

  const totalCompensation = useMemo(
    () =>
      totalPerMonth +
      totalOperation24 +
      totalMoreThan45 +
      compensationPerYear?.reduce((a, b) => a + b, 0),
    [totalPerMonth, totalOperation24, totalMoreThan45, compensationPerYear]
  )

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length === 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validationErrors])

  if (validationErrors?.length > 0) return null

  const totalSum = totalFromChildren + totalSpecialChildren + totalVacation

  const totalCare = totalMental + totalFamilyCare

  // if sum of all is 0, don't show anything
  if (totalSum + totalCare + totalCompensation === 0) return null

  return (
    <div className={style.results} ref={resultsRef}>
      {totalCompensation > 0 && (
        <ul>
          <li className={style.sectionTitle}>
            {'תגמולים ומענקים - סה״כ ' + totalCompensation + ' ש״ח:'}
          </li>
          <ul>
            {compensationPerYear.map((compensation, i) =>
              compensation > 0 ? (
                <li key={i}>
                  {compensation +
                    ' ש״ח מענק לשנת ' +
                    (new Date(startDate).getFullYear() + i) +
                    '.'}
                </li>
              ) : null
            )}
            {totalPerMonth > 0 && (
              <li>{totalPerMonth + ' ש״ח מענקים חודשיים.'}</li>
            )}
            {totalMoreThan45 > 0 && (
              <li>{totalMoreThan45 + ' ש״ח מענק כלכלת בית.'}</li>
            )}
            {totalOperation24 > 0 && (
              <li>{totalOperation24 + ' ש״ח מענק תע״מ 2024.'}</li>
            )}
          </ul>
        </ul>
      )}
      {totalSum > 0 && (
        <ul>
          <li className={style.sectionTitle}>
            {'מעטפת משפחתית וכלכלית - סה״כ ' + totalSum + ' ש״ח:'}
          </li>
          <ul>
            {totalFromChildren > 0 && (
              <li>
                {totalFromChildren + ' ש״ח מענק חודשי להורים לילדים עד גיל 14.'}
              </li>
            )}
            {totalVacation > 0 && <li>{totalVacation + ' ש״ח מענק חופשה.'}</li>}
            {totalSpecialChildren > 0 && (
              <li>
                {totalSpecialChildren +
                  ' ש״ח מענק חודשי להורים לילדים עם צרכים מיוחדים.'}
              </li>
            )}
          </ul>
        </ul>
      )}
      {(totalCare > 0 || isStudent) && (
        <ul>
          <li className={style.sectionTitle}>
            {'מעטפת משלימה - סה״כ ' + totalCare + ' ש״ח:'}
          </li>
          <ul>
            {totalFamilyCare > 0 && (
              <li>{totalFamilyCare + ' ש״ח מימון טיפול אישי ומשפחתי.'}</li>
            )}
            {totalMental > 0 && (
              <li>{totalMental + ' ש״ח מימון לליווי וטיפול רגשי.'}</li>
            )}
            {isStudent && (
              <li>
                {isCombat
                  ? 'מגיע לך 100% סבסוד לשנת לימודים תשפ״ד.'
                  : 'מגיע לך 30% סבסוד לשנת לימודים תשפ״ד.'}
              </li>
            )}
          </ul>
        </ul>
      )}
    </div>
  )
}

export default Results
