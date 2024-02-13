export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface CalculatorResults {
  // Results
  totalPerMonth: number;
  totalMoreThan45: number;
  totalOperation24: number;
  totalFromChildren: number;
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
  operation24Days: string;
}

export interface FormStore extends FormValues {
  validationErrors: string[];
  setValidationErrors: (errors: string[]) => void;
  setFormState: (data: FormValues) => void;
  saveStateToUrl: () => void;
  loadStateFromUrl: () => void;
}

export interface CalculatorStore {
  updateCalculatorResults: () => void;
}
