const data: {
  title: string
  imgUrl: string
  description: string | JSX.Element
  items: Array<
    | { type: 'phone'; text: string }
    | { type: 'whatsapp'; url: string }
    | { type: 'link'; url: string; text: string }
  >
}[] = [
  {
    title: 'אלון זעירה',
    imgUrl: 'zeira.jpeg',
    description: `אחרי 104 ימים ברגשות מעורבים כי המשימה עדיין לא הושלמה,השתחררתי ממילואים נכון לעכשיו.
    העסק כמובן נפגע מאוד מ3 חודשיים ללא פעילות סדירה.
    אז אם יש לכם אופנוע ואתם צריכים ציוד רכיבה תעיפו מבט באתר שלי  ,מומלץ לתקשר איתי בוואצפ לגבי מלאי.
    ואם אין לכם אופנוע ואתם אוהבים לקרוא תציצו בספרים שלי הם זמינים לרכישה באתר שלי יש שם מגוון וכל אחד יכול למצוא ספר להתחבר אליו.`,
    items: [
      { type: 'phone', text: '0549245898' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send?phone=972549245898',
      },
      { type: 'link', url: 'https://alonzeira.com/', text: '24ride.online' },
    ],
  },
  {
    items: [
      { type: 'phone', text: '0559823040' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send?phone=972559823040',
      },
      {
        type: 'link',
        url: 'https://www.instagram.com/hayot.bar/',
        text: 'Instagram',
      },
    ],
    imgUrl: 'independant2.jpeg',
    title: 'ניתאי קורן',
    description:
      'היי זה ניתאי, הבעלים של חיות בר. כל מי שמכיר אותי יודע שהקדשתי כל שנייה בשנתיים האחרונות, בשביל להפוך אותו לבר הכי שמח, מזמין ומרים שיכול להיות, וזה אכן קרה. ב 07.10 התייצבתי להגן על המדינה ואני מודה על כל רגע שעשיתי את זה, ועדיין עושה. אבל אני שמח לבשר לכם שמהיום, חיות בר חוזרים לעבוד. העסק נפגע קשה כלכלית בתקופה הזו, ועכשיו זו ההזדמנות שלנו לפרוח מחדש. עכשיו רק צריך אתכם. אנחנו זמינים ומחכים להגיע לאירוע שלכם, לתת לכם את שירותי הבר הכי מקצועיים, אדיבים ועם החיוכים הכי גדולים שפגשתם מעולם. אנחנו מציעים: סדנאות קוקטיילים, בר אקטיבי לחתונות, בר קוקטיילים לאירועי חברה ואירועים פרטיים, בר קפה ועוד ועוד. אנחנו כאן, כדי להגשים לכם ויחד אתכם, אירועים מהחלומות.',
  },
  {
    title: 'אלברט לוי',
    imgUrl: 'independant3.jpeg',
    description: `אני אלברט לוי יש לי סטודיו לאומנות משגעת, אני יוצר אומנות ייחודית וצבעונית לבתים פרטיים ומשרדים,
     אחרי תקופה ארוכה של יותר מ-100 ימים בצבא חזרתי לפעילות עם החץ המכוון שלי - להכניס צבעים ואנרגיות לחיים שלכם ♥️.
     בקרו אותי באתר האינטרנט וברשתות החברתיות 🫶🏽`,
    items: [
      {
        type: 'whatsapp',
        url: 'https://wa.me/message/CDRZX7RREV5UP1',
      },
      {
        type: 'link',
        url: 'https://www.instagram.com/albertlevyart/',
        text: 'Instagram',
      },
      {
        type: 'link',
        url: 'https://albertleviart.co.il',
        text: 'albertleviart.co.il',
      },
    ],
  },
  {
    title: 'ערן שפיגל',
    imgUrl: 'eran_shpigel1.jpg',
    description: (
      <div>
        שמי ערן שפיגל נשוי+3 מתל מונד, אני מילואימניק של יחידת מגלן מחטיבת
        הקומנדו מגויס בצו 8 מה 15.11 עד עצם היום הזה בעלים של
        חברת YOOZ ,קמעונאית מתפתחת של מוצרים ברי קיימא המציע אלטרנטיבות חדשות
        ונגישות Reuse as a lifestyle תכירו את YOOZ, ה-A-List של הרב-פעמי. זהו
        מותג חדש שיאפשר לכם להיפרד ללא מאמץ מההרגלים הישנים, וליהנות מרב-פעמי
        איכותי מקום אחד שבו יש את כל מה שאתם צריכים כדי לאמץ לעצמכם לייפסטייל
        סביבתי בפשטות. <br />
        <br />
        <div
          dir="ltr"
          style={{
            direction: 'ltr',
            justifyContent: 'flex-end',
            display: 'flex',
            width: '100%',
            gap: 4,
            flexDirection: 'column',
          }}
        >
          <a
            href="https://www.facebook.com/yoozit.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a href="mailto:office@yoozit.co">Email</a>
        </div>
      </div>
    ),
    items: [
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send?phone=972504019777',
      },
      {
        type: 'link',
        url: 'http://www.yoozit.co/',
        text: 'www.yoozit.co',
      },
      {
        type: 'link',
        url: 'https://www.instagram.com/yoozit.co/',
        text: 'Instagram',
      },
    ],
  },
]

export default data
