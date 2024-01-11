import BuyMeACoffeeButton from '../BMACButton/BMACButton'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="contact-us">
        <BuyMeACoffeeButton />
        <p>
          נשמח לשמוע מכם בכל נושא שקשור למחשבון זה. ניתן ליצור קשר במייל:
          <a href="mailto:yslook7@gmail.com">yslook7@gmail.com</a>
        </p>

        <div style={{ marginTop: 32 }}>מתכנתים? תרמו למיזם {'-->  '} </div>
        <div>
          <a
            href="https://github.com/wiserdor/MilCalc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div>/https://github.com/wiserdor/MilCalc</div>
              <img
                width={24}
                height={24}
                src="/svg/github-mark.svg"
                alt="github"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
