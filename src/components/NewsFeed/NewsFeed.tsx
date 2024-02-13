import style from './style/NewsFeed.module.css'
import NewsFeedItem from './NewsFeedItem'
import { feed } from './feed'

const NewsFeed = () => {
  return (
    <div className={`${style.newsFeed} items-center flex flex-col w-full`}>
      <div className={`${style.newsFeedTitle} font-bold mb-6`}>עדכונים שוטפים:</div>
      <div className={`${style.newsFeedList} items-center flex flex-col w-full`}>
        {feed.map((item, i) => (
          <NewsFeedItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default NewsFeed
