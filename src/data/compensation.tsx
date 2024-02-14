import { ApprovedItem } from "../components/Results/CompensationSection";

export const getApprovedItems = (
  totalPerMonthApproved = 0,
  totalFromChildrenApproved = 0,
  totalSpecialChildren = 0,
  totalMoreThan45 = 0,
  totalSpecialDays = 0,
  totalExtended = 0,
  totalAdditional = 0,
  totalDaysStraight = 0,
  totalOld = 0,
  totalWarPersonalExpenses = 0,
  totalWarFamilyExpenses = 0,
): ApprovedItem[] => [
  {
    name: "מענק הוצאות אישיות",
    totalCompensation: totalWarPersonalExpenses,
    dateOfPayment: new Date("2023/11/10"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  {
    name: "מענק משפחה",
    totalCompensation: totalWarFamilyExpenses,
    dateOfPayment: new Date("2023/11/10"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  {
    name: "מענק הוצאות אישיות מוגדל",
    totalCompensation: totalPerMonthApproved,
    description:
      'ישולם בפעימה ראשונה עד ה- 14/1/24 (עבור השמ"פ שבוצע ב-2023), באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    dateOfPayment: new Date("2024/01/14"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  {
    name: "מענק משפחה מוגדל",
    totalCompensation: totalFromChildrenApproved,
    dateOfPayment: new Date("2024/01/14"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  {
    name: "מענק משפחה מיוחדת",
    totalCompensation: totalSpecialChildren,
    dateOfPayment: new Date("2024/03/01"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  {
    name: "התגמול הנוסף",
    totalCompensation: totalAdditional,
    dateOfPayment: new Date("2024/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/",
  },
  {
    name: "התגמול המיוחד",
    totalCompensation: totalSpecialDays + totalExtended,
    dateOfPayment: new Date("2024/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/",
  },

  {
    name: "הוצאות אישיות (5-9 ימים רצופים).",
    totalCompensation: totalDaysStraight,
    dateOfPayment: new Date("2024/05/01"),
  },
  {
    name: "תגמול עבור מוחרגי גיל",
    totalCompensation: totalOld,
    dateOfPayment: new Date("2024/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/",
  },
  {
    name: totalMoreThan45 === 1250 ? "מענק כלכלת בית" : "מענק כלכלת בית מוגדל",
    totalCompensation: totalMoreThan45,
    dateOfPayment: new Date("2024/09/01"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
];

export const getApprovedNonPaidItems = (
  totalFamilyCare: number,
  totalMental: number,
  totalVacation: number,
  isStudent: boolean,
  isCombat: boolean,
  isIndependent: boolean,
  didVacationCancelled: boolean,
): {
  name: string;
  totalCompensation: number;
  totalCompensationStr?: string | JSX.Element;
  description: string;
  nonDirectMoney: boolean;
  link?: {
    text: string;
    url: string;
  };
  idfLink?: string;
}[] => [
  {
    name: "שובר חופשה",
    totalCompensation: totalVacation,
    description: `שובר חופשה למשרתי מילואים ששירתו לפחות 60 ימי שמ״פ במסגרת צו 8 ב'חרבות ברזל'. שימו לב, לא ניתן לקבל שובר זה יותר מפעם אחת. שובר אישי יישלח במהלך חציון ב׳ 2024 באופן אוטומטי כהודעה לטלפון הנייד של חייל המילואים, למימוש עד סוף שנת 2026.`,
    nonDirectMoney: true,
    idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  {
    name: "טיפול זוגי",
    totalCompensation: totalFamilyCare,
    description: `סיוע חד פעמי במימון טיפול זוגי למשרת מילואים ובן/בת הזוג ששירת 30 ימים ומעלה במסגרת צו 8 ב'חרבות ברזל'. הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. הגשת קבלת החזר החל מ- 1.2.24 לאחר שליחת מסרון פרטני. לניצול עד סוף 2026. ניתן לממש רכיב זה ולשמור קבלות לטובת קבלת החזר.`,
    nonDirectMoney: true,
    idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  {
    name: "טיפול רגשי, נפשי ומשלים",
    totalCompensation: totalMental,
    description: `סיוע חד פעמי במימון טיפול רגשי, נפשי, פסיכותרפי, משלים, אישי, זוגי או משפחתי למשרת מילואים ומשפחתו ששירת 30 ימים ומעלה במסגרת צו 8 'חרבות ברזל'.. הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. הגשת קבלת החזר החל מ- 1.2.24 לאחר שליחת מסרון פרטני.לניצול עד סוף 2026. ניתן לממש רכיב זה ולשמור קבלות לטובת קבלת החזר.`,
    nonDirectMoney: true,
    idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
  },
  ...(isIndependent
    ? [
        {
          name: "קרן הסיוע עבור עצמאים",
          description: `הקרן להוקרה, סיוע ותגמול תטפל ותעניק סיוע למשרתי מילואים ששירתו במלחמת 'חרבות ברזל' החל מיום 7.10.23, בין היתר בגין נזקים כלכליים שנגרמו להם ולבני משפחתם עקב השתתפותם בלחימה או עקב קריאתם לשירות מילואים בהתראה קצרה.

    הקרן תופעל החל מ-15.11.23 למשך שנה. ללא הגבלה לסיבת הפניה. הפניות יישקלו וייבדקו על ידי ועדה מקצועית למענך. .`,
          totalCompensationStr: "ללא הגבלה על סכום הגשת הבקשה",
          totalCompensation: 0,
          nonDirectMoney: true,
          link: {
            text: "לחץ כאן להגשת בקשה לקרן הסיוע",
            url: "https://go.idf.il/AidFundind",
          },
          idfLink:
            "https://www.miluim.idf.il/articles-list/%D7%A7%D7%A8%D7%9F-%D7%94%D7%A1%D7%99%D7%95%D7%A2/",
        },
      ]
    : []),
  ...(isStudent
    ? [
        {
          name: `${isCombat ? `100% ` : `30% `}מימון לשנת לימודים תשפ״ד`,
          totalCompensation: isCombat ? 11296 : 3388,
          description: `סיוע חד פעמי בתשלום שכר הלימוד עבור שנת הלימודים התשפ״ד, למשרתי מילואים שהינם סטודנטים במוסדות להשכלה גבוהה, במוסדות לאומנות ובמכללות הטכנולוגיות המאושרות ע״י מה״ט וביצעו 60 ימי שמ״פ במסגרת צו 8. מלגה זו תשולם באופן אוטומטי ע״י מופת ב-1.7.24 ישירות לחשבון הבנק המדווח במערכות צה״ל בכפוף להזנת ׳סטודנט׳ באזור האישי (תחת עדכון פרטים אישיים, מקצוע אזרחי - סטודנט) והצהרת משרת המילואים לאי קבלת מלגה/גובה המלגה שקיבל (פתיחת פניה למוקד המילואים).`,
          nonDirectMoney: true,
          idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
        },
      ]
    : []),
  ...(didVacationCancelled
    ? [
        {
          name: "פיצוי בגין ביטול חופשות/טיסות",
          totalCompensationStr: (
            <div className="text-dark-gray">
              עד <span className="font-bold text-black">₪5000</span>
            </div>
          ),
          totalCompensation: 0,
          description: `קרן הסיוע תפצה משרתי מילואים שהתייצבו בצו 8 ונפגעו כספית כתוצאה מהצורך לבטל/לדחות טיסות/חופשות בארץ או בחו״ל לפי הפירוט הבא:

          *משרתי מילואים שרכשו כרטיס טיסה לשם הגעה לארץ וגויסו בצו 8 (במידה ולא נקרא בקריאה בצו 8 ולא נפתח שמ"פ, יעלה לוועדת חריגים).
          *משרתי מילואים שרכשו כרטיס טיסה ו/או חופשה שבוטלה ובתנאי שנרכשו טרום קריאתו בצו 8.`,
          nonDirectMoney: true,
          idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
          link: {
            text: "להגשת בקשה לחץ כאן",
            url: "https://wiz.medone.idf.il/MU/m/PYZ55QW4F9",
          },
        },
      ]
    : []),
];

export const separatePaymentsByDate = (list: ApprovedItem[]) => {
  const currentDate = new Date();
  const pastPayments: ApprovedItem[] = [];
  const upcomingPayments: ApprovedItem[] = [];

  list.forEach((item) => {
    if (!item.dateOfPayment) {
      return;
    }
    if (item.dateOfPayment < currentDate) {
      pastPayments.push(item);
    } else {
      upcomingPayments.push(item);
    }
  });

  return { pastPayments, upcomingPayments };
};