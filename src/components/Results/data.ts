import { ApprovedItemProps } from './ResultItem'

export const getApprovedItems = (
  totalPerMonthApproved: number,
  totalFromChildrenApproved: number,
  totalSpecialChildren: number,
  totalMoreThan45: number,
  totalSpecialDays: number,
  totalExtended: number,
  totalAdditional: number,
  totalDaysStraight: number
): ApprovedItemProps[] => [
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
    paid: true,
    paidDate: '14/1/24',
  },
  {
    name: 'מענק משפחה מוגדל',
    totalCompensation: totalFromChildrenApproved,
    description:
      'ישולם בפעימה ראשונה עד ה- 14/1/24 (עבור השמ"פ שבוצע ב-2023), באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    paid: true,
    paidDate: '14/1/24',
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
]

export const getApprovedNonPaidItems = (
  totalFamilyCare: number,
  totalMental: number,
  totalVacation: number,
  isStudent: boolean,
  isCombat: boolean
) => [
  {
    name: 'שובר חופשה',
    totalCompensation: totalVacation,
    description:
      'שובר אישי יישלח במהלך חציון ב׳ 2024 באופן אוטומטי כהודעה לטלפון הנייד של חייל המילואים, למימוש עד סוף שנת 2026.',
    nonDirectMoney: true,
  },
  {
    name: 'טיפול זוגי',
    totalCompensation: totalFamilyCare,
    description:
      'הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. הגשת קבלת החזר החל מ- 1/2/24 לאחר שליחת מסרון פרטני. לניצול עד סוף 2026.',
    nonDirectMoney: true,
  },
  {
    name: 'טיפול רגשי, נפשי ומשלים',
    totalCompensation: totalMental,
    description:
      'הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. הגשת קבלת החזר החל מ- 1/2/24 לאחר שליחת מסרון פרטני. לניצול עד סוף 2026.',
    nonDirectMoney: true,
  },
  ...(isStudent
    ? [
        {
          name: `${isCombat ? `100% ` : `30% `}מימון לשנת לימודים תשפ״ד`,
          totalCompensation: isCombat ? 11296 : 3388,
          description: `מלגה זו תשולם באופן אוטומטי ע״י מופת ב-01/07/2024 ישירות לחשבון הבנק המדווח במערכות צה״ל, בכפוף להזנת ׳סטודנט׳ באזור האישי (תחת עדכון פרטים אישיים, מקצוע אזרחי - סטודנט) והצהרת משרת המילואים לאי קבלת מלגה/גובה המלגה שקיבל (פתיחת פניה למוקד המילואים).`,
          nonDirectMoney: true,
        },
      ]
    : []),
]
