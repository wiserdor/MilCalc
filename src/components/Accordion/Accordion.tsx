import { useState } from 'react'
import style from './Accordion.module.css'
import { AnimatePresence, motion } from 'framer-motion'

export interface AccordionProps {
  items: {
    title: string
    content: string
  }[]
}

const Accordion = (props: AccordionProps) => {
  const { items } = props

  const [activeIndexes, setActiveIndexes] = useState<number[]>([])

  const handleClick = (index: number) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index))
    } else {
      setActiveIndexes([...activeIndexes, index])
    }
  }

  return (
    <div className={style.accordion}>
      {items.map((item, index) => (
        <div key={item.title} className={style.accordionItem}>
          <div
            onClick={() => handleClick(index)}
            className={style.accordionButton}
            style={{
              fontWeight: activeIndexes.includes(index) ? '600' : '400',
              color: activeIndexes.includes(index) ? '#0066FF' : '#000000',
            }}
          >
            <div>{item.title}</div>
            {activeIndexes.includes(index) ? (
              <motion.div
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="/svg/chevron-up.svg"
                  className={style.accordionButtonIcon}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="/svg/chevron-up.svg"
                  className={style.accordionButtonIcon}
                />
              </motion.div>
            )}
          </div>
          <AnimatePresence initial={false}>
            {activeIndexes.includes(index) && (
              <motion.section
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className={style.accordionContent}>{item.content}</div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default Accordion
