import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { CSSProperties } from 'react'
import styles from './TimeLine.module.css'
import ArrowLeft from '../../svg/ArrowLeft'

export type TimelineEvent = {
  date?: Date
  totalCompensation?: number
  name?: string
  url?: string
  color?: CSSProperties['color']
}
export interface TimelineProps {
  events: TimelineEvent[]
}

const TimelineEvent = (props: TimelineEvent & { index: number }) => {
  const { date, totalCompensation = 0, name, color, url, index } = props
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ cursor: 'pointer' }}
    >
      <div className={`${styles.event} items-center flex flex-row-reverse justify-end`}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            exit={{ opacity: 0, x: -50 }}
            className={`${styles.eventContent} flex font-normal`}
          >
            <div className={`${styles.eventContentColumn} items-center flex`}>
              <div className='font-bold' style={{ minWidth: '7ch' }}>
                {date ? format(date.toISOString(), 'dd.MM.yy') : ''}
              </div>
            </div>
            <div className={`${styles.eventContentColumn} items-center flex`}>
              <div
                className={`${styles.eventInfo} rounded font-bold text-center`}
                style={{ backgroundColor: color, minWidth: '7ch' }}
              >
                ₪
                {totalCompensation.toLocaleString('he-IL', {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div
              className={`${styles.eventContentColumn} items-center flex`}
              style={{ flexGrow: 1, color }}
            >
              <div className={styles.eventInfo2}>{name}</div>
            </div>
            <div className={`${styles.eventContentColumn} items-center flex`}>
              <ArrowLeft strokeColor={color} />
            </div>
          </motion.div>
        </AnimatePresence>
        <div
          style={{ backgroundColor: color }}
          className={`${styles.eventDot} shrink-0`}
        ></div>
      </div>
    </a>
  );
}

const Timeline = (props: TimelineProps) => {
  const { events } = props

  if (events.length === 0) {
    return null
  }

  return (
    <div className={`${styles.container} flex flex-col relative`}>
      {events.map((event, index) => (
        <TimelineEvent key={index} {...event} index={index} />
      ))}
    </div>
  );
}

export default Timeline
