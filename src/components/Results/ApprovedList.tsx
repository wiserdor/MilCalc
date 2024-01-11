import style from './Results.module.css'

interface ApprovedListProps {
  total2023: number
  totalPerMonthApproved: number
  totalFromChildrenApproved: number
  totalSpecialChildren: number
  totalApproved: number
  has2023: boolean
}

const ApprovedList = (props: ApprovedListProps) => {
  const {
    total2023,
    totalPerMonthApproved,
    totalFromChildrenApproved,
    totalSpecialChildren,
    has2023,
    totalApproved,
  } = props

  return (
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
  )
}

export default ApprovedList
