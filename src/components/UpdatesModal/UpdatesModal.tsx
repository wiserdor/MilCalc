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
      <div className={`${style.container} flex flex-col justify-center p-6`}>
        <div className={`${style.modalClose} cursor-pointer h-4 m-4 absolute right-0 w-4`} onClick={handleCloseModal}>
          &times;
        </div>

        <h2 className='text-center'>עדכונים חדשים במחשבון!</h2>
        <ul className={`${style.list} font-normal`}>
          {updates.map((update, index) => (
            <li key={index}>{update}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default UpdatesModal
