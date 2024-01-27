import { useEffect, useMemo, useRef } from 'react'
import useStore from '../../store/store'
import OneZero from '../OneZero/OneZero'
import style from './styles/Results.module.css'
import ResultsSection from './ResultsSection'
import { getApprovedItems, getApprovedNonPaidItems } from './data'
import CompensationSection from './CompensationSection'

const Results = () => {
  const totalPerMonth = useStore((state) => state.totalPerMonth)
  const totalMoreThan45 = useStore((state) => state.totalMoreThan45)
  const totalFromChildren = useStore((state) => state.totalFromChildren)
  const totalVacation = useStore((state) => state.totalVacation)
  const totalSpecialChildren = useStore((state) => state.totalSpecialChildren)
  const totalMental = useStore((state) => state.totalMental)
  const totalFamilyCare = useStore((state) => state.totalFamilyCare)
  const validationErrors = useStore((state) => state.validationErrors)
  const totalSpecialDays = useStore((state) => state.totalSpecialDays)
  const totalExtended = useStore((state) => state.totalExtended)
  const totalAdditional = useStore((state) => state.totalAdditional)
  const totalDaysStraight = useStore((state) => state.totalDaysStraight)
  const totalOld = useStore((state) => state.totalOld)
  const totalWarPersonalExpenses = useStore(
    (state) => state.totalWarPersonalExpenses
  )
  const totalWarFamilyExpenses = useStore(
    (state) => state.totalWarFamilyExpenses
  )

  const resultsIsStudent = useStore((state) => state.resultsIsStudent)
  const resultsIsCombat = useStore((state) => state.resultsIsCombat)

  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length === 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [validationErrors])

  const approvedItems = useMemo(
    () =>
      getApprovedItems(
        totalPerMonth,
        totalFromChildren,
        totalSpecialChildren,
        totalMoreThan45,
        totalSpecialDays,
        totalExtended,
        totalAdditional,
        totalDaysStraight,
        totalOld,
        totalWarPersonalExpenses,
        totalWarFamilyExpenses
      ),
    [
      totalPerMonth,
      totalFromChildren,
      totalSpecialChildren,
      totalMoreThan45,
      totalSpecialDays,
      totalExtended,
      totalAdditional,
      totalDaysStraight,
      totalOld,
      totalWarPersonalExpenses,
      totalWarFamilyExpenses,
    ]
  )

  const approvedNonPaidItems = useMemo(
    () =>
      getApprovedNonPaidItems(
        totalFamilyCare,
        totalMental,
        totalVacation,
        resultsIsStudent,
        resultsIsCombat
      ),
    [
      totalMental,
      totalFamilyCare,
      totalVacation,
      resultsIsStudent,
      resultsIsCombat,
    ]
  )
  const totalApproved = useMemo(
    () =>
      approvedItems.reduce(
        (acc, item) => acc + (item.totalCompensation ?? 0),
        0
      ),
    [approvedItems]
  )

  const totalNonPaidApproved = useMemo(
    () =>
      approvedNonPaidItems.reduce(
        (acc, item) => acc + (item.totalCompensation ?? 0),
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
        <CompensationSection
          totalCompensation={totalApproved}
          items={approvedItems}
        />
      )}
      {totalNonPaidApproved > 0 && (
        <ResultsSection
          title="שוברים וסיוע"
          total={totalNonPaidApproved}
          results={approvedNonPaidItems}
        />
      )}
      <OneZero total={totalApproved} />
    </div>
  )
}

export default Results
