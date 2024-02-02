import ReactGA from 'react-ga4'

const WeaccelerateAd = () => {
  const trackLinkClick = (linkName: string) => {
    ReactGA.event({
      category: 'Link',
      action: linkName,
      label: linkName,
    })
  }

  return (
    <div
      style={{
        paddingBlock: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
      }}
    >
      <h2>השתחררתם מהמילואים?</h2>
      <div style={{ fontSize: 14, fontWeight: 400, textAlign: 'center' }}>
        אם אתם מרגישים שאתם לא בטוחים לגבי העתיד ההכשרה העסקית הזו בדיוק
        בשבילכם.{' '}
        <span style={{ fontWeight: 600, lineHeight: 1.2, fontSize: 16 }}>
          בונוס פגישת ייעוץ אסטרטגית בשווי 500 ש״ח במתנה.
        </span>
      </div>
      <a
        href="https://weccelerate.as7.co.il/weccelerate_idf/"
        target="_blank"
        rel="noreferrer"
        onClick={() => trackLinkClick('Weaccelerate')}
      >
        <img width="100%" src="/ads/weCcelerate.png" />
      </a>
    </div>
  )
}

export default WeaccelerateAd
