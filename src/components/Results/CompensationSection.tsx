import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import ResultsBar from '../ResultsBar/ResultsBar'
import Timeline from '../TimeLine/TimeLine'
import { separatePaymentsByDate } from '../../data/compensation'
import styles from './styles/CompensationSection.module.css'

export interface ApprovedItem {
  name: string
  totalCompensation: number
  totalCompensationStr?: string
  description?: string
  nonDirectMoney?: boolean
  isMoney?: boolean
  dateOfPayment?: Date
  url?: string
}

export interface CompensationSectionProps {
  totalCompensation: number
  items: ApprovedItem[]
}

const CompensationSection = (props: CompensationSectionProps) => {
  const { totalCompensation, items } = props

  const { pastPayments, upcomingPayments } = React.useMemo(
    () => separatePaymentsByDate(items),
    [items]
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{`₪${totalCompensation.toLocaleString(
          'he-IL'
        )}`}</h3>
        <div className={styles.subtitle}>תגמולים ומענקים</div>
      </div>
      <ResultsBar
        segments={[
          {
            label: 'צפוי להכנס',
            value: upcomingPayments?.reduce(
              (acc, curr) => acc + curr.totalCompensation,
              0
            ),
            color: '#528322',
            description: 'מענקים שצפויים להיכנס בעתיד',
          },
          {
            label: 'נכנס',
            value: pastPayments?.reduce(
              (acc, curr) => acc + curr.totalCompensation,
              0
            ),
            color: '#B179F9',
            description: 'מענקים שהתקבלו בחשבון הבנק שלכם',
          },
        ]}
      />

      <AnimatePresence>
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
          layout
          animate={{
            height: 'auto',
            visibility: 'visible',
          }}
          initial={{ height: 0, visibility: 'hidden' }}
          exit={{ height: 0, visibility: 'hidden' }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              מענקים שנכנסו:
            </div>

            <div
              style={{
                paddingBlock: 16,
              }}
            >
              <Timeline
                events={pastPayments
                  .filter((p) => p.totalCompensation > 0)
                  .map((p) => ({
                    date: p.dateOfPayment,
                    totalCompensation: p.totalCompensation,
                    name: p.name,
                    url: p.url,
                    color: '#B179F9',
                  }))}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              מענקים שצפויים להכנס:
            </div>
            <div
              style={{
                paddingBlock: 16,
              }}
            >
              <Timeline
                events={upcomingPayments
                  .filter((p) => p.totalCompensation > 0)
                  .map((p) => ({
                    date: p.dateOfPayment,
                    totalCompensation: p.totalCompensation,
                    name: p.name,
                    color: '#528322',
                    url: p.url,
                  }))}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CompensationSection
