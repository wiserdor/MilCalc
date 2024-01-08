import styles from './Disclaimer.module.css'

const Disclaimer = () => {
  return (
    <div className={styles.disclaimer}>
      <div>
        <div className={styles.disclaimerTitle}>
          <img src="/svg/heart.svg" />
          הערה חשובה
        </div>
        המחשבון מבוסס על{' '}
        <a
          href="https://go.idf.il/q7h7s8e8p4"
          target="_blank"
          rel="noopener noreferrer"
        >
          נתוני המענקים שפורסמו מטעם צה״ל
        </a>
        . אין האמור במחשבון כל הבטחה לקבלת הסכום מהמדינה. ממליצים להשתמש בשביל
        לקבל הערכה גסה על מה צפוי בהנחה והכל יאושר ע״י מקבלי ההחלטות.
      </div>
    </div>
  )
}

export default Disclaimer
