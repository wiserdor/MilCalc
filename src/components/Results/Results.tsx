import { useEffect, useRef } from 'react'
import useStore from '../../store/store'
import ApprovedList from './ApprovedList'
import style from './Results.module.css'
import { getMaxChildApproval, getMaxMonthApproval } from './constants'

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
    totalOld,
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
    totalOld +
    totalSpecialDays +
    totalExtended +
    totalAdditional +
    totalDaysStraight

  if (validationErrors?.length > 0) return null

  if (totalApproved === 0) return null

  return (
    <div className={style.results} ref={resultsRef}>
      <div className={style.moneyLogo}>
        <img src="/svg/money.svg" />
      </div>
      <div className={style.resultsTitle}>המענקים שמגיעים לך:</div>
      {totalApproved > 0 && (
        <ApprovedList
          totalSpecialDays={totalSpecialDays}
          totalExtended={totalExtended}
          totalAdditional={totalAdditional}
          totalDaysStraight={totalDaysStraight}
          totalPerMonthApproved={totalPerMonthApproved}
          totalFromChildrenApproved={totalFromChildrenApproved}
          totalSpecialChildren={totalSpecialChildren}
          totalMoreThan45={totalMoreThan45}
          totalApproved={totalApproved}
          totalVacation={totalVacation}
          totalFamilyCare={totalFamilyCare}
          totalMental={totalMental}
          totalOld={totalOld}
        />
      )}
    </div>
  )
}

export default Results
