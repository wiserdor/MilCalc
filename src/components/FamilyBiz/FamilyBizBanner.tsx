import ReactGA from "react-ga4";

const trackLinkClick = () => {
  ReactGA.event({
    category: "Link",
    action: "familybiz_banner_click",
    label: "familybiz_banner_click"
  });
};

const FamilyBizBanner = () => {
  return (
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
          מנוי בסיסי בחינם ו ₪100 מתנה במנוי הפרימיום.
        </div>
        <div className="text-center text-sm">
          כנסו והזינו את קוד הקופון:{" "}
          <span className="border border-dashed border-black p-1 text-lg">
            be50we
          </span>
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
  );
};

export default FamilyBizBanner;
