import Disclaimer from '../Disclaimer/Disclaimer'
import StickyHeader from '../StickyHeader/StickyHeader'
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
      <StickyHeader />

      <div className={styles.lastUpdated}>
        <img src="/svg/time.svg" /> עדכון אחרון: {getLastModified()}
      </div>

      <div className={styles.logo}>
        <img src="/svg/calculator.svg" alt="מחשבון מענקים" />
      </div>
      <div className={styles.pageTitle}>מחשבון מענקי מילואים</div>
      <div className={styles.subTitle}>
        <img src="/svg/israel.svg" />
        {' מלחמת חרבות ברזל '}
      </div>
      <p className={styles.descriptionIntro}>
        בעזרת מחשבון זה תוכלו לחשב מה צפויים להיות המענקים שתקבלו מהמדינה עבור
        שירות המילואים במלחמת חרבות ברזל.
      </p>
      <Disclaimer />
    </div>
  )
}

export default Header
