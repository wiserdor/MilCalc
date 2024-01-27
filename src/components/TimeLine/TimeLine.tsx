import { format } from 'date-fns'
import styles from './Timeline.module.css'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div className={styles.event}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          exit={{ opacity: 0, x: -50 }}
          className={styles.eventContent}
        >
          <div className={styles.eventContentColumn}>
            <div className={styles.eventDate}>
              {date ? format(date.toISOString(), 'dd.MM.yy') : ''}
            </div>
          </div>
          <div className={styles.eventContentColumn}>
            <div
              className={styles.eventInfo}
              style={{ backgroundColor: color, minWidth: '7ch' }}
            >
              ₪
              {totalCompensation.toLocaleString('he-IL', {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
          <div className={styles.eventContentColumn} style={{ flexGrow: 1 }}>
            <div className={styles.eventInfo2}>{name}</div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.eventContentColumn}
            style={{ cursor: 'pointer' }}
          >
            <img src="/svg/arrow-left.svg" />
          </a>
        </motion.div>
      </AnimatePresence>
      <div style={{ backgroundColor: color }} className={styles.eventDot}></div>
    </div>
  )
}

const Timeline = (props: TimelineProps) => {
  const { events } = props

  if (events.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      {events.map((event, index) => (
        <TimelineEvent key={index} {...event} index={index} />
      ))}
    </div>
  )
}

export default Timeline
