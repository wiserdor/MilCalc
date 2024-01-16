import styles from './Disclaimer.module.css'

const Disclaimer = () => {
  const idfInfoLink =
    'https://www.miluim.idf.il/articles-list/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A0%D7%A7%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A8%D7%AA%D7%99-%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9D-%D7%91%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%A8%D7%91%D7%95%D7%AA-%D7%91%D7%A8%D7%96%D7%9C/'
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
