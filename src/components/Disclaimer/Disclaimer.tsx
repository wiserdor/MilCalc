const Disclaimer = () => {
  const idfInfoLink =
    "https://www.miluim.idf.il/articles-list/מגוייסים-למילואים/";

  return (
    <div
      className={`my-6 flex flex-col gap-2 rounded-xl bg-ocean px-3 py-3 font-normal leading-snug text-dark-gray  `}
    >
      <div className={`flex items-center text-base font-semibold text-black`}>
        <img className="ml-1 h-4 w-4" src="/svg/heart.svg" />
        הערה חשובה
      </div>
      <div>
        המחשבון מבוסס על{" "}
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
  );
};

export default Disclaimer;
