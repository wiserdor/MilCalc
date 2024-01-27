import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import ResultsBar from '../ResultsBar/ResultsBar'
import Timeline from '../TimeLine/TimeLine'
import { ApprovedItemProps } from './ResultItem'
import { separatePaymentsByDate } from './data'
import styles from './styles/CompensationSection.module.css'

export interface CompensationSectionProps {
  totalCompensation: number
  items: ApprovedItemProps[]
}

const CompensationSection = (props: CompensationSectionProps) => {
  const { totalCompensation, items } = props
  const [showMore, setShowMore] = React.useState(false)

  const { pastPayments, upcomingPayments } = React.useMemo(
    () => separatePaymentsByDate(items),
    [items]
  )

  debugger

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{`${totalCompensation.toLocaleString(
          'he-IL'
        )} ש״ח`}</h3>
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
        {showMore && (
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
                      color: '#528322',
                      url: p.url,
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
                      color: '#B179F9',
                      url: p.url,
                    }))}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.showMore} onClick={() => setShowMore(!showMore)}>
        <div>{showMore ? 'הצג פחות מידע' : 'הצג מידע נוסף'}</div>
        <div
          style={{
            display: 'flex',
            height: 24,
            width: 24,
            backgroundColor: '#0066FF',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 6,
          }}
        >
          <motion.div
            animate={{
              rotate: showMore ? 180 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <img src="/svg/carret.svg" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CompensationSection
