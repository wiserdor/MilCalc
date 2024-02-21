import { Dialog, DialogContent } from "@/shadcn/ui/dialog";
import OneZeroLogo from "@/svg/OneZeroLogo";
import { useEffect, useMemo, useState, useCallback } from "react";
import OneZeroSlider from "./OneZeroSlider";
import { useFeatureValue } from "@growthbook/growthbook-react";
import { Button } from "@/shadcn/ui/button";
import ReactGA from "react-ga4";

interface OneZeroProps {
  total: number;
  open: boolean; // New prop to control dialog visibility from outside
  onOpenChange: (open: boolean) => void; // Callback to notify parent about open state changes
}

const trackLinkClick = (abVariant: string) => {
  ReactGA.event({
    category: "click_onezero_link",
    action: `click_onezero-popup_click-${abVariant}`,
    label: abVariant
  });
};

const getOneZeroLink = (abVariant: string) => {
  if (abVariant === "thailand") {
    return "https://onezero.onelink.me/kAPm/jmra5660";
  }
  if (abVariant === "best") {
    return "https://onezero.onelink.me/kAPm/j3loeafn";
  }

  return "https://onezero.onelink.me/kAPm/pjjj23ju";
};

const OneZero = (props: OneZeroProps) => {
  const { total = 0, open, onOpenChange } = props; // Destructure the new props
  const [innerTotal, setInnerTotal] = useState(total);
  const [canDismiss, setCanDismiss] = useState(false);
  const [countdown, setCountdown] = useState(6);

  const abVariant = useFeatureValue("onezero-banner", "thailand");

  const handleValueChange = useCallback((value: number) => {
    setInnerTotal(value);
  }, []);

  const afterYearPercentage = Math.pow(1 + 0.046 / 12, 12) - 1;
  const afterYear = useMemo(
    () => innerTotal * (1 + afterYearPercentage),
    [afterYearPercentage, innerTotal]
  );

  useEffect(() => {
    setInnerTotal(total); // Update innerTotal when total changes
  }, [total]);

  useEffect(() => {
    if (open && countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (countdown <= 0) {
      setCanDismiss(true);
    }
  }, [open, countdown]);

  if (!total) return null;

  const afterYearDiff = afterYear - innerTotal;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (canDismiss) onOpenChange(open);
      }}
    >
      <DialogContent
        overlayanimationduration={1000}
        className="flex w-fit flex-col items-center justify-between gap-2 rounded-3xl border-one-zero-black bg-one-zero-black px-4 pb-6 pt-4 text-white data-[state=open]:duration-1000"
      >
        {countdown > 0 && (
          <div className="absolute right-2 z-30 bg-one-zero-black text-sm font-normal text-white">
            ניתן לסגור בעוד {countdown} שניות
          </div>
        )}

        {(abVariant === "thailand" || abVariant === "best") && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex w-full justify-end">
                <OneZeroLogo color="white" />
              </div>
              <h2 className="text-[22px] font-bold">4.6% פקדון שנתי</h2>
              <div className="w-60 text-center text-base font-normal leading-[18.96px]">
                {abVariant === "thailand" &&
                  "הצעד שלך בדרך לחופשה בתאילנד, רכב חדש או שדרוג לבית."}
                {abVariant === "best" && "פיקדון בריבית הגבוהה בישראל"}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 rounded-2xl  bg-ocean pt-6 text-black">
              <div className="px-6 ">בחרו סכום להפקדה:</div>
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
            <div className="flex flex-col items-center justify-center">
              <a
                href={getOneZeroLink(abVariant)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLinkClick(abVariant)}
              >
                <Button
                  variant="none"
                  className="rounded-full bg-blue px-6 py-3 text-base font-bold text-white"
                >
                  {abVariant === "thailand" && "להתנסות ופתיחת חשבון"}
                  {abVariant === "best" && "לפתיחת חשבון באפליקציה"}
                </Button>
              </a>
            </div>
          </div>
        )}
        {abVariant === "noslider" && (
          <>
            <div className="flex w-full justify-end">
              <OneZeroLogo color="white" />
            </div>
            <div className="flex h-[400px] w-[328px] flex-col items-center justify-center gap-8">
              <div className="w-60 text-center text-[22px] font-bold leading-[18.96px]">
                4.6% פקדון שנתי בריבית הגבוהה בישראל
              </div>
              <a
                href={getOneZeroLink(abVariant)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLinkClick(abVariant)}
              >
                <Button
                  variant={"none"}
                  className="cursor-pointer rounded-full bg-blue px-6 py-3 text-base font-bold text-white"
                >
                  לפתיחת חשבון ב10 דקות
                </Button>
              </a>
            </div>
          </>
        )}
        <div className="w-60 text-center text-xs font-normal text-bright-gray">
          *ריבית משתנה P-1.4%, מתואמת 4.6%. בכפוף לתנאי הבנק והפיקדון.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneZero;
