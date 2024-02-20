import OneZeroLogo from "@/svg/OneZeroLogo";
import { useFeatureValue } from "@growthbook/growthbook-react";
import ReactGA from "react-ga4";

const trackLinkClick = (abVariant: string) => {
  ReactGA.event({
    category: "click_onezero_link",
    action: `click_onezero-banner_click-${abVariant}`,
    label: abVariant
  });
};

const getOneZeroLink = (abVariant: string) => {
  if (abVariant === "best") {
    return "https://onezero.onelink.me/kAPm/ru42egxt";
  }
  return "https://onezero.onelink.me/kAPm/jhwlrk3m";
};

const getOneZeroImage = (abVariant: string) => {
  if (abVariant === "best") {
    return "/ads/onezerobanner2.png";
  }
  return "/ads/onezerobanner1.png";
};

const OneZeroAd = () => {
  const abVariant = useFeatureValue("onezero-banner", "thailand");

  return (
    <section className="pb-8 pt-6">
      <div className="mb-6 flex items-center justify-center gap-4">
        <OneZeroLogo />
        <span className="text-xl font-normal text-dark-gray">+</span>
        <img src="/svg/calculator.svg" alt="calculator" />
      </div>
      <a
        href={getOneZeroLink(abVariant)}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackLinkClick(abVariant)}
      >
        <img
          src={getOneZeroImage(abVariant)}
          alt="onezero"
          className="rounded-2xl"
        />
      </a>
    </section>
  );
};

export default OneZeroAd;
