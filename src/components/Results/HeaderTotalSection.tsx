import ArrowDown from '../../svg/ArrowDown'
import Money from '../../svg/Money'
import Voucher from '../../svg/Voucher'

const HeaderTotalSection = (props: {
  totalCompensation: number
  totalVoucher: number
}) => {
  const { totalCompensation, totalVoucher } = props
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          backgroundColor: '#528322',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: ' 100%',
          paddingBlock: 16,
          borderRadius: 16,
          gap: 8,
        }}
      >
        <Money strokeColor="white" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>תגמולים ומענקים</div>
          <div
            style={{ fontWeight: 700 }}
          >{`₪${totalCompensation.toLocaleString('he-IL')}`}</div>
        </div>
        <ArrowDown strokeColor="white" />
      </div>
      <div
        style={{
          backgroundColor: '#0066FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: ' 100%',
          paddingBlock: 16,
          borderRadius: 16,
          gap: 8,
        }}
      >
        <Voucher strokeColor="white" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>שוברים וסיוע</div>
          <div style={{ fontWeight: 700 }}>{`₪${totalVoucher.toLocaleString(
            'he-IL'
          )}`}</div>
        </div>
        <ArrowDown strokeColor="white" />
      </div>
    </div>
  )
}

export default HeaderTotalSection
