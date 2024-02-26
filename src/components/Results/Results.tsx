import { useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import OneZero from "../OneZero/OneZero";
import OneZeroSectionBanner from "../OneZero/OneZeroSectionBanner";
import CompensationSection from "./CompensationSection";
import HeaderTotalSection from "./HeaderTotalSection";
import ResultsSection from "./ResultsSection";
import useResultsTotals from "./hooks/useResultsTotals";

const Results = () => {
  const validationErrors = useStore((state) => state.validationErrors);

  const {
    totalCompensation,
    totalNonPaidApproved,
    approvedItems,
    approvedNonPaidItems
  } = useResultsTotals();

  const resultsRef = useRef<HTMLDivElement>(null);
  const compensationRef = useRef<HTMLDivElement>(null);
  const voucherRef = useRef<HTMLDivElement>(null);

  const [oneZeroOpen, setOneZeroOpen] = useState(false);

  const onOneZeroOpenChange = (open: boolean) => {
    setOneZeroOpen(open);
  };

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length === 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [validationErrors]);

  if (validationErrors?.length > 0) return null;

  if (totalCompensation + totalNonPaidApproved === 0) return null;

  return (
    <div className="mt-8" ref={resultsRef}>
      <h2 className={`mb-2 py-2 text-center text-[22px]`}>
        המענקים שמגיעים לך
      </h2>
      <HeaderTotalSection
        totalCompensation={totalCompensation}
        totalVoucher={totalNonPaidApproved}
        onCompensationClick={() => {
          compensationRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
        onVoucherClick={() => {
          voucherRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      {totalCompensation > 0 && (
        <CompensationSection
          ref={compensationRef}
          totalCompensation={totalCompensation}
          items={approvedItems}
        />
      )}
      <OneZeroSectionBanner onClick={() => onOneZeroOpenChange(true)} />
      {(totalNonPaidApproved > 0 ||
        approvedNonPaidItems.some((a) => a.totalCompensationStr)) && (
        <ResultsSection
          ref={voucherRef}
          title="שוברים וסיוע"
          total={totalNonPaidApproved}
          results={approvedNonPaidItems}
        />
      )}
      <OneZero
        open={oneZeroOpen}
        onOpenChange={onOneZeroOpenChange}
        total={totalCompensation}
      />
    </div>
  );
};

export default Results;
