import { Ref, forwardRef } from 'react'
import styles from './Toggle.module.css'
import { motion } from 'framer-motion'
export interface ToggleProps {
  active: boolean
  onChange: (e: any) => void
  label: string
  name: string
}

const Toggle = forwardRef((props: ToggleProps, ref: Ref<any>) => {
  const { active, onChange, label } = props

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <div
        onClick={() => onChange(!active)}
        className={styles.container}
        style={{
          color: active ? '#0066FF' : '#6F6F6F',
          backgroundColor: active ? '#F2F6FD' : '#ffffff',
          borderColor: active ? '#0066FF' : '#6F6F6F',
        }}
        ref={ref}
      >
        {label}
      </div>
    </motion.div>
  )
})

export default Toggle
