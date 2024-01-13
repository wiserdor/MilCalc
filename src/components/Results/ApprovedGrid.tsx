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
        description:
          'ישולם ב- 1/5/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
      },
      {
        name: 'התגמול המיוחד',
        totalCompensation: totalSpecialDays + totalExtended,
        description:
          'ישולם ב- 1/5/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
      },

      {
        name: 'הוצאות אישיות (5 ימים רצופים).',
        totalCompensation: totalDaysStraight,
        description:
          'ישולם ב- 1/5/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
      },
      {
        name: 'מענק הוצאות אישיות מוגדל',
        totalCompensation: totalPerMonthApproved,
        description:
          'ישולם בפעימה ראשונה עד ה- 14/1/24 (עבור השמ"פ שבוצע ב-2023), באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
      },
      {
        name: 'מענק משפחה מוגדל',
        totalCompensation: totalFromChildrenApproved,
        description:
          'ישולם בפעימה ראשונה עד ה- 14/1/24 (עבור השמ"פ שבוצע ב-2023), באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
      },
      {
        name: 'מענק כלכלת בית מוגדל',
        totalCompensation: totalMoreThan45,
        description:
          'ישולם ב- 1/9/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל. עשוי להגיע בפעימה נוספת ב- 1/12/24.',
      },
      {
        name: 'מענק משפחה מיוחדת',
        totalCompensation: totalSpecialChildren,
        description:
          'ישולם עד 1/3/24 באופן אוטומטי וחד פעמי (ובכפוף לקבלת המידע הנדרש ממשרדי הממשלה) ישירות לחשבון הבנק המדווח במערכות צה״ל.',
      },
      {
        name: 'שובר חופשה',
        totalCompensation: totalVacation,
        description:
          'שובר אישי יישלח במהלך חציון ב׳ 2024 באופן אוטומטי כהודעה לטלפון הנייד של חייל המילואים, למימוש עד סוף שנת 2026.',
      },
      {
        name: 'טיפול זוגי',
        totalCompensation: totalFamilyCare,
        description:
          'הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. הגשת קבלת החזר החל מ- 1/2/24 לאחר שליחת מסרון פרטני. לניצול עד סוף 2026.',
      },
      {
        name: 'טיפול רגשי, נפשי ומשלים',
        totalCompensation: totalMental,
        description:
          'הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. הגשת קבלת החזר החל מ- 1/2/24 לאחר שליחת מסרון פרטני. לניצול עד סוף 2026.',
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
