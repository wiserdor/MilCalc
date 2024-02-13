import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties } from "react";
import clsx from "clsx";
import ArrowLeft from "../../svg/ArrowLeft";

export type TimelineEvent = {
  date?: Date;
  totalCompensation?: number;
  name?: string;
  url?: string;
  color?: CSSProperties["color"];
};
export interface TimelineProps {
  events: TimelineEvent[];
}

const TimelineEvent = (props: TimelineEvent & { index: number }) => {
  const { date, totalCompensation = 0, name, color, url, index } = props;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="cursor-pointer">
      <div className={`flex flex-row-reverse items-center justify-end gap-2`}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            exit={{ opacity: 0, x: -50 }}
            className={`flex flex-1 gap-4 text-sm font-normal text-dark-gray`}
          >
            <div className={`flex items-center text-balance`}>
              <div className="font-bold" style={{ minWidth: "7ch" }}>
                {date ? format(date.toISOString(), "dd.MM.yy") : ""}
              </div>
            </div>
            <div className={`flex items-center text-balance`}>
              <div
                className={`rounded px-[10px] py-[6px] text-center text-xs font-bold text-white`}
                style={{ backgroundColor: color, minWidth: "9ch" }}
              >
                ₪
                {totalCompensation.toLocaleString("he-IL", {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div
              className={`flex items-center text-balance`}
              style={{ flexGrow: 1, color }}
            >
              <div>{name}</div>
            </div>
            <div className={`flex items-center text-balance`}>
              <ArrowLeft strokeColor={color} />
            </div>
          </motion.div>
        </AnimatePresence>
        <div
          style={{ backgroundColor: color }}
          className={`z-10 h-[14px] w-[14px]  shrink-0 rounded-full`}
        ></div>
      </div>
    </a>
  );
};

const Timeline = (props: TimelineProps) => {
  const { events } = props;

  if (events.length === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "flex-col",
        "gap-7",
        "before:absolute",
        "before:right-[6px]",
        "before:bottom-[14px]",
        "before:top-[10px]",
        "before:w-[2px]",
        "before:bg-gradient-to-b",
        "before:from-transparent",
        "before:from-45%",
        "before:to-bright-gray",
        "before:to-50%",
        "before:bg-[length:2px_10px]",
      )}
    >
      {events.map((event, index) => (
        <TimelineEvent key={index} {...event} index={index} />
      ))}
    </div>
  );
};

export default Timeline;
