import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import data from "../../data/independants";
import { AnimatePresence, motion } from "framer-motion";

const TIMER_DURATION = 15;

function shuffleArray<A>(array: A[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index lower than the current index
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Independent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const shuffledArray = useMemo(() => shuffleArray(data), []);

  const nextItem = useCallback(() => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % data.length);
    resetTimer();
  }, [setCurrentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          nextItem();
          return TIMER_DURATION; // Reset timer after changing item
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [currentIndex, nextItem]);

  const resetTimer = () => {
    setTimer(TIMER_DURATION);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
    resetTimer();
  };

  const activeItem = shuffledArray[currentIndex];

  return (
    <div className="mt-3 w-full">
      <h2 className="my-2 text-center text-2xl font-bold">
        תומכים במילואימניקים עצמאים
      </h2>
      <AnimatePresence>
        <motion.div
          className="relative w-full"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="w-full">
            <div className="flex h-[550px] flex-col gap-4 rounded-3xl border-[1.5px] border-solid border-blue px-6 pb-6 pt-8 text-center">
              <div className="flex w-full justify-center">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full">
                  <img
                    className={`filter-[brightness(105%)] h-auto max-w-[155%]`}
                    src={`/independent/${activeItem.imgUrl}`}
                    alt={activeItem.title}
                  />
                </div>
              </div>
              <div>
                <h3
                  className={`m-0 p-0 text-center text-base font-semibold text-idf`}
                >
                  {activeItem.title}
                </h3>
                {activeItem?.business && (
                  <div className="text-base font-normal">
                    {activeItem.business}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div
                  className={`text-pretty text-right text-sm font-normal leading-snug`}
                >
                  {activeItem.description}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-normal text-blue">
                  {activeItem.items.map((item, index) => (
                    <Fragment key={index}>
                      {item.type === "phone" && (
                        <a href={`tel:${item.phone}`}>
                          <img src="/svg/phone.svg" alt="phone" />
                        </a>
                      )}
                      {item.type === "whatsapp" && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="/svg/whatsapp.svg" alt="whatsapp" />
                        </a>
                      )}
                      {item.type === "link" && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="/svg/click.svg" alt="click" />
                        </a>
                      )}
                      {item.type === "facebook" && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="/svg/facebook.svg" alt="facebook" />
                        </a>
                      )}
                      {item.type === "instagram" && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="/svg/instagram.svg" alt="instagram" />
                        </a>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex items-center justify-center">
        {timer} שניות עד שנעבור לעצמאי הבא
      </div>

      <div className="flex items-center justify-center gap-4 py-4">
        <button
          onClick={prevItem}
          className={`cursor-pointer border-none bg-transparent text-xl font-normal text-blue`}
        >
          ‹ הקודם
        </button>
        <button
          onClick={nextItem}
          className={`cursor-pointer border-none bg-transparent text-xl font-normal text-blue`}
        >
          הבא ›
        </button>
      </div>
      <div className={`px-8 text-center text-sm font-normal text-dark-gray`}>
        חשוב לנו לעזור לעצמאיים שהעסק שלהם נפגע בעקבות המלחמה. רוצים להופיע?
        מלאו את הטופס עם הפרטים שלכם:{" "}
        <a
          href="https://wkf.ms/4buZtPI"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue"
        >
          https://wkf.ms/4buZtPI
        </a>
      </div>
    </div>
  );
};

export default Independent;
