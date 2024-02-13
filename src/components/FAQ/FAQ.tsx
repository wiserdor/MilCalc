import Accordion from "../Accordion/Accordion";
import { faqQuestions } from "./questions";

const FAQ = () => {
  return (
    <div
      className={`mt-8 flex flex-col items-center justify-center bg-ocean px-4 py-10`}
    >
      <div className={`text-center text-2xl font-semibold`}>שאלות ותשובות</div>
      <Accordion items={faqQuestions}></Accordion>
      <div style={{ marginTop: 8, textAlign: "center" }}>
        <a
          href="https://chat.openai.com/g/g-SyphjNdxN-myd-tgmvlym-mlkhmt-khrbvt-brzl"
          target="_blank"
          rel="noreferrer"
          style={{
            textAlign: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <img src="/svg/chatgpt.svg" style={{ width: "55%" }} />
          חדש! בוט שאלות ותשובות
          <br />
          לחצו כאן כדי להתחיל לשוחח
        </a>
        <div
          style={{
            color: "#767676",
          }}
        >
          <br />
          *הבוט הוא נסיוני וכרגע עבור משתמשי <br />
          ChatGPT Plus.
          <br /> ננסה למצוא פתרון שיהיה זמין לכולם ככל שיהיה ניתן בעתיד.
        </div>
      </div>
    </div>
  );
};

export default FAQ;
