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
      <p className={styles.lastUpdated}>
        עודכן לאחרונה בתאריך: {getLastModified()}
      </p>
      <h2 className={styles.pageTitle}>
        מחשבון מענקים ״מגויסים למילואים״ - מלחמת חרבות ברזל
      </h2>
      <p className={styles.descriptionIntro}>
        בעזרת מחשבון זה תוכלו לחשב מה צפויים להיות המענקים שתקבלו מהמדינה עבור
        שירות המילואים במלחמת חרבות ברזל.
      </p>
      <Disclaimer />
      <p className={styles.descriptionBold}>
        <b>רוצים לדעת כמה מגיע לכם? בדקו עכשיו בעצמכם!</b>
      </p>
    </div>
  )
}

export default Header
