import { useState } from 'react'
import style from './Accordion.module.css'

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
              borderBottom: activeIndexes.includes(index)
                ? '2px solid #0066FF'
                : '2px solid #DCE4EE',
            }}
          >
            <div>{item.title}</div>
            {activeIndexes.includes(index) ? (
              <img
                src="/svg/chevron-up.svg"
                className={style.accordionButtonIcon}
              />
            ) : (
              <img
                src="/svg/chevron-down.svg"
                className={style.accordionButtonIcon}
              />
            )}
          </div>
          {activeIndexes.includes(index) && (
            <div className={style.accordionContent}>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Accordion
