import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AccordionProps {
  items: {
    title: string;
    content: string;
  }[];
}

const Accordion = (props: AccordionProps) => {
  const { items } = props;

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const handleClick = (index: number) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div className={`my-7 rounded`}>
      {items.map((item, index) => (
        <div key={item.title} className="mb-3">
          <div
            onClick={() => handleClick(index)}
            className={`flex w-full cursor-pointer items-center justify-between gap-4 border-b-2 border-solid border-b-stone px-3 text-lg font-normal`}
            style={{
              fontWeight: activeIndexes.includes(index) ? "600" : "400",
              color: activeIndexes.includes(index) ? "#0066FF" : "#000000",
            }}
          >
            <div className="w-5/6">{item.title}</div>
            <div className="h-8 w-8 ">
              {activeIndexes.includes(index) ? (
                <motion.div
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src="/svg/chevron-up.svg"
                    className={`h-8 w-8 text-base font-semibold`}
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
                    className={`h-8 w-8 text-base font-semibold`}
                  />
                </motion.div>
              )}
            </div>
          </div>
          <AnimatePresence initial={false}>
            {activeIndexes.includes(index) && (
              <motion.section
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-4 text-base font-normal text-dark-gray">
                  {item.content}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
