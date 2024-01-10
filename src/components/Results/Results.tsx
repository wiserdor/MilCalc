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

  const has2023 = useMemo(
    () => yearsSorted.some((year) => year === 2023),
    [yearsSorted]
  )

  const total2023 = useMemo(
    () => (has2023 ? compensationPerYear[yearsSorted.indexOf(2023)] : 0),
    [compensationPerYear, yearsSorted]
  )

  const totalNot2023 = useMemo(
    () =>
      compensationPerYear.reduce(
        (total, compensation, i) =>
          yearsSorted[i] !== 2023 ? total + compensation : total,
        0
      ),
    [compensationPerYear, yearsSorted]
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
      total2023,
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
    totalPerMonthNotApproved +
    totalNot2023

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
            {has2023 && (
              <li>
                <div className={style.sumLine}>
                  <span className={style.boldSum}>{`${total2023} ש״ח `}</span>
                  {'התגמול המיוחד 2023.'}
                </div>
              </li>
            )}

            {totalPerMonthApproved > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span className={style.boldSum}>
                    {`${totalPerMonthApproved} ש״ח `}
                  </span>
                  מענק הוצאות אישיות מוגדל.
                </div>
              </li>
            )}
            {totalOperation24 > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span
                    className={style.boldSum}
                  >{`${totalOperation24} ש״ח `}</span>
                  מענק לחימה תע״מ 2024.
                </div>
              </li>
            )}
            {totalFromChildrenApproved > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span className={style.boldSum}>
                    {`${totalFromChildrenApproved} ש״ח `}
                  </span>
                  מענק משפחה מוגדל.
                </div>
              </li>
            )}
            {totalSpecialChildren > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span
                    className={style.boldSum}
                  >{`${totalSpecialChildren} ש״ח `}</span>
                  מענק משפחה מיוחדת.
                </div>
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
            {compensationPerYear.map((compensation, i) =>
              compensation > 0 && yearsSorted[i] !== 2023 ? (
                <li key={i}>
                  <div className={style.sumLine}>
                    <span className={style.boldSum}>{compensation} ש״ח</span>
                    {' התגמול המיוחד ' + yearsSorted[i] + '.'}
                  </div>
                </li>
              ) : null
            )}
            {totalMoreThan45 > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span
                    className={style.boldSum}
                  >{`${totalMoreThan45} ש״ח `}</span>
                  מענק כלכלת בית מוגדל.
                </div>
              </li>
            )}
            {totalVacation > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span
                    className={style.boldSum}
                  >{`${totalVacation} ש״ח `}</span>
                  שובר חופשה.
                </div>
              </li>
            )}
            {totalFamilyCare > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span
                    className={style.boldSum}
                  >{`${totalFamilyCare} ש״ח `}</span>
                  מענק טיפול זוגי.
                </div>
              </li>
            )}
            {totalMental > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span className={style.boldSum}>{`${totalMental} ש״ח `}</span>
                  טיפול רגשי נפשי ומשלים.
                </div>
              </li>
            )}
            {totalPerMonthNotApproved > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span className={style.boldSum}>
                    {`${totalPerMonthNotApproved} ש״ח `}
                  </span>
                  מענק הוצאות אישיות מוגדל.
                </div>
              </li>
            )}
            {totalFromChildrenNotApproved > 0 && (
              <li>
                <div className={style.sumLine}>
                  <span className={style.boldSum}>
                    {`${totalFromChildrenNotApproved} ש״ח `}
                  </span>
                  מענק משפחה מוגדל.
                </div>
              </li>
            )}
            {isStudent && (
              <li>
                <span className={style.boldSum}>
                  {isCombat ? '100% ' : '30% '}
                </span>
                סבסוד לשנת לימודים תשפ״ד.
              </li>
            )}
          </ul>
        </ul>
      )}
    </div>
  )
}

export default Results
