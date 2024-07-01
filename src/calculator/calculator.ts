import {
  addMonths,
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfYear,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  max,
  min,
  startOfMonth,
  startOfYear
} from "date-fns";
import {
  getMaxChildApproval,
  getMaxMonthApproval
} from "../components/Results/constants";
import { DateRange } from "../store/types";
import {
  COMBAT_RATE,
  FAMILY_CARE_COMPENSATION,
  GRANT_DAILY_RATE,
  MENTAL_HEALTH_COMPENSATION,
  NON_COMBAT_RATE,
  SPECIAL_NEEDS_COMPENSATION
} from "./constants";
import { getMonthNameHebrew } from "@/helpers/date";

export const calculateVacation = (
  totalDays: number,
  hasChildren: boolean,
  isCombat: boolean
) => {
  if (totalDays < 60) return 0;

  const baseVacation = isCombat ? 3500 : 1500;
  const additionalForChildren = isCombat ? 1000 : 500;

  return hasChildren ? baseVacation + additionalForChildren : baseVacation;
};

export const calculateDays = (
  dateRanges: { startDate: Date; endDate: Date }[]
) => {
  let total = 0;
  dateRanges.forEach(({ startDate, endDate }) => {
    total += totalDaysInRange(startDate, endDate);
  });

  return total;
};

export const calculateMonthlyCompensation = (
  isCombat: boolean,
  days: number
) => {
  const rate = isCombat ? COMBAT_RATE : NON_COMBAT_RATE;

  return Math.floor(days / 10) * rate;
};

export const calculateMonthlyCompensation2023 = (
  isCombat: boolean,
  days: number
) => {
  if (days < 40) return 0;
  const rate = isCombat ? COMBAT_RATE : NON_COMBAT_RATE;

  const total = Math.floor((days - 30) / 10) * rate;
  return Math.min(getMaxMonthApproval(isCombat), total);
};

export const getRemaining2023Days = (
  dateRanges: { startDate: Date; endDate: Date }[]
) => {
  const endOf2023 = new Date("2023-12-31");
  let totalDays = 0;

  // Count days for each date range in 2023
  dateRanges.forEach(({ startDate, endDate }) => {
    if (isBefore(startDate, endOf2023) || isSameDay(startDate, endOf2023)) {
      const start = startDate;
      const end = isBefore(endDate, endOf2023) ? endDate : endOf2023;

      totalDays += differenceInDays(end, start) + 1; // Add 1 to include both start and end dates
    }
  });

  // Calculate the remaining days
  const remainingDays = totalDays > 30 ? (totalDays - 30) % 10 : totalDays;

  return [remainingDays, Math.max(30 - totalDays, 0)];
};

export const calculateCompensationForEachMonthAfter24 = (
  isCombat: boolean,
  dateRanges: { startDate: Date; endDate: Date }[],
  remainingDays: number = 0,
  daysToGetTo30: number = 0,
  calculationFn: (isCombat: boolean, days: number) => number
) => {
  let daysToGetTo30Counter = daysToGetTo30;
  const startOf2024 = new Date("2024-01-01");
  let monthlyDaysCount = {} as { [key: string]: number };

  // Count days for each month in date ranges
  dateRanges.forEach(({ startDate, endDate }) => {
    if (isAfter(startDate, startOf2024) || isAfter(endDate, startOf2024)) {
      eachDayOfInterval({
        start: isAfter(startDate, startOf2024) ? startDate : startOf2024,
        end: endDate
      }).forEach((day) => {
        const yearMonth =
          getYear(day) + "-" + String(getMonth(day) + 1).padStart(2, "0");
        //  // daysToGetTo30Counter needs to go to 0

        if (daysToGetTo30Counter > 0) {
          daysToGetTo30Counter--;
        } else {
          // Increment the day count for the month
          monthlyDaysCount[yearMonth] = (monthlyDaysCount[yearMonth] || 0) + 1;
        }
      });
    }
  });

  // Calculate compensation for each month
  const compensationResults = [];
  let carryOverDays = remainingDays; // Initialize carryOverDays with remainingDays from the previous year

  const startYear = 2024;
  const endYear = getYear(
    max(Object.keys(monthlyDaysCount).map((yearMonth) => new Date(yearMonth)))
  );

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const yearMonth = `${year}-${String(month).padStart(2, "0")}`;
      const daysCount = monthlyDaysCount[yearMonth] || 0;
      const totalDays = daysCount + carryOverDays;

      const targetMonth = addMonths(new Date(Date.UTC(year, month - 1, 1)), 2); // Adjusting for the target month (+2 months)
      const totalCompensation = calculationFn(isCombat, totalDays);

      if (totalCompensation > 0) {
        compensationResults.push({
          month: targetMonth,
          total: totalCompensation
        });
      }

      carryOverDays = totalDays % 10; // Remaining days to carry over to the next month
    }
  }

  return compensationResults;
};

