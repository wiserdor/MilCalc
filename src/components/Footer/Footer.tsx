import BuyMeACoffeeButton from '../DonateButtons/BMACButton'
import PaypalDonateButton from '../DonateButtons/PaypalDonateButton'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <div
          style={{
            color: 'white',
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          לתרומה למיזם:
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <BuyMeACoffeeButton />
          <PaypalDonateButton />
        </div>
        <p
          style={{
            color: 'white',
            fontSize: 14,
          }}
        >
          נשמח לשמוע מכם בכל נושא שקשור למחשבון זה. ניתן ליצור קשר במייל:
          <a style={{ color: 'white' }} href="mailto:yslook7@gmail.com">
            yslook7@gmail.com
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
