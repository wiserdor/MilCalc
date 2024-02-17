import {
  endOfYear,
  max,
  min,
  startOfYear,
  differenceInCalendarDays
} from "date-fns";
import { DateRange } from "../store/types";
import {
  COMBAT_RATE,
  FAMILY_CARE_COMPENSATION,
  GRANT_DAILY_RATE,
  MENTAL_HEALTH_COMPENSATION,
  NON_COMBAT_RATE,
  SPECIAL_NEEDS_COMPENSATION
} from "./constants";
import {
  getMaxChildApproval,
  getMaxMonthApproval
} from "../components/Results/constants";

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
  if (days < 40) return 0;
  const rate = isCombat ? COMBAT_RATE : NON_COMBAT_RATE;

  const total = Math.floor((days - 30) / 10) * rate;
  return Math.min(getMaxMonthApproval(isCombat), total);
};

export const calculateChildrenCompensation = (
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

export const getTotalDaysIn2023 = (
  dateRanges: {
    startDate: Date;
    endDate: Date;
  }[]
) => {
  let totalDays = 0;
  const start2023 = startOfYear(new Date("2023/01/01"));
  const end2023 = endOfYear(new Date("2023/01/01"));

  dateRanges.forEach((range) => {
    if (range.endDate < start2023 || range.startDate > end2023) {
      return 0;
    }

    if (range.startDate.getFullYear() < 2023) return;

    const start = max([start2023, range.startDate]);
    const end = min([end2023, range.endDate]);

    totalDays += totalDaysInRange(start, end);
  });

  return totalDays;
};

export const getTotalDaysInWar2023 = (
  dateRanges: {
    startDate: Date;
    endDate: Date;
  }[]
) => {
  let totalDays = 0;
  const start2023 = new Date("2023/10/07");
  const end2023 = endOfYear(new Date("2023/01/01"));

  dateRanges.forEach((range) => {
    if (range.endDate < start2023 || range.startDate > end2023) {
      return 0;
    }

    if (range.startDate.getFullYear() < 2023) return;

    const start = max([start2023, range.startDate]);
    const end = min([end2023, range.endDate]);

    totalDays += totalDaysInRange(start, end);
  });

  return totalDays;
};

export const specialGrantCalculation = (
  daysBefore: number,
  daysInWar: number,
  daysStraight: boolean,
  isOld: boolean
) => {
  // 10-14.5 = 1452
  // 15-19.5 = 2904
  // 20-36.5 = 4356
  //37 and above = 5808
  // did you do 5-9 days straight 266
  const totalDays = daysBefore + daysInWar;

  let totalAdditional = 0;
  if (totalDays >= 10 && totalDays <= 14.5) {
    totalAdditional = 1452;
  } else if (totalDays >= 15 && totalDays <= 19.5) {
    totalAdditional = 2904;
  } else if (totalDays >= 20 && totalDays <= 36.5) {
    totalAdditional = 4356;
  } else if (totalDays >= 37) {
    totalAdditional = 5808;
  }

  if (isOld) {
    return {
      totalSpecialDays: 0,
      totalExtended: 0,
      totalAdditional,
      totalDaysStraight: 0,
      totalOld: totalDays * 133
    };
  }

  // Special Grant
  const specialDays = Math.min(Math.max(daysBefore - 32, 0), 28);
  let totalSpecialDays = specialDays * GRANT_DAILY_RATE;

  let extendedDays = 0;
  if (daysBefore >= 60) {
    extendedDays = daysInWar;
  } else if (daysBefore > 32) {
    extendedDays = Math.max(daysInWar - specialDays, 0);
  } else {
    extendedDays = Math.max(daysInWar - (31 - daysBefore), 0);
  }

  const totalExtended = extendedDays * GRANT_DAILY_RATE;

  const totalDaysStraight = daysStraight ? 266 : 0;

  return {
    totalDaysStraight,
    totalSpecialDays,
    totalExtended,
    totalAdditional
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
  const daysInWar2023 = getTotalDaysIn2023(dateRanges);

  const {
    totalSpecialDays,
    totalExtended,
    totalAdditional,
    totalDaysStraight,
    totalOld
  } = specialGrantCalculation(
    serviceBefore,
    daysInWar,
    isDaysStraightInWar,
    isOld
  );

  let totalPerMonth = calculateMonthlyCompensation(isCombat, daysInWar2023);

  const daysWarIn2023 = getTotalDaysIn2023(dateRanges);

  let totalMoreThan45 = isCombat && daysInWar > 45 ? 2500 : 1250;

  let totalFromChildren = hasChildren
    ? calculateChildrenCompensation(isCombat, daysWarIn2023)
    : 0;

  let totalVacation = calculateVacation(daysInWar, hasChildren, isCombat);
  let totalSpecialChildren = hasChildrenSpecial
    ? SPECIAL_NEEDS_COMPENSATION
    : 0;

  let totalMental = daysInWar > 30 ? MENTAL_HEALTH_COMPENSATION : 0;
  let totalFamilyCare = FAMILY_CARE_COMPENSATION;
  const totalStudentCourse = isStudent
    ? getStudentCourseCompensation(daysInWar)
    : 0;

  let totalDedication = 0;

  return {
    totalPerMonth,
    totalMoreThan45,
    totalFromChildren,
    totalVacation,
    totalSpecialChildren,
    totalMental,
    totalFamilyCare,
    totalDedication,
    totalSpecialDays,
    totalExtended,
    totalAdditional,
    totalDaysStraight,
    totalOld,
    totalWarPersonalExpenses,
    totalWarFamilyExpenses,
    totalStudentCourse
  };
};
