import style from './style/NewsFeedItem.module.css'
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
      <div className={`${style.newsFeedItem} items-center cursor-pointer flex flex-col w-full`}>
        <div className={`${style.imageWrapper} rounded-lg overflow-hidden relative text-center w-full`}>
          <img src={props.imageUrl} alt={props.title} className='h-full w-full' />
        </div>
        <div className={style.title}>{props.title}</div>
      </div>
      <div className={`${style.divider} mt-4 w-full`} />
    </a>
  );
}

export default NewsFeedItem
