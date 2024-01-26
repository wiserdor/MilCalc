import { useState } from 'react'
import style from './StickyHeader.module.css'
import Modal from '../Modal/Modal'
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from 'react-share'

const SHARE_MESSAGE =
  'המענקים למילואימניקים אושרו בממשלה! כנסו למחשבון לבדוק לכמה אתם זכאים:'
const SHARE_URL = 'https://miluimnik.info'

const StickyHeader = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div className={style.stickyHeader}>
      <Modal isOpen={isOpen} handleBackdropClick={handleCloseModal}>
        <div className={style.share}>
          <div className={style.modalClose} onClick={handleCloseModal}>
            &times;
          </div>
          <div>שתפו:</div>
          <WhatsappShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <TelegramShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <FacebookShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
            <XIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
      </Modal>
      <div className={style.container}>
        <img src="/svg/calculator.svg" alt="מחשבון מענקים" />
        <div className={style.shareBtn} onClick={handleOpenModal}>
          <img src="/svg/share.svg" alt="שיתוף" />
          <span>שתפו עם החבר׳ה</span>
        </div>
      </div>
    </div>
  )
}

export default StickyHeader
