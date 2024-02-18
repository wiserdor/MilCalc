import { Dialog, DialogContent } from "@/shadcn/ui/dialog";
import OneZeroLogo from "@/svg/OneZeroLogo";
import { useEffect, useMemo, useState } from "react";
import OneZeroSlider from "./OneZeroSlider";

interface OneZeroProps {
  total: number;
}

const afterYearPercentage = Math.pow(1 + 0.046 / 12, 12) - 1;

const OneZero = (props: OneZeroProps) => {
  const { total = 0 } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [innerTotal, setInnerTotal] = useState(total);

  const handleValueChange = (value: number) => {
    setInnerTotal(value);
  };

  const afterYear = useMemo(
    () => innerTotal * (1 + afterYearPercentage),
    [innerTotal]
  );

  useEffect(() => {
    if (!total) return;
    // get url params
    const urlParams = new URLSearchParams(window.location.search);
    const isOneZero = urlParams.get("onezero");

    let timeout: NodeJS.Timeout;
    if (isOneZero === "true") {
      timeout = setTimeout(() => {
        setIsOpen(true);
      }, 200);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [total]);

  if (!total) return null;

  const afterYearDiff = afterYear - innerTotal;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="flex w-fit flex-col gap-6 rounded-3xl border-one-zero-black bg-one-zero-black px-4 pb-6 pt-4 text-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex w-full justify-end">
            <OneZeroLogo color="white" />
          </div>
          <h2 className="text-[22px] font-bold">4.6% פקדון שנתי</h2>
          <div className="w-60 text-center text-base font-normal leading-[18.96px]">
            הצעד שלך בדרך לחופשה בתאילנד, רכב חדש או שדרוג לבית.
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl  bg-ocean pt-6 text-black">
          <div className="px-6 ">סכום להפקדה:</div>
          <div className="w-full px-6">
            <OneZeroSlider
              value={innerTotal}
              handleValueChange={handleValueChange}
            />
          </div>
          <div className="w-[300px] rounded-b-2xl border-t-[1.5px] border-dashed border-black bg-white px-6 py-4 text-sm font-normal text-idf">
            <span>הכנסה צפויה לאחר 12 חודשים:</span>{" "}
            <span className="font-bold">
              {afterYearDiff.toLocaleString("he-il", {
                currency: "ILS",
                style: "currency",
                maximumFractionDigits: 0
              })}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <button className="rounded-full bg-blue px-6 py-3 text-base font-bold text-white">
            להתנסות ופתיחת חשבון
          </button>
          <div className="w-60 text-center text-xs font-normal text-bright-gray">
            *ריבית משתנה P-1.4%, מתואמת 4.6%. בכפוף לתנאי הבנק והפיקדון.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneZero;
