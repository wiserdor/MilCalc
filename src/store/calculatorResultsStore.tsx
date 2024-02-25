import { StateCreator } from "zustand";
import { CalculatorResults } from "./types";

export const createCalculatorResultsStore: StateCreator<
  CalculatorResults,
  [],
  [],
  CalculatorResults
> = (set) => ({
  totalPerMonth: 0, // מענק הוצאות אישיות מוגדל
  totalPerMonthMonthlyAfter24: [],
  totalFromChildren: 0,
  totalFromChildrenMonthlyAfter24: [],
  totalMoreThan45: 0,
  totalVacation: 0,
  totalSpecialChildren: 0,
  totalMental: 0,
  totalFamilyCare: 0,
  totalSpecialDays: 0,
  totalExtended: 0,
  totalAdditional: 0,
  totalDaysStraight: 0,
  totalOld: 0,
  totalWarFamilyExpenses: 0,
  totalWarPersonalExpenses: 0,
  totalStudentCourse: 0,

  resetResults: () => {
    set({
      totalPerMonth: 0,
      totalMoreThan45: 0,
      totalFromChildren: 0,
      totalVacation: 0,
      totalSpecialChildren: 0,
      totalMental: 0,
      totalFamilyCare: 0,
      totalSpecialDays: 0,
      totalExtended: 0,
      totalOld: 0,
      totalAdditional: 0,
      totalDaysStraight: 0,
      totalStudentCourse: 0
    });
  }
});
