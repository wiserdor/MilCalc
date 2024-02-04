import styles from './Disclaimer.module.css'

const Disclaimer = () => {
  const idfInfoLink =
    'https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/'
  return (
    <div className={styles.disclaimer}>
      <div className={styles.disclaimerTitle}>
        <img src="/svg/heart.svg" />
        הערה חשובה
      </div>
      <div>
        המחשבון מבוסס על{' '}
        <a href={idfInfoLink} target="_blank" rel="noopener noreferrer">
          נתוני המענקים שפורסמו מטעם צה״ל
        </a>
        . איננו יכולים להתחייב שתקבלו את הסכום מהמדינה. האחריות בשימוש במחשבון
        על המשתמש בלבד .
      </div>
    </div>
  )
}

export default Disclaimer
