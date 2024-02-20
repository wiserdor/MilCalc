import LinoyCarousel from "./LinoyCarousel";

const LinoySection = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-ocean py-6 text-center">
      <div className="mb-2 text-sm font-normal text-dark-gray">
        בשיתוף עם לינוי סלוק
      </div>
      <h3 className="mb-4 w-64 text-lg font-bold leading-5">
        למידע מורחב על שוברי הסיוע, צפו בסרטוני ההסבר שלנו:
      </h3>
      <LinoyCarousel />
    </div>
  );
};

export default LinoySection;
