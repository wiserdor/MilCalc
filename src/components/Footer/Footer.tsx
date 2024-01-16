import BuyMeACoffeeButton from '../DonateButtons/BMACButton'
import PaypalDonateButton from '../DonateButtons/PaypalDonateButton'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="contact-us">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BuyMeACoffeeButton />
          <PaypalDonateButton />
        </div>
        <p>
          נשמח לשמוע מכם בכל נושא שקשור למחשבון זה. ניתן ליצור קשר במייל:
          <a href="mailto:yslook7@gmail.com">yslook7@gmail.com</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
