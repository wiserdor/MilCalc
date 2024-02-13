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
    <div
      className={`z-10 border-solid border-b-[1.5px] border-b-stone bg-ocean rounded fixed top-0 w-full`}
    >
      <Modal isOpen={isOpen} handleBackdropClick={handleCloseModal}>
        <div
          className={`rounded-3xl gap-2 bg-white py-12 px-24 items-center flex justify-center`}
        >
          <div
            className={`top-[-14px] text-[#ccc] text-2xl cursor-pointer h-4 m-4 absolute right-0 w-4`}
            onClick={handleCloseModal}
          >
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
      <div className={`text-sm flex font-normal justify-between p-4`}>
        <button className="bg-one-zero-black text-white py-2 px-4 rounded-full cursor-pointer">
          לפתיחת חשבון ב-ONE ZERO
        </button>
        <button
          className={`rounded-full gap-1 px-4 py-2 bg-idf text-white items-center cursor-pointer flex justify-center`}
          onClick={handleOpenModal}
        >
          <img src="/svg/share.svg" alt="שיתוף" />
          <span>לשיתוף</span>
        </button>
      </div>
    </div>
  )
}

export default StickyHeader
