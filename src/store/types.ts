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
  totalSpecialDays: number;
  totalExtended: number;
  totalAdditional: number;
  totalDaysStraight: number;
  totalOld: number;
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
