import Accordion from '../Accordion/Accordion'
import style from './FAQ.module.css'
import { faqQuestions } from './questions'



const FAQ = () => {
  return (
    <div className={style.FAQ}>
      <div className={style.FAQTitle}>שאלות ותשובות:</div>
      <Accordion items={faqQuestions}></Accordion>
    </div>
  )
}

export default FAQ
