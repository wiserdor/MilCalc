import OneZeroLogo from "@/svg/OneZeroLogo";
import ReactGA from "react-ga4";

const trackLinkClick = () => {
  ReactGA.event({
    category: "click_onezero_link",
    action: `click_onezero-banner_click`
  });
};

const OneZeroAd = () => {
  return (
    <section className="pb-8 pt-6">
      <div className="mb-6 flex items-center justify-center gap-4">
        <OneZeroLogo />
        <span className="text-xl font-normal text-dark-gray">+</span>
        <img src="/svg/calculator.svg" alt="calculator" />
      </div>
      <a
        href="https://onezero.onelink.me/kAPm/jhwlrk3m"
        target="_blank"
        rel="noreferrer"
        onClick={trackLinkClick}
      >
        <img
          src="/ads/onezerobanner1.png"
          alt="onezero"
          className="rounded-2xl"
        />
      </a>
    </section>
  );
};

export default OneZeroAd;