export const getMonthlyAfter24Compensation = (
  isCombat: boolean,
  dateRanges: { startDate: Date; endDate: Date }[],
  remainingDays: number = 0,
  daysToGetTo30: number = 0
) =>
  calculateCompensationForEachMonthAfter24(
    isCombat,
    dateRanges,
    remainingDays,
    daysToGetTo30,
    calculateMonthlyCompensation
  );

export const getFromChildrenMonthlyAfter24 = (
  isCombat: boolean,
  dateRanges: { startDate: Date; endDate: Date }[],
  remainingDays: number = 0,
  daysToGetTo30: number = 0
) =>
  calculateCompensationForEachMonthAfter24(
    isCombat,
    dateRanges,
    remainingDays,
    daysToGetTo30,
    calculateChildrenCompensation
  );

export const calculateChildrenCompensation2023 = (
  isCombat: boolean,
  days: number
) => {
  // 833 for combat for each 10 days
  //500 for non combat for each 10 days
  if (days < 40) return 0;

  const rate = isCombat ? 833 : 500;
  const total = Math.floor((days - 30) / 10) * rate;
  return Math.min(total, getMaxChildApproval(isCombat));
};

export const calculateChildrenCompensation = (
  isCombat: boolean,
  days: number
) => {
  // 833 for combat for each 10 days
  //500 for non combat for each 10 days
  const rate = isCombat ? 833 : 500;
  return Math.floor(days / 10) * rate;
};

export const operation24Calculation = (operation24Days: number) => {
  // 100 per day for first 10 days
  // extra 150 per day for 11 to 20 days
  // extra 200 per day from 21 and on
  if (operation24Days <= 0) return 0;

  let totalAmount = 0;

  // Calculate for the first 10 days
  const firstTierDays = Math.min(operation24Days, 10);
  totalAmount += firstTierDays * 100;

  // Calculate for days 11 to 20
  if (operation24Days > 10) {
    const secondTierDays = Math.min(operation24Days - 10, 10);
    totalAmount += secondTierDays * 150; // 100 + 150
  }

  // Calculate for days 21 and beyond
  if (operation24Days > 20) {
    const thirdTierDays = operation24Days - 20;
    totalAmount += thirdTierDays * 200; // 100 + 200
  }

  return totalAmount;
};

export const totalDaysInRange = (startDate: Date, endDate: Date) => {
  return Math.max(differenceInCalendarDays(endDate, startDate) + 1, 0);
};

export const isOneRangeMoreThan5DaysLessThan9 = (
  dateRanges: {
    startDate: Date;
    endDate: Date;
  }[]
) => {
  return dateRanges.some(({ startDate, endDate }) => {
    const totalDays = totalDaysInRange(startDate, endDate);
    return totalDays >= 5 && totalDays <= 9;
  });
};

export const isOneRangeMoreThan5Days = (
  dateRanges: {
    startDate: Date;
    endDate: Date;
  }[]
) => {
  return dateRanges.some(({ startDate, endDate }) => {
    const totalDays = totalDaysInRange(startDate, endDate);
    return totalDays >= 5;
  });
};

export const getTotalDaysIn = (
  dateRanges: {
    startDate: Date;
    endDate: Date;
  }[],
  startDate: Date,
  endDate: Date
) => {
  let totalDays = 0;

  dateRanges.forEach((range) => {
    if (range.endDate < startDate || range.startDate > endDate) {
      return;
    }

    const start = max([startDate, range.startDate]);
    const end = min([endDate, range.endDate]);

    totalDays += totalDaysInRange(start, end);
  });

  return totalDays;
};

export const getTotalDaysInYear = (
  dateRanges: {
    startDate: Date;
    endDate: Date;
  }[],
  year: number
) => {
  const startDate = startOfYear(new Date(`${year}/01/01`));
  const endDate = endOfYear(new Date(`${year}/01/01`));

  return getTotalDaysIn(dateRanges, startDate, endDate);
};

export const calculateAdditionalCompensation = (totalDays: number) => {
  // 10-14.5 = 1452
  // 15-19.5 = 2904
  // 20-36.5 = 4356
  //37 and above = 5808
  // did you do 5-9 days straight 266

  if (totalDays >= 10 && totalDays <= 14.5) {
    return 1452;
  } else if (totalDays >= 15 && totalDays <= 19.5) {
    return 2904;
  } else if (totalDays >= 20 && totalDays <= 36.5) {
    return 4356;
  } else if (totalDays >= 37) {
    return 5808;
  }
  return 0;
};

