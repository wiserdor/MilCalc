import BuyMeACoffeeButton from '../DonateButtons/BMACButton'
import PaypalDonateButton from '../DonateButtons/PaypalDonateButton'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={`${styles.footer} font-normal mt-6 p-4 text-center`}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 6,
        }}
      >
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

        <BuyMeACoffeeButton />
        <PaypalDonateButton />

        <div
          style={{
            color: 'white',
            fontSize: 14,
            width: '18rem',
            textAlign: 'center',
          }}
        >
          נשמח לשמוע מכם בכל נושא שקשור למחשבון זה. ניתן ליצור קשר במייל:
          <a style={{ color: 'white' }} href="mailto:yslook7@gmail.com">
            yslook7@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer
