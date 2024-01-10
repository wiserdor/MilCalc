import ReactGA from 'react-ga4'

const RiseupBanner = () => {
  const trackLinkClick = (linkName: string) => {
    ReactGA.event({
      category: 'Link',
      action: 'Click',
      label: linkName,
    })
  }

  return (
    <div
      style={{
        marginTop: 16,
        paddingBlock: 24,
        borderBlock: '2px solid #dce4ee',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
        fontWeight: 400,
      }}
    >
      <div>
        רייזאפ, שירות דיגיטלי שיתן לכם ודאות כלכלית, אפילו בימים כל כך חסרי
        ודאות. <br />
        <br />
        הטבה מיוחדת למשתמשי המחשבון:
        <br />
        <div style={{ fontWeight: 500 }}>
          חודש ראשון חינם ו50% הנחה על החודש השני והשלישי.
        </div>
      </div>
      <a
        href="https://landing.riseup.co.il/wnd_slider_v3/?promoCode=FacebookGroup&utm_source=facebookgroup_model&utm_medium=social&utm_campaign=ru_facebookgroup&utm_content=miluimnik"
        onClick={() => trackLinkClick('Riseup')}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img height="100%" width="100%" src="riseup.jpg" alt="Riseup" />
      </a>
    </div>
  )
}

export default RiseupBanner
