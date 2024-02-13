import NewsFeedItem from "./NewsFeedItem";
import { feed } from "./feed";

const NewsFeed = () => {
  return (
    <div className={`flex w-full flex-col items-center px-8`}>
      <div className={`mb-6 text-2xl font-bold`}>עדכונים שוטפים:</div>
      <div className={`flex w-full flex-col items-center gap-8`}>
        {feed.map((item, i) => (
          <NewsFeedItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
