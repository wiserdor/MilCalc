import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TextSwitcherProps {
  texts: string[];
  everyMs: number;
}

const TextSwitcher = (props: TextSwitcherProps) => {
  const { texts, everyMs } = props;

  const [currentIndex, setCurrentIndex] = useState(0); // Current text index

  useEffect(() => {
    // Set up a timer to switch the text every 7 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cycle through texts
    }, everyMs);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [everyMs, texts.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      key={currentIndex}
    >
      {texts[currentIndex]}
    </motion.div>
  );
};

export default TextSwitcher;
