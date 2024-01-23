import { AnimatePresence, motion } from 'framer-motion'
import style from './Modal.module.css'

export interface ModalProps {
  children: React.ReactNode
  isOpen: boolean

  handleBackdropClick?: () => void
}

const Modal = (props: ModalProps) => {
  const { children, isOpen, handleBackdropClick } = props

  if (!isOpen) return <AnimatePresence />

  return (
    <AnimatePresence>
      <div className={`${style.modalWrapper}`}>
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={style.modalBackdrop} onClick={handleBackdropClick} />
          <dialog className={style.modal} open={isOpen}>
            <div className={style.modalChild}>{children}</div>
          </dialog>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Modal
