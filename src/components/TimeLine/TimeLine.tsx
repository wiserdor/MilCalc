import { format } from 'date-fns'
import styles from './Timeline.module.css'
import { CSSProperties } from 'react'

export type TimelineEvent = {
  date?: Date
  info1?: string
  info2?: string
  isToday?: boolean
  color?: CSSProperties['color']
}
export interface TimelineProps {
  events: TimelineEvent[]
}

const TimelineEvent = (props: TimelineEvent) => {
  const { date, info1, info2, color, isToday = false } = props
  return (
    <>
      {isToday ? (
        <div className={styles.eventToday}>
          <div className={styles.eventContentToday}>
            <div>היום:{format(new Date(), 'dd.MM.yy')}</div>
          </div>
          <div className={styles.todaySVGWrapper}>
            <img className={styles.todaySVG} src="/svg/time-gray.svg" />
          </div>
        </div>
      ) : (
        <div className={styles.event}>
          <div className={styles.eventContent}>
            <div className={styles.eventContentColumn}>
              <div
                style={{ backgroundColor: color }}
                className={styles.eventDate}
              >
                {date ? format(date.toISOString(), 'dd.MM.yy') : ''}
              </div>
            </div>
            <div style={{ color }} className={styles.eventContentColumn}>
              <div className={styles.eventInfo}>{info1}</div>
            </div>
            <div className={styles.eventContentColumn}>
              <div className={styles.eventInfo}>{info2}</div>
            </div>
          </div>
          <div
            style={{ backgroundColor: color }}
            className={styles.eventDot}
          ></div>
        </div>
      )}
    </>
  )
}

const Timeline = (props: TimelineProps) => {
  const { events } = props
  return (
    <div className={styles.container}>
      {events.map((event, index) => (
        <TimelineEvent key={index} {...event} />
      ))}
    </div>
  )
}

export default Timeline
