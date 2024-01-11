import style from './BMACButton.module.css'

const BuyMeACoffeeButton = () => {
  return (
    <a
      className={style.buyButton}
      target="_blank"
      href="https://www.buymeacoffee.com/dorwiser"
    >
      <img
        className={style.coffeeImage}
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span className={style.coffeeButtonText}>קנו לנו פק״ל קפה</span>
    </a>
  )
}

export default BuyMeACoffeeButton