export const specialGrantCalculation = (
  daysBefore: number,
  daysInWar: number,
  daysStraight: boolean
) => {
  // Special Grant
  const specialDays = Math.min(Math.max(daysBefore - 32, 0), 28);
  let totalSpecialDaysTotal = specialDays * GRANT_DAILY_RATE;

  let extendedDays = 0;
  if (daysBefore >= 60) {
    extendedDays = daysInWar;
  } else if (daysBefore > 32) {
    extendedDays = Math.max(daysInWar - specialDays, 0);
  } else {
    extendedDays = Math.max(daysInWar - (31 - daysBefore), 0);
  }

  totalSpecialDaysTotal += extendedDays * GRANT_DAILY_RATE;

  const totalDaysStraight = daysStraight ? 266 : 0;

  return {
    totalDaysStraight,
    totalSpecialDaysTotal
  };
};

const getStudentCourseCompensation = (daysInWar: number) => {
  // between 5-10 war days 1000
  // between 11-20 war days 1500
  // < 20 war days 2000
  if (daysInWar < 5) return 0;
  if (daysInWar < 11) return 1000;
  if (daysInWar < 21) return 1500;

  return 2000;
};

const calculateSpecialDaysPayments = (
  dateRanges: { startDate: Date; endDate: Date }[],
  serviceBefore: number,
  daysIn2023: number
): {
  totalSpecialDaysPayedIn24Total: number;
  totalSpecialDaysPayedIn25Total: number;
  specialDaysIn2024Dates: Array<{
    payMonth: number;
    total: number;
    label: string;
  }>;
} => {
  let totalSpecialDaysPayedIn24Total = 0;
  let totalSpecialDaysPayedIn25Total = 0;
  let specialDaysIn2024Dates: Array<{
    payMonth: number;
    total: number;
    label: string;
  }> = [];
  if (daysIn2023 + serviceBefore >= 32) {
    const { totalSpecialDaysTotal: totalSpecialDaysPayedIn24 } =
      specialGrantCalculation(serviceBefore, daysIn2023, false);

    const totalDaysForSpecialDays24 = getTotalDaysIn(
      dateRanges,
      new Date("2024-01-01"),
      new Date("2024-03-31")
    );
    totalSpecialDaysPayedIn24Total =
      totalDaysForSpecialDays24 * GRANT_DAILY_RATE + totalSpecialDaysPayedIn24;

    specialDaysIn2024Dates = [4, 5, 6, 7, 8, 9, 10, 11, 12]
      .map((month) => {
        const totalDaysInMonth = getTotalDaysIn(
          dateRanges,
          startOfMonth(new Date(`2024-${month}-01`)),
          endOfMonth(new Date(`2024-${month}-01`))
        );

        const label = `התגמול המיוחד ${getMonthNameHebrew(month - 1)} 24`;
        return {
          payMonth: month - 1,
          total: totalDaysInMonth * GRANT_DAILY_RATE,
          label
        };
      })
      .filter(({ total }) => total > 0);
  } else {
    if (daysIn2023 > 0) {
      const totalDaysFor24 = getTotalDaysIn(
        dateRanges,
        startOfMonth(new Date(`2023-10-07`)),
        endOfMonth(new Date(`2024-03-31`))
      );
      const { totalSpecialDaysTotal: totalSpecialDaysPayedIn24 } =
        specialGrantCalculation(serviceBefore, totalDaysFor24, false);
      totalSpecialDaysPayedIn24Total = totalSpecialDaysPayedIn24;

      const totalDaysFor25 = getTotalDaysIn(
        dateRanges,
        startOfMonth(new Date(`2024-04-01`)),
        endOfMonth(new Date(`2024-12-31`))
      );
      const { totalSpecialDaysTotal: totalSpecialDaysPayedIn25 } =
        specialGrantCalculation(0, totalDaysFor25, false);
      totalSpecialDaysPayedIn25Total = totalSpecialDaysPayedIn25;
    } else {
      totalSpecialDaysPayedIn24Total = 0;
      const totalDaysFor25 = getTotalDaysIn(
        dateRanges,
        startOfMonth(new Date(`2024-01-01`)),
        endOfMonth(new Date(`2024-12-31`))
      );
      const { totalSpecialDaysTotal: totalSpecialDaysPayedIn25 } =
        specialGrantCalculation(0, totalDaysFor25, false);
      totalSpecialDaysPayedIn25Total = totalSpecialDaysPayedIn25;
    }
  }

  return {
    totalSpecialDaysPayedIn24Total,
    totalSpecialDaysPayedIn25Total,
    specialDaysIn2024Dates
  };
};

