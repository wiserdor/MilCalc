import { useMemo } from 'react'
import ApprovedItem, { ApprovedItemProps } from './ApprovedItem'
import style from './Results.module.css'

interface ApprovedGridProps {
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

const ApprovedGrid = (props: ApprovedGridProps) => {
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

  const approvedItems: ApprovedItemProps[] = useMemo(
    () => [
      {
        name: 'התגמול הנוסף',
        totalCompensation: totalAdditional,
      },
      {
        name: 'התגמול המיוחד',
        totalCompensation: totalSpecialDays + totalExtended,
      },

      {
        name: 'הוצאות אישיות (5 ימים רצופים).',
        totalCompensation: totalDaysStraight,
      },
      {
        name: 'מענק הוצאות אישיות מוגדל',
        totalCompensation: totalPerMonthApproved,
      },
      {
        name: 'מענק משפחה מוגדל',
        totalCompensation: totalFromChildrenApproved,
      },
      {
        name: 'מענק כלכלת בית מוגדל',
        totalCompensation: totalMoreThan45,
      },
      {
        name: 'מענק משפחה מיוחדת',
        totalCompensation: totalSpecialChildren,
      },
      {
        name: 'שובר חופשה',
        totalCompensation: totalVacation,
      },
      {
        name: 'טיפול זוגי',
        totalCompensation: totalFamilyCare,
      },
      {
        name: 'טיפול רגשי, נפשי ומשלים',
        totalCompensation: totalMental,
      },
    ],
    [props]
  )

  return (
    <div className={style.resultsSection}>
      <div className={style.sectionHeader}>
        <div>
          סך הכל:
          <span
            className={style.sectionTitle}
          >{` ${totalApproved.toLocaleString('he-IL')}₪`}</span>
        </div>
        <div className={style.approvalBlock}>✓ עבר אישור</div>
      </div>
      <div className={style.approvedGrid}>
        {approvedItems.map(
          (item, i) =>
            item.totalCompensation > 0 && <ApprovedItem key={i} {...item} />
        )}
      </div>
    </div>
  )
}

export default ApprovedGrid
