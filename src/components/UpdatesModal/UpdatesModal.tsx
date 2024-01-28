import { useState } from 'react'
import Modal from '../Modal/Modal'
import style from './UpdatesModal.module.css'
import { updates } from '../../data/updates'

const UpdatesModal = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} handleBackdropClick={handleCloseModal}>
      <div className={style.container}>
        <div className={style.modalClose} onClick={handleCloseModal}>
          &times;
        </div>

        <h2 className={style.title}>עדכונים חדשים במחשבון!</h2>
        <ul className={style.list}>
          {updates.map((update, index) => (
            <li key={index}>{update}</li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

export default UpdatesModal
