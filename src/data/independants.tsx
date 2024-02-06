const data: {
  title: string
  imgUrl: string
  description: string | JSX.Element
  business?: string
  items: Array<
    | { type: 'phone'; phone: string }
    | { type: 'whatsapp'; url: string }
    | { type: 'link'; url: string }
    | { type: 'facebook'; url: string }
    | { type: 'instagram'; url: string }
    | { type: 'location'; address: string }
    | { type: 'email'; email: string }
  >
}[] = [
  {
    title: 'אלון זעירה',
    imgUrl: 'zeira.jpeg',
    business: '24Ride',
    description: `אחרי 104 ימים ברגשות מעורבים כי המשימה עדיין לא הושלמה,השתחררתי ממילואים נכון לעכשיו.
    העסק כמובן נפגע מאוד מ3 חודשיים ללא פעילות סדירה.
    אז אם יש לכם אופנוע ואתם צריכים ציוד רכיבה תעיפו מבט באתר שלי  ,מומלץ לתקשר איתי בוואצפ לגבי מלאי.
    ואם אין לכם אופנוע ואתם אוהבים לקרוא תציצו בספרים שלי הם זמינים לרכישה באתר שלי יש שם מגוון וכל אחד יכול למצוא ספר להתחבר אליו.`,
    items: [
      { type: 'phone', phone: '0549245898' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send?phone=972549245898',
      },
      { type: 'link', url: 'https://24ride.online/' },
      { type: 'link', url: 'https://alonzeira.com/' },
    ],
  },
  {
    items: [
      { type: 'phone', phone: '0559823040' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send?phone=972559823040',
      },
      {
        type: 'link',
        url: 'https://www.instagram.com/hayot.bar/',
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
    business: 'Albert Levy Art',
    description: `אני אלברט לוי יש לי סטודיו לאומנות משגעת, אני יוצר אומנות ייחודית וצבעונית לבתים פרטיים ומשרדים,
     אחרי תקופה ארוכה של יותר מ-100 ימים בצבא חזרתי לפעילות עם החץ המכוון שלי - להכניס צבעים ואנרגיות לחיים שלכם ♥️.
     בקרו אותי באתר האינטרנט וברשתות החברתיות 🫶🏽`,
    items: [
      {
        type: 'whatsapp',
        url: 'https://wa.me/message/CDRZX7RREV5UP1',
      },
      {
        type: 'instagram',
        url: 'https://www.instagram.com/albertlevyart/',
      },
      {
        type: 'link',
        url: 'https://albertleviart.co.il',
      },
    ],
  },
  {
    title: 'ערן שפיגל',
    imgUrl: 'eran_shpigel1.jpg',
    business: 'YOOZ',
    description: (
      <div>
        שמי ערן שפיגל נשוי+3 מתל מונד, אני מילואימניק של יחידת מגלן מחטיבת
        הקומנדו מגויס בצו 8 מה 15.11 עד עצם היום הזה בעלים של
        חברת YOOZ ,קמעונאית מתפתחת של מוצרים ברי קיימא המציע אלטרנטיבות חדשות
        ונגישות Reuse as a lifestyle תכירו את YOOZ, ה-A-List של הרב-פעמי. זהו
        מותג חדש שיאפשר לכם להיפרד ללא מאמץ מההרגלים הישנים, וליהנות מרב-פעמי
        איכותי מקום אחד שבו יש את כל מה שאתם צריכים כדי לאמץ לעצמכם לייפסטייל
        סביבתי בפשטות.
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
      },
      {
        type: 'instagram',
        url: 'https://www.instagram.com/yoozit.co/',
      },
      {
        type: 'facebook',
        url: 'https://www.facebook.com/yoozit.co',
      },
    ],
  },
  {
    title: 'גאי כהן',
    imgUrl: 'guy_cohen.jpg',
    business: 'NOX Fitness',
    description: `אהלן חברים, אני גאי. 
    בעקבות המילואים נאלצתי לסגור את הסטודיו שלי לאימונים פונקציונלים, אבל החלום לתרום מהידע שלי ולסייע לאנשים לחיות אורך חיים בריא עדיין ממלא לי את הלב והמחשבות. 
    אז בניתי תוכנית אונליין שתתאים לכל הרמות, בציוד מינימלי, שאפשר לעשות גם מהסלון.
    אני מזמין אתכם להצטרף אלי לתוכנית האימונים שלי, שעוזרת לי להרגיש ערני וממוקד יותר, ותשפר את איכות החיים שלכם, בין אם לא הרמתם משקולת מעולם ובין אם אתם מתאמנים קבוע בחדר כושר ומחפשים תכנית מאוזנת ומאתגרת
    `,
    items: [
      { type: 'link', url: 'https://guycohen230.minisite.ms/3' },
      {
        type: 'whatsapp',
        url: 'https://wa.me/message/ZO5VM74JBH7PJ1',
      },
      {
        type: 'instagram',
        url: 'https://www.instagram.com/guy_cohen_nox_fitness?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      },
      { type: 'phone', phone: '0524493008' },
      { type: 'email', email: 'guycohen230@gmail.com' },
    ],
  },
  {
    title: 'שני פלצי',
    business: 'SHANI PALATCHI',
    description: `סטייליסטית ירוקה ובעלת אתר שופינג און ליין לאופנת ויניטג ויד שנייה שמציע אלטרנטיבה ירוקה, בסטייל ובמחיר סופר משתלם .`,
    imgUrl: 'shani_peltsi2.jpg',
    items: [
      { type: 'link', url: 'https://shani-palatchi.co.il/' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send/?phone=972529464172&text=&app_absent=0',
      },
      {
        type: 'facebook',
        url: 'https://www.facebook.com/profile.php?id=100063579283525&mibextid=LQQJ4d',
      },
      { type: 'phone', phone: '0529464172' },
      { type: 'email', email: 'shendi474@gmail.com' },
    ],
  },
  {
    title: 'אלמוג חלק',
    imgUrl: 'almog_halek1.jpg',
    business: 'בומבה לנד הפקות',
    description: `משרת ביחידת במילואים של סיירת גולני מ7.10 ועדיין במילואים..
    עסק של אטרקציות והפקות אירועים מתנפחים לייזר טאג, פיינטבול, השור הזועם ועוד המון אטרקציות שיקפיצו אותכם ויגרמו לכם לזוז ולקפוץ. בכל רחבי הארץ.`,
    items: [
      { type: 'phone', phone: '0586277918' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send/?phone=972586277918',
      },
      { type: 'email', email: 'Almog334@gmail.com' },
    ],
  },
  {
    title: 'זאב אנגל',
    imgUrl: 'zeev_angel1.jpg',
    business: 'אמנות ויודאיקה מעץ טבעי',
    description: `שמי זאב אנגל
    יוצר אמנות ויודאיקה מעץ טבעי
     מעביר בסדנאות מיוחדות לאמנות בעץ
    המשלבות תוכן ייחודי מעולם העץ ויצירה אישית של כל משתתף`,
    items: [
      { type: 'link', url: 'https://moriyajudaica.com/' },
      {
        type: 'facebook',
        url: 'https://m.facebook.com/profile.php/?id=100063662465472',
      },
      { type: 'email', email: 'ze.etzhaim@gmail.com' },
      { type: 'phone', phone: '054-522-0000' },
    ],
  },
  {
    title: 'יוחנן שוורץ',
    description: `שמי יוחנן שוורץ, יועץ משכנתא שמתמחה בליווי מקוון בכל הארץ.
    כל מילואימניק מוסמח לשי יעוץ ראיינת ללא 
    לבדיקת משכנתא קיימת תשלום - רלוונטי גם למשכנתאות חדשות`,
    imgUrl: 'yochanan_shwartz.jpg',
    items: [
      { type: 'phone', phone: '0547328840' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send/?phone=972547328840',
      },
      { type: 'link', url: 'https://hfca.org.il/userprofile/?id=506' },
      { type: 'email', email: 'Jochaschwartz@gmail.com' },
    ],
  },
  {
    title: 'אורן פצ׳יו',
    imgUrl: 'oren_patzio.jpg',
    description: `צ׳יינג׳ להמרת כספים, שליחת כספים לחו״ל ומתן שירותים פיננסים בינלאומיים.`,
    items: [
      { type: 'email', email: 'exchange142@gmail.com' },
      {
        type: 'whatsapp',
        url: 'https://call.whatsapp.com/video/oRPjCR9DD9VF4IBsKrCpfs',
      },
      { type: 'phone', phone: '0545434905' },
    ],
  },
  {
    title: 'יהודה ארזוני',
    imgUrl: 'yehuda_arzoni.jpg',
    business: 'להקת זמרת הארץ - נגינה והפקת ארועים',
    description: `אני יהודה ארזוני, נגן קלרינט ומנהל להקת: 'זמרת הארץ', להקת חתונות מובילה בציבור הדתי.
    לאחר למעלה מ100 ימי מילואים שכללו ביטול ארועים וצורך להביא נגן מחליף במקומי, אני עושה מאמץ לחזור להופיע ולנגן באירועים שלכם: חתונות, בר-מצות, וכל שמחה.
    אנחנו כאן כדי להיות איתכם בשמחה שלכם!
    צפו בנו ביוטיוב ובפייסבוק: 'להקת זמרת הארץ'.
    (בתמונת פרופיל: נגינה לקראת שבת, בהפוגה באימונים בצאלים בתחילת המלחמה)
    `,
    items: [
      { type: 'email', email: 'zimrat123@gmail.com' },
      { type: 'phone', phone: '0585802887' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send/?phone=972585802887',
      },
      {
        type: 'facebook',
        url: 'https://www.facebook.com/profile.php?id=100076068781870',
      },
    ],
  },
  {
    title: 'יצחק לקס',
    imgUrl: 'yitzhak_lax.jpeg',
    business: 'אקסטרים עמק אילון',
    description: `אקסטרים עמק איילון הוא עסק שעושה ימי גיבוש לחברות עסקים ופרטיים שרוצים לעשות אקסטרים ולהתפנק בסטייל.

    אני מגויס משמחת תורה ועד לסיום והעסק מחכה ללקוחות
    בואו ותהנו ממש
    האטרקציות והפינוקים לא קיבלו צו 8 : )`,
    items: [
      { type: 'email', email: 'Laxlogistic@gmail.com' },
      { type: 'phone', phone: '0504470888' },
      {
        type: 'whatsapp',
        url: 'https://api.whatsapp.com/send/?phone=972504470888',
      },
      {
        type: 'facebook',
        url: 'https://www.facebook.com/profile.php?id=100089372007088',
      },
    ],
  },
]

export default data
