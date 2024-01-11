import style from './Results.module.css'
interface NotApprovedListProps {
  totalOperation24: number
  totalMoreThan45: number
  totalVacation: number
  totalFamilyCare: number
  totalMental: number
  totalPerMonthNotApproved: number
  totalFromChildrenNotApproved: number
  totalNotApproved: number
  isStudent: boolean
  isCombat: boolean
  compensationPerYear: number[]
  yearsSorted: number[]
}

const NotApprovedList = (props: NotApprovedListProps) => {
  const {
    totalOperation24,
    totalMoreThan45,
    totalVacation,
    totalFamilyCare,
    totalMental,
    totalPerMonthNotApproved,
    totalFromChildrenNotApproved,
    totalNotApproved,
    isStudent,
    isCombat,
    compensationPerYear,
    yearsSorted,
  } = props

  return (
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
        {totalMoreThan45 > 0 && (
          <li>
            <div className={style.sumLine}>
              <span className={style.boldSum}>{`${totalMoreThan45} ש״ח `}</span>
              מענק כלכלת בית מוגדל.
            </div>
          </li>
        )}
        {totalVacation > 0 && (
          <li>
            <div className={style.sumLine}>
              <span className={style.boldSum}>{`${totalVacation} ש״ח `}</span>
              שובר חופשה.
            </div>
          </li>
        )}
        {totalFamilyCare > 0 && (
          <li>
            <div className={style.sumLine}>
              <span className={style.boldSum}>{`${totalFamilyCare} ש״ח `}</span>
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
            <span className={style.boldSum}>{isCombat ? '100% ' : '30% '}</span>
            סבסוד לשנת לימודים תשפ״ד.
          </li>
        )}
      </ul>
    </ul>
  )
}

export default NotApprovedList