export const calculateCompensation = (inputs: {
  dateRanges: DateRange[];
  isCombat: boolean;
  hasChildren: boolean;
  hasChildrenSpecial: boolean;
  isOld: boolean;
  isStudent: boolean;
  serviceBefore: string;
}) => {
  const {
    dateRanges: dateRangesString,
    isCombat,
    hasChildren,
    hasChildrenSpecial,
    isOld,
    isStudent,
    serviceBefore: serviceBeforeString
  } = inputs;

  // date Ranges to dates
  const dateRanges = dateRangesString.map((dateRange) => {
    return {
      startDate: new Date(dateRange.startDate),
      endDate: new Date(dateRange.endDate)
    };
  });

  const serviceBefore = parseFloat(serviceBeforeString);

  const isDaysStraightInWar = isOneRangeMoreThan5DaysLessThan9(dateRanges);

  const moreThan5DaysInWar = isOneRangeMoreThan5Days(dateRanges);

  const totalWarPersonalExpenses = moreThan5DaysInWar ? 1100 : 0;
  const totalWarFamilyExpenses = hasChildren && moreThan5DaysInWar ? 2000 : 0;

  const daysInWar = calculateDays(dateRanges);
  const daysIn2023 = getTotalDaysInYear(dateRanges, 2023);
  const totalDays2024 = getTotalDaysInYear(dateRanges, 2024);

  const { totalDaysStraight } = specialGrantCalculation(
    serviceBefore,
    daysInWar,
    isDaysStraightInWar
  );

  const {
    totalSpecialDaysPayedIn24Total,
    totalSpecialDaysPayedIn25Total,
    specialDaysIn2024Dates
  } = calculateSpecialDaysPayments(dateRanges, serviceBefore, daysIn2023);

  const totalAdditional2023 = calculateAdditionalCompensation(daysIn2023);
  const totalAdditional2024 = calculateAdditionalCompensation(totalDays2024);

  const [remaining2023Days, daysToGetTo30] = getRemaining2023Days(dateRanges);

  const totalPerMonth =
    daysInWar >= 40
      ? calculateMonthlyCompensation2023(isCombat, daysIn2023)
      : 0;
  const totalPerMonthMonthlyAfter24 =
    daysInWar >= 40
      ? getMonthlyAfter24Compensation(
          isCombat,
          dateRanges,
          remaining2023Days,
          daysToGetTo30
        )
      : [];

  const totalMoreThan45 = isCombat && daysInWar > 45 ? 2500 : 1250;

  const totalFromChildren =
    hasChildren && daysInWar >= 40
      ? calculateChildrenCompensation2023(isCombat, daysIn2023)
      : 0;

  const totalFromChildrenMonthlyAfter24 =
    hasChildren && daysInWar >= 40
      ? getFromChildrenMonthlyAfter24(
          isCombat,
          dateRanges,
          remaining2023Days,
          daysToGetTo30
        )
      : [];

  const totalVacation = calculateVacation(daysInWar, hasChildren, isCombat);
  const totalSpecialChildren = hasChildrenSpecial
    ? SPECIAL_NEEDS_COMPENSATION
    : 0;

  const totalMental = daysInWar > 30 ? MENTAL_HEALTH_COMPENSATION : 0;
  const totalFamilyCare = FAMILY_CARE_COMPENSATION;
  const totalStudentCourse = isStudent
    ? getStudentCourseCompensation(daysInWar)
    : 0;

  // Old 2024
  const totalOld2024 = isOld
    ? Math.min(GRANT_DAILY_RATE * 60, totalSpecialDaysPayedIn24Total)
    : 0;

  // Old 2025
  const totalOld2025 = isOld
    ? Math.min(
        GRANT_DAILY_RATE * 60,
        specialDaysIn2024Dates.reduce((acc, { total }) => acc + total, 0)
      )
    : 0;

  return {
    totalPerMonth,
    totalPerMonthMonthlyAfter24,
    totalMoreThan45,
    totalFromChildren,
    totalFromChildrenMonthlyAfter24,
    totalVacation,
    totalSpecialChildren,
    totalMental,
    totalFamilyCare,
    totalSpecialDaysPayedIn24Total,
    totalSpecialDaysPayedIn25Total,
    specialDaysIn2024Dates,
    totalAdditional2023,
    totalAdditional2024,
    totalDaysStraight,
    totalOld2024,
    totalOld2025,
    totalWarPersonalExpenses,
    totalWarFamilyExpenses,
    totalStudentCourse
  };
};
