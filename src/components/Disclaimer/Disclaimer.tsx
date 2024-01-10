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
          href="https://usms.cellcom.co.il/files/QEIKC4/khscgxsw2z.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          נתוני המענקים שפורסמו מטעם צה״ל
        </a>
        . אין האמור במחשבון כל הבטחה לקבלת הסכום מהמדינה.
      </div>
    </div>
  )
}

export default Disclaimer
