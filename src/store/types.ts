export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface CalculatorResults {
  // Results
  totalPerMonth: number;
  totalPerMonthMonthlyAfter24: Array<{ month: Date; total: number }>;
  totalMoreThan45: number;
  totalFromChildren: number;
  totalFromChildrenMonthlyAfter24: Array<{ month: Date; total: number }>;
  totalVacation: number;
  totalSpecialChildren: number;
  totalMental: number;
  totalFamilyCare: number;
  totalSpecialDaysPayedIn24Total: number;
  totalSpecialDaysPayedIn25Total: number;
  specialDaysIn2024Dates: Array<{
    payMonth: number;
    total: number;
    label: string;
  }>;

  totalAdditional2023: number;
  totalAdditional2024: number;
  totalDaysStraight: number;
  totalOld2024: number;
  totalOld2025: number;
  totalWarPersonalExpenses: number;
  totalWarFamilyExpenses: number;
  totalStudentCourse: number;

  resetResults: () => void;
}

export interface FormValues {
  isCombat: boolean;
  isIndependent: boolean;
  didVacationCancelled: boolean;
  dateRanges: DateRange[];
  hasChildren: boolean;
  hasChildrenSpecial: boolean;
  isStudent: boolean;
  isOld: boolean;
  serviceBefore: string;
}

export interface FormStore extends FormValues {
  validationErrors: string[];
  setValidationErrors: (errors: string[]) => void;
  setFormState: (data: FormValues) => void;
  saveStateToUrl: () => void;
}

export interface CalculatorStore {
  updateCalculatorResults: () => void;
}

export interface GlobalStore {
  adSelected: string;
}
