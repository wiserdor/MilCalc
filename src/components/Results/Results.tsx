import { useEffect, useMemo, useRef } from 'react'
import useStore from '../../store/store'
import style from './Results.module.css'
import ResultsSection from './ResultsSection'
import { getMaxChildApproval, getMaxMonthApproval } from './constants'
import { getApprovedItems, getApprovedNonPaidItems } from './data'
import OneZero from '../OneZero/OneZero'

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

  const approvedItems = useMemo(
    () =>
      getApprovedItems(
        totalPerMonthApproved,
        totalFromChildrenApproved,
        totalSpecialChildren,
        totalMoreThan45,
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
      totalSpecialDays,
      totalExtended,
      totalAdditional,
      totalDaysStraight,
    ]
  )

  const approvedNonPaidItems = useMemo(
    () => getApprovedNonPaidItems(totalFamilyCare, totalMental, totalVacation),
    [totalMental, totalFamilyCare, totalVacation]
  )

  const totalApproved = useMemo(
    () => approvedItems.reduce((acc, item) => acc + item.totalCompensation, 0),
    [approvedItems]
  )

  const totalNonPaidApproved = useMemo(
    () =>
      approvedNonPaidItems.reduce(
        (acc, item) => acc + item.totalCompensation,
        0
      ),
    [approvedNonPaidItems]
  )

  if (validationErrors?.length > 0) return null

  if (totalApproved + totalNonPaidApproved === 0) return null

  return (
    <div className={style.results} ref={resultsRef}>
      <div className={style.moneyLogo}>
        <img src="/svg/money.svg" />
      </div>
      <h2 className={style.resultsTitle}>המענקים שמגיעים לך</h2>
      {totalApproved > 0 && (
        <ResultsSection
          title="תגמולים ומענקים"
          total={totalApproved}
          results={approvedItems}
        />
      )}
      {totalNonPaidApproved > 0 && (
        <ResultsSection
          title="שוברים וסיוע"
          total={totalNonPaidApproved}
          results={approvedNonPaidItems}
        />
      )}
      <OneZero />
    </div>
  )
}

export default Results
