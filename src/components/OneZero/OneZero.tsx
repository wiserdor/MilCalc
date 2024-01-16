import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import style from './OneZero.module.css'

interface OneZeroProps {
  total: number
}

const OneZero = (props: OneZeroProps) => {
  const { total = 0 } = props
  const [isOpen, setIsOpen] = useState(false)

  if (!total) return null

  const afterYearPercentage = Math.pow(1 + 0.046 / 12, 12) - 1

  const afterYear = total * (1 + afterYearPercentage)

  const afterYearDiff = afterYear - total

  useEffect(() => {
    if (!total) return
    // get url params
    const urlParams = new URLSearchParams(window.location.search)
    const isOneZero = urlParams.get('onezero')

    let timeout: NodeJS.Timeout
    if (isOneZero === 'true') {
      timeout = setTimeout(() => {
        setIsOpen(true)
      }, 3000)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [total])

  const handleOnClick = () => {
    setIsOpen(false)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen}>
      <div className={style.oneZero}>
        <div className={style.modalClose} onClick={closeModal}>
          &times;
        </div>

        <div className={style.header}>
          פקדון בטוח עם
          <img src="/svg/onezero.svg" />
        </div>
        <div>
          <h2 className={style.slogan}>בא לך להגדיל את הסכום שמגיע לך?</h2>
          <div className={style.subSlogan}>
            הצעד שלך בדרך לחופשה בתאילנד, רכב חדש או שדרוג לבית.
          </div>
        </div>
        <div
          style={{
            width: '100%',
          }}
        >
          <div className={style.totalSum}>
            <div>סכום להפקדה:</div>
            {/* <input type="number" className={style.totalSumInput} /> */}
            <div className={style.totalSumNumber}>
              {total.toLocaleString('he-IL')} ש״ח
            </div>
            <div className={style.disclaimer}>
              *פיקדון בריבית שנתית משתנה של 4.6%. ניתן למשוך את הקרן בכל עת.
            </div>
          </div>
        </div>
        <div className={style.results}>
          <div className={style.resultsRow}>
            <img src="/svg/time.svg" width="100%" height="100%" />
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              סכום הפקדון בעוד 12 חודשים:
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {afterYear.toLocaleString('he-IL', {
                maximumFractionDigits: 1,
              })}{' '}
              ש״ח
            </div>
          </div>
          <div className={style.divider} />
          <div
            className={style.resultsRow}
            style={{ fontWeight: 400, fontSize: 14, color: '#528322' }}
          >
            <img width="100%" height="100%" src="/svg/money.svg" />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              הסכום שחסכת:
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {afterYearDiff.toLocaleString('he-il', {
                maximumFractionDigits: 1,
              })}{' '}
              ש״ח
            </div>
          </div>
        </div>
        <div className={style.btnWrapper}>
          <div className={style.btn} onClick={handleOnClick}>
            להתנסות ופתיחת חשבון
          </div>
          <div className={style.btnDescription}>חודשיים התנסות חינם!</div>
        </div>
      </div>
    </Modal>
  )
}

export default OneZero
