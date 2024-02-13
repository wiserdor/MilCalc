import BuyMeACoffeeButton from "../DonateButtons/BMACButton";
import PaypalDonateButton from "../DonateButtons/PaypalDonateButton";

const Footer = () => {
  return (
    <footer className={`mt-6 bg-[#395712] p-4 text-center text-sm font-normal`}>
      <div className="flex flex-col items-center justify-center gap-[6px]">
        <div className="mb-3 text-sm font-bold text-white">לתרומה למיזם:</div>

        <BuyMeACoffeeButton />
        <PaypalDonateButton />

        <div className="w-72 text-center text-white">
          נשמח לשמוע מכם בכל נושא שקשור למחשבון זה. ניתן ליצור קשר במייל:
          <a className="text-white" href="mailto:yslook7@gmail.com">
            yslook7@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
