import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share'
import Disclaimer from '../Disclaimer/Disclaimer'
import styles from './Header.module.css'

const SHARE_MESSAGE =
  'המענקים למילואימניקים אושרו בממשלה! כנסו למחשבון לבדוק לכמה אתם זכאים:'
const SHARE_URL = 'https://miluimnik.info'

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
        <img src="/svg/time.svg" /> עדכון אחרון: {getLastModified()}
      </p>

      <div className={styles.logo}>
        <img src="/svg/calculator.svg" alt="מחשבון מענקים" />
      </div>
      <div className={styles.pageTitle}>מחשבון מענקי מילואים</div>
      <div className={styles.subTitle}>
        <img src="/svg/swords.svg" />
        {' מלחמת חרבות ברזל '} <img src="/svg/swords.svg" />
      </div>
      <div className={styles.share}>
        <div>שתפו:</div>
        <WhatsappShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <TelegramShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <FacebookShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
          <XIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
      {/* <div className={styles.importantNotice}>
        <div>⚠️</div>
        היי חברים מילואימניקים, שוב יצאה אגרת חדשה ולכן ייתכנו אי דיוקים... אנו
        עובדים לעדכן את המחשבון עם הפרטים החדשים בהקדם האפשרי.
      </div> */}
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
