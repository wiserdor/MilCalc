import { Dialog, DialogContent } from "@/shadcn/ui/dialog";
import OneZeroLogo from "@/svg/OneZeroLogo";
import { useEffect, useMemo, useState, useCallback } from "react";
import OneZeroSlider from "./OneZeroSlider";
import { useFeatureValue } from "@growthbook/growthbook-react";
import { Button } from "@/shadcn/ui/button";
import ReactGA from "react-ga4";
import MoneyPlus from "@/svg/MoneyPlus";

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
  if (abVariant === "newad") {
    return "https://onezero.onelink.me/kAPm/jmra5660";
  }

  return "https://onezero.onelink.me/kAPm/pjjj23ju";
};

const OneZero = (props: OneZeroProps) => {
  const { total = 0, open, onOpenChange } = props; // Destructure the new props
  const [innerTotal, setInnerTotal] = useState(total);

  const abVariant = useFeatureValue("onezero-new", "newad");

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

  if (!total) return null;

  const afterYearDiff = afterYear - innerTotal;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      <DialogContent
        overlayanimationduration={1000}
        className="flex w-[328px] flex-col items-center justify-between gap-2 rounded-3xl border-one-zero-black bg-one-zero-black px-4 pb-6 pt-4 text-white data-[state=open]:duration-1000"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex w-full justify-end">
              <OneZeroLogo color="white" />
            </div>
            <h2 className="w-3/4 text-center text-[22px] font-bold leading-[26px]">
              רוצה לשדרג את סכום המענקים שקיבלת?
            </h2>
            <div className="w-60 text-center text-base font-normal leading-[18.96px]">
              {abVariant === "newad" &&
                "עם ONE ZERO תוכלו להגדיל את הסכום שלכם עם פיקדון שנתי בריבית 4.6%, הגבוהה בישראל:"}
              {abVariant === "slider" &&
                "עם ONE ZERO תוכלו להגדיל את הסכום שלכם עם פיקדון שנתי בריבית הגבוהה בישראל."}
            </div>
          </div>
          {abVariant === "slider" && (
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
          )}
          {abVariant === "newad" && (
            <div className="flex w-full items-center justify-between">
              <div className="flex w-[107px] flex-col items-center gap-2 rounded-2xl border-[1.5px] border-dark-gray px-6 py-4 text-center ">
                <div className="text-xs font-normal leading-[14px] text-bright-gray">
                  סך כל המענקים היום:
                </div>
                <div className="text-base font-bold text-white">
                  {innerTotal.toLocaleString("he-il", {
                    currency: "ILS",
                    style: "currency",
                    maximumFractionDigits: 0
                  })}
                </div>
              </div>
              <div className="flex w-[173px] flex-col items-center gap-2 rounded-2xl  bg-ocean px-6 py-4 text-center">
                <MoneyPlus />
                <div className="text-xs font-normal leading-[14px] text-dark-gray">
                  הסכום המשוער לאחר פקדון של 12 חודשים
                </div>
                <div className="text-[22px] font-bold text-blue">
                  {afterYear.toLocaleString("he-il", {
                    currency: "ILS",
                    style: "currency",
                    maximumFractionDigits: 0
                  })}
                </div>
              </div>
            </div>
          )}
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
                למידע נוסף
              </Button>
            </a>
          </div>
        </div>
        <div className="w-60 text-center text-xs font-normal text-bright-gray">
          *ריבית משתנה P-1.4%, מתואמת 4.6%. בכפוף לתנאי הבנק והפיקדון.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneZero;
