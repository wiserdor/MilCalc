import { useEffect, useMemo, useRef } from 'react'
import useStore from '../../store/store'
import style from './Results.module.css'
import { getMaxChildApproval, getMaxMonthApproval } from './constants'
import { DateRange } from '../../store/types'
import ApprovedList from './ApprovedList'
import NotApprovedList from './NotApprovedList'

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

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length === 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validationErrors])

  const yearsSorted = useMemo(
    () => (compensationPerYear?.length ? getAllYearsSorted(dateRanges) : []),
    [dateRanges, compensationPerYear]
  )

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
    () => (has2023 ? compensationPerYear[0] : 0),
    [compensationPerYear]
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
      totalFromChildrenApproved +
      totalSpecialChildren +
      totalMoreThan45 +
      totalFamilyCare +
      totalMental +
      totalVacation +
      total2023,
    [
      totalPerMonth,
      compensationPerYear,
      totalFromChildren,
      totalMoreThan45,
      total2023,
      totalSpecialChildren,
      totalFamilyCare,
      totalMental,
      totalVacation,
    ]
  )

  const totalNotApproved =
    totalFromChildrenNotApproved +
    totalPerMonthNotApproved +
    totalOperation24 +
    totalNot2023

  if (validationErrors?.length > 0) return null

  // if sum of all is 0, don't show anything
  if (totalNotApproved + totalApproved === 0) return null

  return (
    <div className={style.results} ref={resultsRef}>
      <div className={style.moneyLogo}>
        <img src="/svg/money.svg" />
      </div>
      <div className={style.resultsTitle}>המענקים שמגיעים לך:</div>
      {totalApproved > 0 && (
        <ApprovedList
          total2023={total2023}
          totalPerMonthApproved={totalPerMonthApproved}
          totalFromChildrenApproved={totalFromChildrenApproved}
          totalSpecialChildren={totalSpecialChildren}
          has2023={has2023}
          totalMoreThan45={totalMoreThan45}
          totalApproved={totalApproved}
          totalVacation={totalVacation}
          totalFamilyCare={totalFamilyCare}
          totalMental={totalMental}
        />
      )}
      {(totalNotApproved > 0 || isStudent) && (
        <NotApprovedList
          totalOperation24={totalOperation24}
          totalPerMonthNotApproved={totalPerMonthNotApproved}
          totalFromChildrenNotApproved={totalFromChildrenNotApproved}
          totalNotApproved={totalNotApproved}
          isStudent={isStudent}
          isCombat={isCombat}
          compensationPerYear={compensationPerYear}
          yearsSorted={yearsSorted}
        />
      )}
    </div>
  )
}

export default Results
