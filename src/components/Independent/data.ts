const data: {
  title: string
  imgUrl: string
  description: string
  links: {
    url: string
    text: string
  }[]
  phone: string
}[] = [
  {
    title: 'אלון זעירה',
    imgUrl: 'zeira.jpeg',
    description: `אחרי 104 ימים ברגשות מעורבים כי המשימה עדיין לא הושלמה,השתחררתי ממילואים נכון לעכשיו.
    העסק כמובן נפגע מאוד מ3 חודשיים ללא פעילות סדירה.
    אז אם יש לכם אופנוע ואתם צריכים ציוד רכיבה תעיפו מבט באתר שלי  ,מומלץ לתקשר איתי בוואצפ לגבי מלאי.
    ואם אין לכם אופנוע ואתם אוהבים לקרוא תציצו בספרים שלי הם זמינים לרכישה באתר שלי יש שם מגוון וכל אחד יכול למצוא ספר להתחבר אליו.`,
    links: [
      {
        url: 'https://24ride.online/',
        text: '24ride.online',
      },
      {
        url: 'https://alonzeira.com/',
        text: 'alonzeira.com',
      },
    ],
    phone: '0549245898',
  },
]

export default data
