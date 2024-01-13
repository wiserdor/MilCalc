import style from './Results.module.css'

interface ApprovedListProps {
  totalSpecialDays: number
  totalExtended: number
  totalAdditional: number
  totalDaysStraight: number
  totalPerMonthApproved: number
  totalFromChildrenApproved: number
  totalSpecialChildren: number
  totalApproved: number

  totalMoreThan45: number
  totalVacation: number
  totalFamilyCare: number
  totalMental: number
}

const ApprovedList = (props: ApprovedListProps) => {
  const {
    totalSpecialDays,
    totalExtended,
    totalAdditional,
    totalDaysStraight,
    totalPerMonthApproved,
    totalFromChildrenApproved,
    totalSpecialChildren,
    totalApproved,
    totalMoreThan45,
    totalVacation,
    totalFamilyCare,
    totalMental,
  } = props

  return (
    <ul className={style.resultsSection}>
      <div className={style.approvalBlock}>עבר אישור</div>
      <li className={style.sectionTitle}>
        {'סה״כ ' + totalApproved + ' ש״ח:'}
      </li>
      <ul className={style.resultsSectionResults}>
        {totalAdditional > 0 && (
          <li>
            <div className={style.sumLine}>
              <span className={style.boldSum}>{`${totalAdditional} ש״ח `}</span>
              התגמול הנוסף.
            </div>
          </li>
        )}
        {totalSpecialDays + totalExtended > 0 && (
          <li>
            <div className={style.sumLine}>
              <span className={style.boldSum}>{`${
                totalSpecialDays + totalExtended
              } ש״ח `}</span>
              התגמול המיוחד.
            </div>
          </li>
        )}

        {totalDaysStraight > 0 && (
          <li>
            <div className={style.sumLine}>
              <span
                className={style.boldSum}
              >{`${totalDaysStraight} ש״ח `}</span>
              הוצאות אישיות (5 ימים רצופים).
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
        {totalMoreThan45 > 0 && (
          <li>
            <div className={style.sumLine}>
              <span className={style.boldSum}>{`${totalMoreThan45} ש״ח `}</span>
              מענק כלכלת בית מוגדל.
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
              טיפול זוגי.
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
      </ul>
    </ul>
  )
}

export default ApprovedList
