import { ApprovedItemProps } from './ResultItem'

export const getApprovedItems = (
  totalPerMonthApproved: number = 0,
  totalFromChildrenApproved: number = 0,
  totalSpecialChildren: number = 0,
  totalMoreThan45: number = 0,
  totalSpecialDays: number = 0,
  totalExtended: number = 0,
  totalAdditional: number = 0,
  totalDaysStraight: number = 0,
  totalOld: number = 0
): ApprovedItemProps[] => [
  {
    name: 'מענק הוצאות אישיות מוגדל',
    totalCompensation: totalPerMonthApproved,
    description:
      'ישולם בפעימה ראשונה עד ה- 14/1/24 (עבור השמ"פ שבוצע ב-2023), באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    paid: true,
    dateOfPayment: new Date('2024/01/14'),
    url: 'https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/',
  },
  {
    name: 'מענק משפחה מוגדל',
    totalCompensation: totalFromChildrenApproved,
    description:
      'ישולם בפעימה ראשונה עד ה- 14/1/24 (עבור השמ"פ שבוצע ב-2023), באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    paid: true,
    dateOfPayment: new Date('2024/01/14'),
    url: 'https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/',
  },
  {
    name: 'מענק משפחה מיוחדת',
    totalCompensation: totalSpecialChildren,
    description:
      'ישולם עד 1/3/24 באופן אוטומטי וחד פעמי (ובכפוף לקבלת המידע הנדרש ממשרדי הממשלה) ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    dateOfPayment: new Date('2024/03/01'),
    url: 'https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/',
  },
  {
    name: 'התגמול הנוסף',
    totalCompensation: totalAdditional,
    description:
      'ישולם ב- 1/5/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    dateOfPayment: new Date('2024/05/01'),
    url: 'https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/',
  },
  {
    name: 'התגמול המיוחד',
    totalCompensation: totalSpecialDays + totalExtended,
    description:
      'ישולם ב- 1/5/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    dateOfPayment: new Date('2024/05/01'),
    url: 'https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/',
  },

  {
    name: 'הוצאות אישיות (5-9 ימים רצופים).',
    totalCompensation: totalDaysStraight,
    description:
      'ישולם ב- 1/5/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    dateOfPayment: new Date('2024/05/01'),
  },
  {
    name: 'תגמול עבור מוחרגי גיל',
    totalCompensation: totalOld,
    description:
      'ישולם ב- 1/5/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    dateOfPayment: new Date('2024/05/01'),
    url: 'https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/',
  },
  {
    name: 'מענק כלכלת בית מוגדל',
    totalCompensation: totalMoreThan45,
    description:
      'ישולם ב- 1/9/24 באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל. עשוי להגיע בפעימה נוספת ב- 1/12/24.',
    dateOfPayment: new Date('2024/09/01'),
    url: 'https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/',
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

export const separatePaymentsByDate = (list: ApprovedItemProps[]) => {
  const currentDate = new Date()
  const pastPayments: ApprovedItemProps[] = []
  const upcomingPayments: ApprovedItemProps[] = []

  list.forEach((item) => {
    if (!item.dateOfPayment) {
      return
    }
    if (item.dateOfPayment < currentDate) {
      pastPayments.push(item)
    } else {
      upcomingPayments.push(item)
    }
  })

  return { pastPayments, upcomingPayments }
}
