import Disclaimer from "../Disclaimer/Disclaimer";
import StickyHeader from "../StickyHeader/StickyHeader";

export const dateToString = (date: Date) => {
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    // add leading zero if minutes is less than 10
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes()
  );
};

const Header = () => {
  const getLastModified = () => {
    const lastModified = new Date(document.lastModified);
    return dateToString(lastModified);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <StickyHeader />

      <div className="mb-8 mt-4 flex w-fit items-center justify-center gap-1 rounded-lg bg-ocean px-[10px] py-[5px] text-center text-sm text-idf">
        <img src="/svg/time.svg" /> עדכון אחרון: {getLastModified()}
      </div>

      <div className={`flex w-full justify-center fill-[#28a745] text-center`}>
        <img src="/svg/calculator.svg" alt="מחשבון מענקים" />
      </div>
      <div className="mt-2 text-center text-[28px] font-extrabold leading-none">
        מחשבון מענקי מילואים
      </div>
      <div className="flex w-full items-center justify-center gap-1 text-base font-semibold text-idf">
        <img src="/svg/israel.svg" />
        {" מלחמת חרבות ברזל "}
      </div>
      <p className="mt-3 text-center text-base font-normal leading-5">
        בעזרת מחשבון זה תוכלו לחשב מה צפויים להיות המענקים שתקבלו מהמדינה עבור
        שירות המילואים במלחמת חרבות ברזל.
      </p>
      <Disclaimer />
    </div>
  );
};

export default Header;
