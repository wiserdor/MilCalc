import style from './Modal.module.css'

export interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  handleBackdropClick?: () => void
}

const Modal = (props: ModalProps) => {
  const { children, isOpen, handleBackdropClick } = props

  if (!isOpen) return null

  return (
    <div className={`${style.modalWrapper}`}>
      <div className={style.modalBackdrop} onClick={handleBackdropClick} />
      <dialog className={style.modal} open={isOpen}>
        <div className={style.modalChild}>{children}</div>
      </dialog>
    </div>
  )
}

export default Modal
