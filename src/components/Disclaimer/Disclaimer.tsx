import styles from './Disclaimer.module.css'

const Disclaimer = () => {
  const idfInfoLink =
    'https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/'

  return (
    <div
      className={`${styles.disclaimer} px-2 py-3 leading-snug gap-2 text-dark-gray my-6 flex flex-col font-normal bg-ocean  `}
    >
      <div
        className={`${styles.disclaimerTitle} items-center flex font-semibold`}
      >
        <img src="/svg/heart.svg" />
        הערה חשובה
      </div>
      <div>
        המחשבון מבוסס על{' '}
        <a
          className="text-blue"
          href={idfInfoLink}
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
