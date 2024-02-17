import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef } from "react";
import { separatePaymentsByDate } from "../../data/compensation";
import ResultsBar from "../ResultsBar/ResultsBar";
import Timeline from "../TimeLine/TimeLine";
import Money from "../../svg/Money";

export interface ApprovedItem {
  name: string;
  totalCompensation: number;
  totalCompensationStr?: string;
  description?: string;
  nonDirectMoney?: boolean;
  isMoney?: boolean;
  dateOfPayment?: Date;
  url?: string;
}

export interface CompensationSectionProps {
  totalCompensation: number;
  items: ApprovedItem[];
}

const CompensationSection = (
  props: CompensationSectionProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { totalCompensation, items } = props;

  const { pastPayments, upcomingPayments } = React.useMemo(
    () => separatePaymentsByDate(items),
    [items]
  );

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center gap-10 rounded-2xl bg-ocean px-4 pb-4 pt-6`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-2">
          <Money strokeColor="#528322" />
        </div>
        <h3 className=" text-lg font-semibold leading-tight">{`₪${totalCompensation.toLocaleString(
          "he-IL"
        )}`}</h3>
        <div
          className={` text-center text-base font-bold leading-tight text-dark-gray`}
        >
          תגמולים ומענקים
        </div>
      </div>
      <ResultsBar
        segments={[
          {
            label: "צפוי להכנס",
            value: upcomingPayments?.reduce(
              (acc, curr) => acc + curr.totalCompensation,
              0
            ),
            color: "#B179F9",
            description: "מענקים שצפויים להיכנס בעתיד"
          },
          {
            label: "נכנס",
            value: pastPayments?.reduce(
              (acc, curr) => acc + curr.totalCompensation,
              0
            ),
            color: "#528322",
            description: "מענקים שהתקבלו בחשבון הבנק שלכם"
          }
        ]}
      />

      <AnimatePresence>
        <motion.div
          className="flex flex-col gap-6"
          layout
          animate={{
            height: "auto",
            visibility: "visible"
          }}
          initial={{ height: 0, visibility: "hidden" }}
          exit={{ height: 0, visibility: "hidden" }}
        >
          <div>
            <div className="text-sm font-bold">מענקים שנכנסו:</div>

            <div className="py-4">
              <Timeline
                events={pastPayments
                  .filter((p) => p.totalCompensation > 0)
                  .map((p) => ({
                    date: p.dateOfPayment,
                    totalCompensation: p.totalCompensation,
                    name: p.name,
                    url: p.url,
                    color: "#528322"
                  }))}
              />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold">מענקים שצפויים להכנס:</div>
            <div className="py-4">
              <Timeline
                events={upcomingPayments
                  .filter((p) => p.totalCompensation > 0)
                  .map((p) => ({
                    date: p.dateOfPayment,
                    totalCompensation: p.totalCompensation,
                    name: p.name,
                    color: "#B179F9",
                    url: p.url
                  }))}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default forwardRef(CompensationSection);
