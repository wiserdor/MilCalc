import Disclaimer from '../Disclaimer/Disclaimer'
import StickyHeader from '../StickyHeader/StickyHeader'

export const dateToString = (date: Date) => {
  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    // add leading zero if minutes is less than 10
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes()
  )
}

const Header = () => {
  const getLastModified = () => {
    const lastModified = new Date(document.lastModified)
    return dateToString(lastModified)
  }

  return (
    <div className="items-center flex flex-col justify-center">
      <StickyHeader />

      <div
        className={`text-sm gap-1 px-3 py-2 bg-ocean text-idf items-center rounded-lg flex justify-center mb-8 mt-4 text-center w-fit`}
      >
        <img src="/svg/time.svg" /> עדכון אחרון: {getLastModified()}
      </div>

      <div className={`flex justify-center fill-[#28a745] text-center w-full`}>
        <img src="/svg/calculator.svg" alt="מחשבון מענקים" />
      </div>
      <div
        className={`leading-none text-[28px] font-extrabold text-center mt-2`}
      >
        מחשבון מענקי מילואים
      </div>
      <div
        className={`gap-1 text-idf text-base items-center flex font-semibold justify-center w-full`}
      >
        <img src="/svg/israel.svg" />
        {' מלחמת חרבות ברזל '}
      </div>
      <p className={`leading-5 text-base font-normal text-center mt-3`}>
        בעזרת מחשבון זה תוכלו לחשב מה צפויים להיות המענקים שתקבלו מהמדינה עבור
        שירות המילואים במלחמת חרבות ברזל.
      </p>
      <Disclaimer />
    </div>
  )
}

export default Header
