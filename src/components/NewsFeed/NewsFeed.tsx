import style from './NewsFeed.module.css'
import NewsFeedItem from './NewsFeedItem'
import { feed } from './feed'

const NewsFeed = () => {
  return (
    <div className={style.newsFeed}>
      <div className={style.newsFeedTitle}>עדכונים שוטפים:</div>
      <div className={style.newsFeedList}>
        {feed.map((item, i) => (
          <NewsFeedItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}

export default NewsFeed
