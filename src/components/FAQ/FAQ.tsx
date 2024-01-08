import Accordion from '../Accordion/Accordion'
import style from './FAQ.module.css'

const faqQuestions = [
  {
    title: 'מתי אקבל את המענקים שכבר אושרו? איך זה מתבצע?',
    content:
      'עדיין לא ברור מתי ואיך בדיוק הסכום שכבר אושר יועבר בפועל, אבל זה צפוי להיות בזמן הקרוב. ',
  },
  // {
  //   title:
  //     'התגייסתי בתחילת המלחמה ושוחררתי, ואז גויסתי שוב. האם יש אפשרות להכניס את שני טווחי התאריכים?',
  //     content:'כן! עכשיו ניתן להוסיף במחשבון טווח תאריכים נוסף ע״י לחיצה על ׳הוסף טווח תאריכים נוסף +׳'
  // },
  {
    title: 'במידה ולא השלמתי חודש מלא, האם המענק החודשי עדיין מגיע לי?',
    content: 'לא פורסמו הבהרות עבור חודשים חלקיים ולכן קשה לנו לענות על זה.',
  },
  {
    title: 'אני סטודנט, איך אפשר לקבל את הכסף?',
    content:
      'המענק עבור שכר לימוד לסטודנטים צפוי לעבור אישור במסגרת הפעימה השלישית בהמשך השנה. ',
  },
  {
    title: 'ביצעתי תעסוקה מבצעית ב2023, האם מגיע לי מענק?',
    content:
      'לא יצאו הנחיות ברורות לגבי התע״מ, אבל ממה שפורסם - המענק יהיה עבור תע״מ בשנת 2024 בלבד, וצפוי לעבור אישור במסגרת הפעימה השלישית בהמשך השנה.',
  },
  {
    title: 'האם המחשבון מדויק וניתן לסמוך עליו שאקבל את מלוא הסכום?',
    content:
      'אנחנו עושים כמיטב יכולתנו להתאים ולעדכן את המחשבון לפי המסמכים שמופצים על ידי צה״ל, משרד האוצר והתקשורת. אך איננו יכולים להתחייב או לקחת אחריות שתקבלו את הסכום מהמדינה.',
  },
  {
    title: 'האם המענק עבור אוקטובר נכלל במחשבון?',
    content:
      ' לא, מאחר והסכום עבור אוקטובר 2023 (1,100 ש״ח) כבר התקבל, בחרנו לא לכלול אותו בחישוב. במידה ועדיין לא קיבלתם.ן את הסכום הזה לחשבון הבנק שלכם, אנו ממליצים ליצור קשר עם הגורם האחראי ביחידת המילואים. ',
  },
  {
    title:
      'אני לא לוחמ/ת אבל אני ביחידה קרבית. איך אדע אם מגיע לי המענק עבור לוחמ/ת? ',
    content:
      'אנחנו ממליצים לפנות לגורם האחראי ביחידת המילואים כדי לקבל תשובה עבור השאלה הזאת.',
  },
]

const FAQ = () => {
  return (
    <div className={style.FAQ}>
      <div className={style.FAQTitle}>שאלות ותשובות:</div>
      <Accordion items={faqQuestions}></Accordion>
    </div>
  )
}

export default FAQ