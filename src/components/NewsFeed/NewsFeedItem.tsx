import style from './NewsFeedItem.module.css'
export interface NewsFeedItemProps {
  title: string
  link: string
  imageUrl: string
  description?: string
  date?: Date
}

const NewsFeedItem = (props: NewsFeedItemProps) => {
  return (
    <a href={props.link} target="_blank" rel="noreferrer">
      <div className={style.newsFeedItem}>
        <div className={style.imageWrapper}>
          <img src={props.imageUrl} alt={props.title} className={style.image} />
        </div>
        <div className={style.title}>{props.title}</div>
      </div>
      <div className={style.divider}></div>
    </a>
  )
}

export default NewsFeedItem
