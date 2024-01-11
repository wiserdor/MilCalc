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
        . איננו יכולים להתחייב שתקבלו את הסכום מהמדינה. האחריות בשימוש במחשבון
        על המשתמש בלבד .
      </div>
    </div>
  )
}

export default Disclaimer
