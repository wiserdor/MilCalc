import { useState } from "react";
import Modal from "../Modal/Modal";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";

const SHARE_MESSAGE =
  "המענקים למילואימניקים אושרו בממשלה! כנסו למחשבון לבדוק לכמה אתם זכאים:";
const SHARE_URL = "https://miluimnik.info";

const StickyHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed top-0 z-30 w-full rounded border-b-[1.5px] border-solid border-b-stone bg-ocean`}
    >
      <Modal isOpen={isOpen} handleBackdropClick={handleCloseModal}>
        <div
          className={`flex items-center justify-center gap-2 rounded-3xl bg-white px-24 py-12`}
        >
          <div
            className={`absolute right-0 top-[-14px] m-4 h-4 w-4 cursor-pointer text-2xl text-[#ccc]`}
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
      <div className={`flex justify-between p-4 text-sm font-normal`}>
        <button className="cursor-pointer rounded-full bg-one-zero-black px-4 py-2 text-white">
          לפתיחת חשבון ב-ONE ZERO
        </button>
        <button
          className={`flex cursor-pointer items-center justify-center gap-1 rounded-full bg-idf px-4 py-2 text-white`}
          onClick={handleOpenModal}
        >
          <img src="/svg/share.svg" alt="שיתוף" />
          <span>לשיתוף</span>
        </button>
      </div>
    </div>
  );
};

export default StickyHeader;
