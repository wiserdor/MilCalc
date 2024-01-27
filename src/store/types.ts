export interface DateRange {
  startDate: string
  endDate: string
}

export interface CalculatorResults {
  // Results
  totalPerMonth: number
  totalMoreThan45: number
  totalOperation24: number
  totalFromChildren: number
  totalVacation: number
  totalSpecialChildren: number
  totalMental: number
  totalFamilyCare: number
  totalSpecialDays: number
  totalExtended: number
  totalAdditional: number
  totalDaysStraight: number
  totalOld: number
  totalWarPersonalExpenses: number
  totalWarFamilyExpenses: number
  resultsIsStudent: boolean
  resultsIsCombat: boolean

  resetResults: () => void
}

export interface FormStore {
  isCombat: boolean
  isIndependent: boolean
  wifePregnant: boolean
  isUnemployed: boolean
  isSpouseUnemployed: boolean
  hasLostMoney: boolean
  hasLostMoneyBothServing: boolean
  isLivingAbroad: boolean
  didVacationCancelled: boolean
  personalEquipment: boolean
  dateRanges: DateRange[]
  hasChildren: boolean
  hasChildrenSpecial: boolean
  isStudent: boolean
  isOld: boolean
  serviceBefore: string
  operation24Days: string

  validationErrors: string[]

  setFormState: (name: string, value: any) => void
  validateAndSetErrors: () => void
}

export interface CalculatorStore {
  updateCalculatorResults: () => void
}
