import { motion } from "framer-motion";
import OneZeroLogo from "../../svg/OneZeroLogo";

const OneZeroSectionBanner = (props: { onClick: () => void }) => {
  const { onClick } = props;

  return (
    <div
      className={`color-black mt-4 flex flex-col items-center justify-center gap-4 rounded-2xl border-[1.5px] border-solid border-one-zero-black py-6`}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <OneZeroLogo />
        <div className="text-center text-base font-bold">
          רוצה להגדיל את הסכום שמגיע לך?
        </div>
      </div>
      <motion.button
        className="cursor-pointer rounded-full bg-[#1f1f1f] px-6 py-4 text-base font-bold text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        למידע נוסף
      </motion.button>
    </div>
  );
};

export default OneZeroSectionBanner;
