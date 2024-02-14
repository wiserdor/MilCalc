import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";

export interface NonApprovedItemProps {
  name: string;
  totalCompensation: number;
  totalCompensationStr?: string | JSX.Element;
  description?: string;
  nonDirectMoney?: boolean;
  isMoney?: boolean;
  dateOfPayment?: Date;
  link?: { text: string; url: string };
  idfLink?: string;
}

const Tooltip = (props: {
  text: string;
  link?: NonApprovedItemProps["link"];
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <img
          className="cursor-pointer"
          src="/svg/circle-exclamation.svg"
          alt="exclamation"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div
          className={`flex flex-col items-center bg-white px-4 py-2 text-sm font-normal text-dark-gray`}
        >
          <div className="w-fit">{props.text}</div>
          {props.link && (
            <div className="mt-2">
              <a
                className="text-blue"
                href={props.link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.link.text}
              </a>
            </div>
          )}
          <PopoverArrow fill="white" />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ResultItem = (props: NonApprovedItemProps) => {
  const {
    name,
    totalCompensation,
    totalCompensationStr,
    description,
    nonDirectMoney = false,
    isMoney = true,
    link,
    idfLink,
  } = props;
  return (
    <div
      className={`flex flex-col items-center justify-between rounded-lg border-[1.5px] border-dashed border-[#ccc] bg-ocean px-2 py-4 text-center text-sm font-normal`}
    >
      <div className={`flex flex-col items-center justify-start gap-[2px]`}>
        {isMoney && (
          <div className="text-dark-gray">
            {totalCompensationStr ? (
              totalCompensationStr
            ) : (
              <div>
                <span className="text-dark-gray">
                  {nonDirectMoney ? "בשווי" : ""}
                </span>{" "}
                <span className="font-bold text-black">
                  ₪{totalCompensation.toLocaleString("he-IL")}
                </span>
              </div>
            )}
          </div>
        )}
        <a
          className="text-blue underline"
          href={idfLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>{name}</div>
        </a>
      </div>
      {description && <Tooltip text={description} link={link} />}
    </div>
  );
};

export default ResultItem;
