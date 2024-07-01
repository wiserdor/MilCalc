import { getApprovedItems, getApprovedNonPaidItems } from "@/data/compensation";
import useStore from "@/store/store";
import { useMemo } from "react";

const useResultsTotals = () => {
  const totalPerMonth = useStore((state) => state.totalPerMonth);
  const totalPerMonthMonthlyAfter24 = useStore(
    (state) => state.totalPerMonthMonthlyAfter24
  );
  const totalMoreThan45 = useStore((state) => state.totalMoreThan45);
  const totalFromChildren = useStore((state) => state.totalFromChildren);
  const totalFromChildrenMonthlyAfter24 = useStore(
    (state) => state.totalFromChildrenMonthlyAfter24
  );
  const totalVacation = useStore((state) => state.totalVacation);
  const totalSpecialChildren = useStore((state) => state.totalSpecialChildren);
  const totalMental = useStore((state) => state.totalMental);
  const totalFamilyCare = useStore((state) => state.totalFamilyCare);
  const totalSpecialDaysPayedIn24Total = useStore(
    (state) => state.totalSpecialDaysPayedIn24Total
  );
  const totalSpecialDaysPayedIn25Total = useStore(
    (state) => state.totalSpecialDaysPayedIn25Total
  );
  const specialDaysIn2024Dates = useStore(
    (state) => state.specialDaysIn2024Dates
  );
  const totalAdditional2023 = useStore((state) => state.totalAdditional2023);
  const totalAdditional2024 = useStore((state) => state.totalAdditional2024);
  const totalDaysStraight = useStore((state) => state.totalDaysStraight);
  const totalOld2024 = useStore((state) => state.totalOld2024);
  const totalOld2025 = useStore((state) => state.totalOld2025);
  const totalStudentCourse = useStore((state) => state.totalStudentCourse);
  const totalWarPersonalExpenses = useStore(
    (state) => state.totalWarPersonalExpenses
  );
  const totalWarFamilyExpenses = useStore(
    (state) => state.totalWarFamilyExpenses
  );

  const isStudent = useStore((state) => state.isStudent);
  const isCombat = useStore((state) => state.isCombat);
  const isIndependent = useStore((state) => state.isIndependent);
  const didVacationCancelled = useStore((state) => state.didVacationCancelled);

  const approvedItems = useMemo(
    () =>
      getApprovedItems(
        totalPerMonth,
        totalPerMonthMonthlyAfter24,
        totalFromChildren,
        totalFromChildrenMonthlyAfter24,
        totalSpecialChildren,
        totalMoreThan45,
        totalSpecialDaysPayedIn24Total,
        totalSpecialDaysPayedIn25Total,
        specialDaysIn2024Dates,
        totalAdditional2023,
        totalAdditional2024,
        totalDaysStraight,
        totalOld2024,
        totalOld2025,
        totalWarPersonalExpenses,
        totalWarFamilyExpenses
      ),
    [
      totalPerMonth,
      totalPerMonthMonthlyAfter24,
      totalFromChildren,
      totalFromChildrenMonthlyAfter24,
      totalSpecialChildren,
      totalMoreThan45,
      totalSpecialDaysPayedIn24Total,
      totalSpecialDaysPayedIn25Total,
      specialDaysIn2024Dates,
      totalAdditional2023,
      totalAdditional2024,
      totalDaysStraight,
      totalOld2024,
      totalOld2025,
      totalWarPersonalExpenses,
      totalWarFamilyExpenses
    ]
  );

  const approvedNonPaidItems = useMemo(
    () =>
      getApprovedNonPaidItems(
        totalFamilyCare,
        totalMental,
        totalVacation,
        isStudent,
        isCombat,
        isIndependent,
        didVacationCancelled,
        totalStudentCourse
      ),
    [
      totalMental,
      totalFamilyCare,
      totalVacation,
      isStudent,
      isCombat,
      isIndependent,
      didVacationCancelled,
      totalStudentCourse
    ]
  );
  const totalCompensation = useMemo(
    () =>
      approvedItems.reduce(
        (acc, item) => acc + (item.totalCompensation ?? 0),
        0
      ),
    [approvedItems]
  );

  const totalNonPaidApproved = useMemo(
    () =>
      approvedNonPaidItems.reduce(
        (acc, item) => acc + (item.totalCompensation ?? 0),
        0
      ),
    [approvedNonPaidItems]
  );

  return {
    totalCompensation,
    totalNonPaidApproved,
    approvedItems,
    approvedNonPaidItems
  };
};

export default useResultsTotals;
