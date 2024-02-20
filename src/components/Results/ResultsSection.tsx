import { forwardRef } from "react";
import Voucher from "../../svg/Voucher";
import ResultItem, { NonApprovedItemProps } from "./ResultItem";
import LinoySection from "../LinoySection/LinoySection";

interface ResultsSectionProps {
  results: NonApprovedItemProps[];
  total: number;
  title: string;
}

const ResultsSection = (
  props: ResultsSectionProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { results, total } = props;

  return (
    <div className="my-4 flex flex-col gap-6 rounded-2xl bg-ocean">
      <div ref={ref} className={`my-4 flex flex-col gap-4  px-4 pb-4 pt-6`}>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2">
            <Voucher strokeColor="#0066FF" />
          </div>
          <h3 className="text-lg font-semibold leading-tight">
            בשווי {`₪${total.toLocaleString("he-IL")}`}
          </h3>
          <div className={`text-base font-bold leading-tight text-dark-gray`}>
            שוברים וסיוע
          </div>
        </div>
        <div className={`grid auto-rows-[1fr] grid-cols-[1fr_1fr] gap-4`}>
          {results.map(
            (item, i) =>
              (item.totalCompensation > 0 || item.totalCompensationStr) && (
                <ResultItem key={i} {...item} />
              )
          )}
        </div>
      </div>
      <LinoySection />
    </div>
  );
};

export default forwardRef(ResultsSection);
