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
    <div className="mb-2 flex flex-col gap-3">
      <a
        href="https://familybiz.onelink.me/kr4R/vhlaa7g0"
        target="_blank"
        rel="noreferrer"
        onClick={trackLinkClick}
      >
        <img src="familybiz.png" alt="family biz" />
      </a>
      <RiseupBanner />
    </div>
  );
};

export default AdsSection;
