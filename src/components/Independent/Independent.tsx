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
    <div className={style.independent}>
      <div className={style.header}>
        <h2 className={style.title}>העסק של מילואימניק</h2>
        <div className={style.subtitle}>
          חשוב לנו לעזור לעצמאיים שהעסק שלהם נפגע בעקבות המלחמה. רוצים להופיע?
          דברו איתנו במייל:{' '}
          <a href="mailto:yslook7@gmail.com">yslook7@gmail.com</a>
        </div>
      </div>
      <div className={style.imgContainer}>
        <img className={style.img} src={`/independent/${imgUrl}`} />
      </div>
      <h3 className={style.business}>{title}</h3>
      <div className={style.description}>{description}</div>
      <div className={style.links}>
        אתר העסק:{' '}
        {links.map((link) => (
          <div key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={style.link}
            >
              {link.text}
            </a>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <div>טלפון: </div>
          <a href={`tel:${phone}`} className={style.phone}>
            {toPhoneString(phone)}
            <span style={{ fontSize: 18 }}>{'  '}📞 </span>
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <div>וואטסאפ: </div>
          <a
            href={`https://api.whatsapp.com/send?phone=972${phone.substring(
              1
            )}`}
          >
            <img
              src="/svg/whatsapp.svg"
              width={30}
              className={style.whatsapp}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Independent
