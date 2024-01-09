import { useEffect, useMemo, useRef } from 'react'
import useStore from '../../store/store'
import style from './Results.module.css'
import { getMaxChildApproval, getMaxMonthApproval } from './constants'
import { DateRange } from '../../store/types'

function getAllYearsSorted(dateRanges: DateRange[]) {
  const years = dateRanges.map((dateRange) => {
    const startYear = new Date(dateRange.startDate).getFullYear()
    const endYear = new Date(dateRange.endDate).getFullYear()
    const years = []
    for (let i = startYear; i <= endYear; i++) {
      years.push(i)
    }
    return years
  })
  // remove duplicates
  return years
    .flat()
    .filter((year, index, self) => self.indexOf(year) === index)
    .sort()
}

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
    dateRanges,
    isStudent,
    isCombat,
  } = useStore()

  const resultsRef = useRef<HTMLDivElement>(null)

  const yearsSorted = useMemo(() => getAllYearsSorted(dateRanges), [dateRanges])

  const totalFromChildrenApproved =
    totalFromChildren > getMaxChildApproval(isCombat)
      ? getMaxChildApproval(isCombat)
      : totalFromChildren

  const totalFromChildrenNotApproved = Math.max(
    totalFromChildren - totalFromChildrenApproved,
    0
  )

  const totalPerMonthApproved =
    totalPerMonth > getMaxMonthApproval(isCombat)
      ? getMaxMonthApproval(isCombat)
      : totalPerMonth

  const totalPerMonthNotApproved = Math.max(
    totalPerMonth - totalPerMonthApproved,
    0
  )

  const totalApproved = useMemo(
    () =>
      totalPerMonthApproved +
      totalOperation24 +
      totalFromChildrenApproved +
      totalSpecialChildren +
      compensationPerYear?.reduce((a, b) => a + b, 0),
    [totalPerMonth, totalOperation24, compensationPerYear]
  )

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length === 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validationErrors])

  if (validationErrors?.length > 0) return null

  const totalNotApproved =
    totalVacation +
    totalMoreThan45 +
    totalMental +
    totalFamilyCare +
    totalFromChildrenNotApproved +
    totalPerMonthNotApproved

  // if sum of all is 0, don't show anything
  if (totalNotApproved + totalApproved === 0) return null

  return (
    <div className={style.results} ref={resultsRef}>
      <div className={style.moneyLogo}>
        <img src="/svg/money.svg" />
      </div>
      <div className={style.resultsTitle}>המענקים שמגיעים לך:</div>
      <div className={style.resultsSubtitle}></div>
      {totalApproved > 0 && (
        <ul className={style.resultsSection}>
          <div className={style.approvalBlock}>עבר אישור</div>
          <li className={style.sectionTitle}>
            {'סה״כ ' + totalApproved + ' ש״ח:'}
          </li>
          <ul className={style.resultsSectionResults}>
            {compensationPerYear.map((compensation, i) =>
              compensation > 0 ? (
                <li key={i}>
                  {compensation + ' ש״ח מענק לשנת ' + yearsSorted[i] + '.'}
                </li>
              ) : null
            )}
            {totalPerMonthApproved > 0 && (
              <li>{totalPerMonthApproved + ' ש״ח מענקים חודשיים.'}</li>
            )}
            {totalOperation24 > 0 && (
              <li>{totalOperation24 + ' ש״ח מענק תע״מ 2024.'}</li>
            )}
            {totalFromChildrenApproved > 0 && (
              <li>
                {totalFromChildrenApproved +
                  ' ש״ח מענק חודשי להורים לילדים עד גיל 14.'}
              </li>
            )}
            {totalSpecialChildren > 0 && (
              <li>
                {totalSpecialChildren +
                  ' ש״ח מענק חודשי להורים לילדים עם צרכים מיוחדים.'}
              </li>
            )}
          </ul>
        </ul>
      )}
      {(totalNotApproved > 0 || isStudent) && (
        <ul className={style.resultsSection}>
          <div className={style.maybeApprovalBlock}>צפוי לעבור אישור בקרוב</div>

          <li className={style.sectionTitle}>
            {'סה״כ ' + totalNotApproved + ' ש״ח:'}
          </li>
          <ul className={style.resultsSectionResults}>
            {totalMoreThan45 > 0 && (
              <li>{totalMoreThan45 + ' ש״ח מענק כלכלת בית.'}</li>
            )}
            {totalVacation > 0 && <li>{totalVacation + ' ש״ח מענק חופשה.'}</li>}
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
            {totalPerMonthNotApproved > 0 && (
              <li>{totalPerMonthNotApproved + ' ש״ח מענקים חודשיים.'}</li>
            )}
            {totalFromChildrenNotApproved > 0 && (
              <li>
                {totalFromChildrenNotApproved +
                  ' ש״ח מענק חודשי להורים לילדים עד גיל 14.'}
              </li>
            )}
          </ul>
        </ul>
      )}
    </div>
  )
}

export default Results
