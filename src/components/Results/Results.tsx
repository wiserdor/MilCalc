import { useEffect, useMemo, useRef } from 'react'
import useStore from '../../store/store'
import style from './Results.module.css'
import ResultsSection from './ResultsSection'
import { getMaxChildApproval, getMaxMonthApproval } from './constants'
import { getApprovedItems } from './data'

const Results = () => {
  const {
    totalPerMonth,
    totalMoreThan45,
    totalFromChildren,
    totalVacation,
    totalSpecialChildren,
    totalMental,
    totalFamilyCare,
    validationErrors,
    totalSpecialDays,
    totalExtended,
    totalAdditional,
    totalDaysStraight,
    isCombat,
  } = useStore()

  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length === 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validationErrors])

  const totalFromChildrenApproved =
    totalFromChildren > getMaxChildApproval(isCombat)
      ? getMaxChildApproval(isCombat)
      : totalFromChildren

  const totalPerMonthApproved =
    totalPerMonth > getMaxMonthApproval(isCombat)
      ? getMaxMonthApproval(isCombat)
      : totalPerMonth

  const totalApproved =
    totalPerMonthApproved +
    totalFromChildrenApproved +
    totalSpecialChildren +
    totalMoreThan45 +
    totalFamilyCare +
    totalMental +
    totalVacation +
    totalSpecialDays +
    totalExtended +
    totalAdditional +
    totalDaysStraight

  const approvedItems = useMemo(
    () =>
      getApprovedItems(
        totalPerMonthApproved,
        totalFromChildrenApproved,
        totalSpecialChildren,
        totalMoreThan45,
        totalFamilyCare,
        totalMental,
        totalVacation,
        totalSpecialDays,
        totalExtended,
        totalAdditional,
        totalDaysStraight
      ),
    [
      totalPerMonthApproved,
      totalFromChildrenApproved,
      totalSpecialChildren,
      totalMoreThan45,
      totalFamilyCare,
      totalMental,
      totalVacation,
      totalSpecialDays,
      totalExtended,
      totalAdditional,
      totalDaysStraight,
    ]
  )

  if (validationErrors?.length > 0) return null

  if (totalApproved === 0) return null

  return (
    <div className={style.results} ref={resultsRef}>
      <div className={style.moneyLogo}>
        <img src="/svg/money.svg" />
      </div>
      <div className={style.resultsTitle}>המענקים שמגיעים לך</div>
      {totalApproved > 0 && (
        <ResultsSection total={totalApproved} results={approvedItems} />
      )}
    </div>
  )
}

export default Results
