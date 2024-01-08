import Disclaimer from './Disclaimer/Disclaimer'
import styles from './Header.module.css'

export const dateToString = (date: Date) => {
  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    // add leading zero if minutes is less than 10
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes()
  )
}

const Header = () => {
  const getLastModified = () => {
    const lastModified = new Date(document.lastModified)
    return dateToString(lastModified)
  }

  return (
    <div className={styles.header}>
      <p className={styles.lastUpdated}>🕑 עדכון אחרון: {getLastModified()}</p>
      <div className={styles.logo}></div>
      <div className={styles.pageTitle}>מחשבון מענקים ״מגויסים למילואים״</div>
      <div className={styles.subTitle}>מלחמת חרבות ברזל</div>
      <div className={styles.importantNotice}>
        ברגעים אלו אנו מעדכנים את המחשבון בהתאם לאישורי הממשלה. ממליצים להיכנס
        שוב ולהתעדכן מחר
      </div>
      <p className={styles.descriptionIntro}>
        בעזרת מחשבון זה תוכלו לחשב מה צפויים להיות המענקים שתקבלו מהמדינה עבור
        שירות המילואים במלחמת חרבות ברזל.
      </p>
      <Disclaimer />
      <div className={styles.descriptionBold}>
        רוצים לדעת כמה מגיע לכם/ן? בדקו עכשיו:
      </div>
      <div className={styles.descriptionFill}>אנא מלאו את הפרטים הבאים:</div>
    </div>
  )
}

export default Header
