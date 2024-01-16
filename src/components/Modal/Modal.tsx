import { useState } from 'react'
import style from './Modal.module.css'

export interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
}

const Modal = (props: ModalProps) => {
  const { children, isOpen } = props

  const [isOpenInner, setIsOpenInner] = useState(true)

  // dismiss modal on backdrop click
  const handleBackdropClick = () => {
    setIsOpenInner(false)
  }

  if (!isOpen || !isOpenInner) return null

  return (
    <div
      className={`${style.modalWrapper}  ${isOpenInner ? style.visible : ''}`}
    >
      <div className={style.modalBackdrop} onClick={handleBackdropClick} />
      <dialog className={style.modal} open={isOpen}>
        {children}
      </dialog>
    </div>
  )
}

export default Modal
