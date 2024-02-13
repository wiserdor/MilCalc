import { motion } from 'framer-motion'
import OneZeroLogo from '../../svg/OneZeroLogo'
import styles from './OneZeroSectionBanner.module.css'

const OneZeroSectionBanner = () => {
  return (
    <div className={`${styles.container} items-center flex flex-col justify-center mt-4`}>
      <div
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <OneZeroLogo />
        <div style={{ fontWeight: 700, fontSize: 16, textAlign: 'center' }}>
          רוצה להגדיל את הסכום שמגיע לך?
        </div>
      </div>
      <motion.button
        style={{
          backgroundColor: '#1f1f1f',
          color: 'white',
          paddingInline: 24,
          paddingBlock: 16,
          borderRadius: 44,
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        למידע נוסף
      </motion.button>
    </div>
  );
}

export default OneZeroSectionBanner
