import data from './data'
import style from './Independent.module.css'

const toPhoneString = (phone: string) => {
  // add - after the third digit
  const firstPart = phone.substring(0, 3)
  const secondPart = phone.substring(3)
  return `${firstPart}-${secondPart}`
}

const Independent = () => {
  const { title, description, imgUrl, links, phone } = data[0]

  return (
    <div style={{ marginTop: 12, width: '100%' }}>
      <h2 className={style.title}>עצמאים במילואים</h2>
      <div className={style.independent}>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div className={style.imgContainer}>
            <img className={style.img} src={`/independent/${imgUrl}`} />
          </div>
        </div>
        <h3 className={style.business}>{title}</h3>
        <div className={style.description}>{description}</div>
        <div className={style.contact}>
          <a href={`tel:${phone}`}>
            <div className={style.contactColumn}>
              <img src="/svg/phone.svg" width={16} />
              <div>{toPhoneString(phone)}</div>
            </div>
          </a>
          <a
            href={`https://api.whatsapp.com/send?phone=972${phone.substring(
              1
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={style.contactColumn}>
              <img src="/svg/whatsapp.svg" width={16} />
              <div>ווצסאפ</div>
            </div>
          </a>
          <a href={links[0].url} target="_blank" rel="noopener noreferrer">
            <div className={style.contactColumn}>
              <img src="/svg/click.svg" width={16} />
              <div>{links[0].text}</div>
            </div>
          </a>
        </div>
      </div>
      <div className={style.subtitle}>
        חשוב לנו לעזור לעצמאיים שהעסק שלהם נפגע בעקבות המלחמה. רוצים להופיע?
        דברו איתנו במייל:{' '}
        <a href="mailto:yslook7@gmail.com">yslook7@gmail.com</a>
      </div>
    </div>
  )
}

export default Independent
