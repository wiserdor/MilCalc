import ReactGA from "react-ga4";

const RiseupBanner = () => {
  const trackLinkClick = (linkName: string) => {
    ReactGA.event({
      category: "Link",
      action: "Click",
      label: linkName
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
        gap: 16
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 8
        }}
      >
        <img src="/svg/riseup.svg" alt="riseup" />
        <span style={{ color: "#6F6F6F", fontSize: 24 }}>+</span>
        <img src="/svg/calculator.svg" alt="calculator" />
      </div>
      <div style={{ fontWeight: 600, lineHeight: 1.2, fontSize: 16 }}>
        חודש ראשון חינם ו50% הנחה על החודש השני והשלישי.
      </div>
      <a
        href="https://landing.riseup.co.il/wnd_slider_v3/?promoCode=FacebookGroup&utm_source=facebookgroup_model&utm_medium=social&utm_campaign=ru_facebookgroup&utm_content=miluimnik"
        onClick={() => trackLinkClick("Riseup")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img height="100%" width="100%" src="riseup-new.jpeg" alt="Riseup" />
      </a>
    </div>
  );
};

export default RiseupBanner;
