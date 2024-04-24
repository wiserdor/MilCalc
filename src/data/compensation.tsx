import { ApprovedItem } from "../components/Results/CompensationSection";
const monthNames = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר"
];

const getMonthNameHebrew = (month: number) => {
  // get month minus two
  month -= 2;
  if (month < 0) {
    month += 12;
  }
  return monthNames[month];
};

const getYear = (date: Date) => {
  // get the year 2 months before
  const year = date.getFullYear();
  const month = date.getMonth();
  const currectYear = month < 2 ? year - 1 : year;
  return currectYear.toString().substring(2);
};

export const getApprovedItems = (
  totalPerMonthApproved = 0,
  totalPerMonthMonthlyAfter24 = [] as { month: Date; total: number }[],
  totalFromChildrenApproved = 0,
  totalFromChildrenMonthlyAfter24 = [] as { month: Date; total: number }[],
  totalSpecialChildren = 0,
  totalMoreThan45 = 0,
  totalSpecialDaysPayedIn24Total = 0,
  totalSpecialDaysPayedIn25Total = 0,
  specialDaysIn2024Dates = [] as Array<{ payMonth: number; total: number }>,
  totalAdditional2023 = 0,
  totalAdditional2024 = 0,
  totalDaysStraight = 0,
  totalOld = 0,
  totalWarPersonalExpenses = 0,
  totalWarFamilyExpenses = 0
): ApprovedItem[] => [
  {
    name: "מענק הוצאות אישיות",
    totalCompensation: totalWarPersonalExpenses,
    dateOfPayment: new Date("2023/11/10"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  },
  {
    name: "מענק משפחה",
    totalCompensation: totalWarFamilyExpenses,
    dateOfPayment: new Date("2023/11/10"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  },
  {
    name: "מענק הוצאות אישיות מוגדל",
    totalCompensation: totalPerMonthApproved,
    description:
      'ישולם בפעימה ראשונה עד ה- 14/1/24 (עבור השמ"פ שבוצע ב-2023), באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.',
    dateOfPayment: new Date("2024/01/14"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  },
  ...totalPerMonthMonthlyAfter24.map(({ month, total }) => ({
    name: `מענק הוצאות אישיות מוגדל ${getMonthNameHebrew(month.getMonth())} ${getYear(month)}`,
    totalCompensation: total,
    description: `ישולם לאחר חודשיים, באופן אוטומטי ישירות לחשבון הבנק המדווח במערכות צה״ל.`,
    dateOfPayment: month,
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  })),
  {
    name: "מענק משפחה מוגדל",
    totalCompensation: totalFromChildrenApproved,
    dateOfPayment: new Date("2024/01/14"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  },
  ...totalFromChildrenMonthlyAfter24.map(({ month, total }) => ({
    name: `מענק משפחה מוגדל ${getMonthNameHebrew(month.getMonth())} ${getYear(month)}`,
    totalCompensation: total,
    dateOfPayment: month,
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  })),
  {
    name: "מענק משפחה מיוחדת",
    totalCompensation: totalSpecialChildren,
    dateOfPayment: new Date("2024/03/01"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  },
  {
    name: "התגמול הנוסף 2024",
    totalCompensation: totalAdditional2023,
    dateOfPayment: new Date("2024/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/"
  },
  {
    name: "התגמול הנוסף 2025",
    totalCompensation: totalAdditional2024,
    dateOfPayment: new Date("2025/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/"
  },
  {
    name: "התגמול המיוחד 2024",
    totalCompensation: totalSpecialDaysPayedIn24Total,
    dateOfPayment: new Date("2024/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/"
  },
  ...specialDaysIn2024Dates.map(({ payMonth, total }) => ({
    name: `התגמול המיוחד ${getMonthNameHebrew(payMonth)} 24`,
    totalCompensation: total,
    dateOfPayment: new Date(`2024/${payMonth}/01`),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/"
  })),
  {
    name: "התגמול המיוחד 2025",
    totalCompensation: totalSpecialDaysPayedIn25Total,
    dateOfPayment: new Date("2025/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/"
  },
  {
    name: "הוצאות אישיות (5-9 ימים רצופים).",
    totalCompensation: totalDaysStraight,
    dateOfPayment: new Date("2024/05/01")
  },
  {
    name: "תגמול עבור מוחרגי גיל",
    totalCompensation: totalOld,
    dateOfPayment: new Date("2024/05/01"),
    url: "https://www.miluim.idf.il/articles-list/%D7%AA%D7%92%D7%9E%D7%95%D7%9C%D7%99%D7%9D/"
  },
  {
    name: totalMoreThan45 === 1250 ? "מענק כלכלת בית" : "מענק כלכלת בית מוגדל",
    totalCompensation: totalMoreThan45,
    dateOfPayment: new Date("2024/09/01"),
    url: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  }
];

export const getApprovedNonPaidItems = (
  totalFamilyCare: number,
  totalMental: number,
  totalVacation: number,
  isStudent: boolean,
  isCombat: boolean,
  isIndependent: boolean,
  didVacationCancelled: boolean,
  totalStudentCourse: number
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
    idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
  },
  {
    name: "טיפול זוגי",
    totalCompensation: totalFamilyCare,
    description: `סיוע חד פעמי במימון טיפול זוגי למשרת מילואים ובן/בת הזוג ששירת 30 ימים ומעלה במסגרת צו 8 ב'חרבות ברזל'. הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. לניצול עד סוף 2026. ניתן לממש רכיב זה ולשמור קבלות לטובת קבלת החזר.`,
    nonDirectMoney: true,
    idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/",
    link: {
      text: "להגשת בקשה להשתתפות בטיפול זוגי",
      url: "https://go.idf.il/MilZugi"
    }
  },
  {
    name: "טיפול רגשי, נפשי ומשלים",
    totalCompensation: totalMental,
    description: `סיוע חד פעמי במימון טיפול רגשי, נפשי, פסיכותרפי, משלים, אישי, זוגי או משפחתי למשרת מילואים ומשפחתו ששירת 30 ימים ומעלה במסגרת צו 8 'חרבות ברזל'.. הסיוע יינתן בכפוף לתצהיר + קבלה שיגיש משרת המילואים ולא יותר מהתשלום בפועל. לניצול עד סוף 2026. ניתן לממש רכיב זה ולשמור קבלות לטובת קבלת החזר.`,
    link: {
      text: "להגשת בקשה להשתתפות בטיפול רגשי",
      url: "https://go.idf.il/MilNafshi"
    },
    nonDirectMoney: true,
    idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
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
            url: "https://go.idf.il/AidFundind"
          },
          idfLink:
            "https://www.miluim.idf.il/articles-list/%D7%A7%D7%A8%D7%9F-%D7%94%D7%A1%D7%99%D7%95%D7%A2/"
        }
      ]
    : []),
  ...(isStudent
    ? [
        {
          name: `${isCombat ? `100% ` : `30% `}מימון לשנת לימודים תשפ״ד`,
          totalCompensation: isCombat ? 11296 : 3388,
          description: `סיוע חד פעמי בתשלום שכר הלימוד עבור שנת הלימודים התשפ״ד, למשרתי מילואים שהינם סטודנטים במוסדות להשכלה גבוהה, במוסדות לאומנות ובמכללות הטכנולוגיות המאושרות ע״י מה״ט וביצעו 60 ימי שמ״פ במסגרת צו 8. מלגה זו תשולם באופן אוטומטי ע״י מופת ב-1.7.24 ישירות לחשבון הבנק המדווח במערכות צה״ל בכפוף להזנת ׳סטודנט׳ באזור האישי (תחת עדכון פרטים אישיים, מקצוע אזרחי - סטודנט) והצהרת משרת המילואים לאי קבלת מלגה/גובה המלגה שקיבל (פתיחת פניה למוקד המילואים).`,
          nonDirectMoney: true,
          idfLink: "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/"
        }
      ]
    : []),
  ...(isStudent && totalStudentCourse > 0
    ? [
        {
          name: "סיוע בגין קורס חוזר/שיעורים פרטיים",
          totalCompensationStr: (
            <div>
              פיצוי מקסימלי עד{" "}
              <span className="whitespace-nowrap font-bold text-black">
                ₪{totalStudentCourse}
              </span>
            </div>
          ),
          totalCompensation: 0,
          description: `פיצוי לסטודנטים / לומדי לימודי תעודה אשר נפגעו במהלך מלחמת ״חרבות ברזל״ דרך קרן הסיוע. 

        נדרשים להציג אישור רשמי ממוסד הלימודים המעיד כי הינם לומדים במוסד לימודים בשנת תשפ"ד, תוך ציון מועד התחלה ומועד הסיום של שנת הלימודים הנ"ל, כפי שהיו בפועל או כפי שעתידים להיות; נדרש להציג חשבונית המבהירה את גובה הנזק אשר נגרם כתוצאה משירות המילואים בצו 8.`,
          nonDirectMoney: true,
          link: {
            url: "https://go.idf.il/AidFund",
            text: "לחץ כאן להגשת בקשה"
          },
          idfLink:
            "https://www.miluim.idf.il/articles-list/%D7%A7%D7%A8%D7%9F-%D7%94%D7%A1%D7%99%D7%95%D7%A2"
        }
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
            url: "https://wiz.medone.idf.il/MU/m/PYZ55QW4F9"
          }
        }
      ]
    : [])
];

const sortByDate = (a: ApprovedItem, b: ApprovedItem) =>
  a.dateOfPayment?.getTime()! - b.dateOfPayment?.getTime()!;

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
  pastPayments.sort(sortByDate);
  upcomingPayments.sort(sortByDate);
  return { pastPayments, upcomingPayments };
};
