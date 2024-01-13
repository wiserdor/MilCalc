const PaypalDonateButton = () => {
  return (
    <a
      href="https://www.paypal.com/donate/?hosted_button_id=MQQHSCERYJ7JW"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        style={{
          backgroundColor: '#ffc439',
          color: '#2C2E2F',
          borderRadius: '12px',
          width: 'max-content',
          height: 20,
          cursor: 'pointer',
          padding: '8px',
          gap: 4,
          whiteSpace: 'nowrap',
          display: 'flex',
          fontWeight: 500,
        }}
      >
        תרמו דרך{' '}
        <img src="/svg/paypal.svg" alt="paypal" width={64} height={64} />{' '}
      </div>
    </a>
  )
}

export default PaypalDonateButton
