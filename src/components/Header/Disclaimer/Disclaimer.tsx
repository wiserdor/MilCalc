import styles from './Disclaimer.module.css'

const Disclaimer = () => {
  return (
    <div className={styles.disclaimer}>
      <div>
        <div className={styles.disclaimerTitle}>הערה חשובה</div>
        המחשבון מבוסס על{' '}
        <a href="https://usms.cellcom.co.il/files/QEIKC4/nvxy0yv36s.pdf?ISPN=_BK2te&CustomerId=1060534&ProjectId=127109&Domain=l5k.me&Key=5JDBX&MessageId=0&CampaignId=SIF0KNZHAX59I5A5">
          נתוני המענקים שפורסמו מטעם צה״ל
        </a>
        . אין האמור במחשבון כל הבטחה לקבלת הסכום מהמדינה. ממליצים להשתמש בשביל
        לקבל הערכה גסה על מה צפוי בהנחה והכל יאושר ע״י מקבלי ההחלטות.
      </div>
    </div>
  )
}

export default Disclaimer
