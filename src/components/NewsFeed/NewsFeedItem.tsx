export interface NewsFeedItemProps {
  title: string;
  link: string;
  imageUrl: string;
  description?: string;
  date?: Date;
}

const NewsFeedItem = (props: NewsFeedItemProps) => {
  return (
    <a href={props.link} target="_blank" rel="noreferrer">
      <div
        className={`flex w-full cursor-pointer flex-col items-center gap-4 text-black`}
      >
        <div
          className={`shadow-[0 4px 36px rgba(0, 0, 0, 0.1)] relative h-44 w-full overflow-hidden rounded-lg text-center`}
        >
          <img
            src={props.imageUrl}
            alt={props.title}
            className="h-full w-full"
          />
        </div>
        <div className="underline">{props.title}</div>
      </div>
      <div className={`bg-[rgba(0, 0, 0, 0.1)] mt-4 h-[3px] w-full`} />
    </a>
  );
};

export default NewsFeedItem;
