import { Fragment, useEffect, useMemo, useState } from 'react'
import data from '../../data/independants'
import style from './Independent.module.css'
import { AnimatePresence, motion } from 'framer-motion'

const TIMER_DURATION = 15

const toPhoneString = (phone: string) => {
  // add - after the third digit
  const firstPart = phone.substring(0, 3)
  const secondPart = phone.substring(3)
  return `${firstPart}-${secondPart}`
}

function shuffleArray<A>(array: A[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index lower than the current index
    const j = Math.floor(Math.random() * (i + 1))

    // Swap elements at indices i and j
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const Independent = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timer, setTimer] = useState(TIMER_DURATION)
  const shuffledArray = useMemo(() => shuffleArray(data), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          nextItem()
          return TIMER_DURATION // Reset timer after changing item
        } else {
          return prevTimer - 1
        }
      })
    }, 1000)

    return () => clearInterval(interval) // Clean up interval on component unmount
  }, [currentIndex])

  const resetTimer = () => {
    setTimer(TIMER_DURATION)
  }

  const nextItem = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % data.length)
    resetTimer()
  }

  const prevItem = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    )
    resetTimer()
  }

  const activeItem = shuffledArray[currentIndex]

  return (
    <div style={{ marginTop: 12, width: '100%' }}>
      <h2 className={style.title}>תומכים במילואימניקים עצמאים</h2>
      <AnimatePresence>
        <motion.div
          className={style.carouselContainer}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className={style.carousel}>
            <div className={style.independent}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div className={style.imgContainer}>
                  <img
                    className={style.img}
                    src={`/independent/${activeItem.imgUrl}`}
                  />
                </div>
              </div>
              <h3 className={style.business}>{activeItem.title}</h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <div className={style.description}>
                  {activeItem.description}
                </div>
                <div className={style.contact}>
                  {activeItem.items.map((item, index) => (
                    <Fragment key={index}>
                      {item.type === 'phone' && (
                        <a href={`tel:${item.text}`}>
                          <div className={style.contactColumn}>
                            <img src="/svg/phone.svg" width={16} />
                            <div>{toPhoneString(item.text)}</div>
                          </div>
                        </a>
                      )}
                      {item.type === 'whatsapp' && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className={style.contactColumn}>
                            <img src="/svg/whatsapp.svg" width={16} />
                            <div>WhatsApp</div>
                          </div>
                        </a>
                      )}
                      {item.type === 'link' && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className={style.contactColumn}>
                            <img src="/svg/click.svg" width={16} />
                            <div>{item.text}</div>
                          </div>
                        </a>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className={style.timer}>{timer} שניות עד שנעבור לעצמאי הבא</div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          paddingBlock: 16,
        }}
      >
        <button onClick={prevItem} className={style.carouselControl}>
          ‹ הקודם
        </button>
        <button onClick={nextItem} className={style.carouselControl}>
          הבא ›
        </button>
      </div>
      <div className={style.subtitle}>
        חשוב לנו לעזור לעצמאיים שהעסק שלהם נפגע בעקבות המלחמה. רוצים להופיע?
        דברו איתנו במייל:{' '}
        <a href="mailto:yslook7@gmail.com">yslook7@gmail.com</a>
      </div>
    </div>
  )
}

export default Independent
