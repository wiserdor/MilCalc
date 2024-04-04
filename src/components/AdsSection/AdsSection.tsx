import RiseupBanner from "../RiseupBanner/RiseupBanner";
import ReactGA from "react-ga4";

const trackLinkClick = () => {
  ReactGA.event({
    category: "Link",
    action: "familybiz_banner_click",
    label: "familybiz_banner_click"
  });
};

const AdsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-5 text-2xl font-bold">הטבה מיוחדת למשתמשי המחשבון</h2>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16
            }}
          >
            <img src="familybiz-logo.png" width={38} alt="familybiz" />
            <span style={{ color: "#6F6F6F", fontSize: 24 }}>+</span>
            <img src="/svg/calculator.svg" alt="calculator" />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-base font-semibold">
              מנוי בסיסי בחינם ו ₪100 מתנה במנוי הפרימיום
            </div>
            <a
              href="https://familybiz.onelink.me/kr4R/vhlaa7g0"
              target="_blank"
              rel="noreferrer"
              onClick={trackLinkClick}
            >
              <img src="familybiz.png" alt="family biz" />
            </a>
          </div>
        </div>
        <RiseupBanner />
      </div>
    </div>
  );
};

export default AdsSection;
