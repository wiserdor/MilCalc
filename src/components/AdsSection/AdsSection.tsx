import OneZeroAd from "../OneZero/OneZeroAd";
import RiseupBanner from "../RiseupBanner/RiseupBanner";
import WeaccelerateAd from "../WeaccelerateAd/WeaccelerateAd";
import useGetQueryParams from "../common/hooks/useGetQueryParams";

const AdsSection = () => {
  const isOneZero = useGetQueryParams().get("onezero") === "true";

  if (isOneZero) return <OneZeroAd />;

  return (
    <>
      <WeaccelerateAd />
      <RiseupBanner />
    </>
  );
};

export default AdsSection;
