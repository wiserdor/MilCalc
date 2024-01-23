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
          layout
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={style.modalBackdrop} onClick={handleBackdropClick} />
          <dialog className={style.modal} open={isOpen}>
            <motion.div
              layout
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className={style.modalChild}>{children}</div>
            </motion.div>
          </dialog>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Modal
