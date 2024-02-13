import ReactGA from "react-ga4";

const WeaccelerateAd = () => {
  const trackLinkClick = (linkName: string) => {
    ReactGA.event({
      category: "Link",
      action: linkName,
      label: linkName,
    });
  };

  return (
    <div
      style={{
        paddingBlock: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 16,
      }}
    >
      <h2 className="text-2xl font-bold">השתחררתם מהמילואים?</h2>
      <div className="text-center text-sm font-normal">
        אם אתם מרגישים שאתם לא בטוחים לגבי העתיד ההכשרה העסקית הזו בדיוק
        בשבילכם.{" "}
        <span className="text-base font-semibold leading-tight">
          בונוס פגישת ייעוץ אסטרטגית בשווי 500 ש״ח במתנה.
        </span>
      </div>
      <a
        href="https://weccelerate.as7.co.il/weccelerate_idf/"
        target="_blank"
        rel="noreferrer"
        onClick={() => trackLinkClick("Weaccelerate")}
      >
        <img width="100%" src="/ads/weCcelerate.png" />
      </a>
    </div>
  );
};

export default WeaccelerateAd;
