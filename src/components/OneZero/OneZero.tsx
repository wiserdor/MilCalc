import { useEffect, useState } from "react";
import style from "./OneZero.module.css";
import { Dialog, DialogContent } from "@/shadcn/ui/dialog";

interface OneZeroProps {
  total: number;
}

const OneZero = (props: OneZeroProps) => {
  const { total = 0 } = props;
  const [isOpen, setIsOpen] = useState(false);

  if (!total) return null;

  const afterYearPercentage = Math.pow(1 + 0.046 / 12, 12) - 1;

  const afterYear = total * (1 + afterYearPercentage);

  const afterYearDiff = afterYear - total;

  useEffect(() => {
    if (!total) return;
    // get url params
    const urlParams = new URLSearchParams(window.location.search);
    const isOneZero = urlParams.get("onezero");

    let timeout: NodeJS.Timeout;
    if (isOneZero === "true") {
      timeout = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [total]);

  const handleOnClick = () => {
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent>
        <div
          className={`${style.oneZero} flex flex-col items-center justify-center`}
        >
          <div
            className={`${style.modalClose} absolute right-0 m-4 h-4 w-4 cursor-pointer`}
            onClick={closeModal}
          >
            &times;
          </div>

          <div
            className={`${style.header} flex items-center whitespace-nowrap font-normal`}
          >
            פקדון בטוח עם
            <img src="/svg/onezero.svg" />
          </div>
          <div
            style={{
              width: 290,
            }}
          >
            <h2 className="text-center">בא לך להגדיל את הסכום שמגיע לך?</h2>
            <div className="mt-2 text-center font-normal">
              הצעד שלך בדרך לחופשה בתאילנד, רכב חדש או שדרוג לבית.
            </div>
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            <div className={`${style.totalSum} flex flex-col p-4 text-right`}>
              <div>סכום להפקדה:</div>
              {/* <input type="number" className={style.totalSumInput} /> */}
              <div className={`${style.totalSumNumber} border-solid`}>
                ₪{total.toLocaleString("he-IL")}
              </div>
              <div className={`${style.disclaimer} font-normal`}>
                *פיקדון בריבית שנתית משתנה של 4.6%. ניתן למשוך את הקרן בכל עת.
              </div>
            </div>
          </div>
          <div className={`${style.results} grid w-full`}>
            <div className={`${style.resultsRow} grid text-center`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/svg/time.svg" width={20} />
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  textAlign: "right",
                }}
              >
                סכום הפקדון בעוד 12 חודשים:
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                ₪
                {afterYear.toLocaleString("he-IL", {
                  maximumFractionDigits: 1,
                })}{" "}
              </div>
            </div>
            <div className={`${style.divider} w-full`} />
            <div
              className={`${style.resultsRow} grid text-center`}
              style={{ fontWeight: 400, fontSize: 14, color: "#528322" }}
            >
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/svg/money.svg" width={20} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                הסכום שחסכת:
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                ₪
                {afterYearDiff.toLocaleString("he-il", {
                  maximumFractionDigits: 1,
                })}{" "}
              </div>
            </div>
          </div>
          <div
            className={`${style.btnWrapper} flex flex-col items-center justify-center`}
          >
            <div
              className={`${style.btn} cursor-pointer font-semibold`}
              onClick={handleOnClick}
            >
              להתנסות ופתיחת חשבון
            </div>
            <div className={`${style.btnDescription} mt-2 font-normal`}>
              חודשיים התנסות חינם!
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneZero;
