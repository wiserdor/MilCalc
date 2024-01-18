import useIsExperimental from '../common/hooks/useIsExperimental'
import data from './data'
import style from './Independent.module.css'

const Independent = () => {
  const isExperimental = useIsExperimental()

  if (!isExperimental) return null

  const { title, description, imgUrl, links, phone } = data[0]

  return (
    <div className={style.independent}>
      <div className={style.header}>
        <h2 className={style.title}>העסקים של המילואימניקים</h2>
        <div className={style.subtitle}>
          חשוב לנו לעזור לעצמאיים שהעסק שלהם נפגע בעקבות המלחמה. רוצים להופיע?
          דברו איתנו.
        </div>
      </div>
      <div className={style.imgContainer}>
        <img className={style.img} src={`/independent/${imgUrl}`} />
      </div>
      <h3 className={style.business}>{title}</h3>
      <div className={style.description}>{description}</div>
      <div className={style.links}>
        {links.map((link) => (
          <div key={link.url}>
            אתר העסק:{' '}
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
      <div>
        טלפון: <span className={style.phone}>{phone}</span>
      </div>
    </div>
  )
}

export default Independent
