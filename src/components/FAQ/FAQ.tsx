import Accordion from "../Accordion/Accordion";
import { faqQuestions } from "./questions";

const FAQ = () => {
  return (
    <div
      className={`mt-8 flex flex-col items-center justify-center bg-ocean px-4 py-10`}
    >
      <div className={`text-center text-2xl font-semibold`}>שאלות ותשובות</div>
      <Accordion items={faqQuestions}></Accordion>
    </div>
  );
};

export default FAQ;
