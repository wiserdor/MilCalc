import { create } from 'zustand'
import { validateForm } from '../components/Form/validation'
import { calculateCompensation } from '../calculator'
import { CalculatorResults, DateRange } from './types'

export interface CalculatorState extends CalculatorResults {
  // Form states
  isCombat: boolean
  isDaysStraight: boolean
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
  resultsIsStudent: boolean
  resultsIsCombat: boolean

  // Function to update form states
  setFormState: (name: string, value: any) => void

  validationErrors: string[]

  resetResults: () => void
  validateAndSetErrors: () => void

  // Function to calculate and update compensation
  updateCalculatorResults: () => void
}

const useStore = create<CalculatorState>((set) => ({
  dateRanges: [
    {
      startDate: '2023-10-07',
      endDate: new Date().toISOString().split('T')[0],
    },
  ],
  startDate: '2023-10-07',
  endDate: new Date().toISOString().split('T')[0],

  isCombat: false,
  isDaysStraight: false,
  hasChildren: false,
  hasChildrenSpecial: false,
  isOld: false,

  isStudent: false, // אוכלוסיית הסטודנטים
  isIndependent: false, // סיוע לעצמאים
  wifePregnant: false, // מענק לבת זוג שלא חזרה מחל"ד
  isUnemployed: false, // מענק חד"פ למשרתי המילואים שאינם עובדים
  isSpouseUnemployed: false, // מענק חד"פ לבן/בת זוג שאינו עובד
  hasLostMoney: false, // אובדן הכנסה של בן/בת זוג נוכחיים
  hasLostMoneyBothServing: false, // אובדן הכנסה כששני בני הזוג משרתים
  isLivingAbroad: false, // משרתי מילואים שמרכז חייהם בחו"ל
  didVacationCancelled: false, // פיצוי בגין טיסות / ביטול חופשות
  personalEquipment: false, // מענה על אובדן או נזק לציוד אישי

  serviceBefore: '0',
  operation24Days: '0',

  // Results
  totalPerMonth: 0,
  totalMoreThan45: 0,
  totalOperation24: 0,
  totalFromChildren: 0,
  totalVacation: 0,
  totalSpecialChildren: 0,
  totalMental: 0,
  totalFamilyCare: 0,
  totalSpecialDays: 0,
  totalExtended: 0,
  totalAdditional: 0,
  totalDaysStraight: 0,
  totalOld: 0,
  resultsIsStudent: false,
  resultsIsCombat: false,

  // Function to update form states
  setFormState: (name: string, value: any) =>
    set((state) => ({ ...state, [name]: value })),

  // Results and alerts
  validationErrors: [],

  validateAndSetErrors: () => {
    const state = useStore.getState()
    const errors = validateForm(
      state.dateRanges,
      state.serviceBefore,
      state.operation24Days
    )
    set({ validationErrors: errors })
  },

  hasValidationErrors: () => {
    return useStore.getState().validationErrors.length > 0
  },

  resetResults: () => {
    set({
      totalPerMonth: 0,
      totalMoreThan45: 0,
      totalOperation24: 0,
      totalFromChildren: 0,
      totalVacation: 0,
      totalSpecialChildren: 0,
      totalMental: 0,
      totalFamilyCare: 0,
      totalSpecialDays: 0,
      totalExtended: 0,
      totalAdditional: 0,
      totalDaysStraight: 0,
      resultsIsStudent: false,
      resultsIsCombat: false,
    })
  },

  // Function to calculate and update compensation
  updateCalculatorResults: () => {
    const state = useStore.getState()
    if (state.validationErrors.length > 0) {
      state.resetResults()
      return
    }

    const {
      totalPerMonth,
      totalMoreThan45,
      totalOperation24,
      totalFromChildren,
      totalVacation,
      totalSpecialChildren,
      totalMental,
      totalFamilyCare,
      totalSpecialDays,
      totalExtended,
      totalAdditional,
      totalDaysStraight,
      totalOld,
    } = calculateCompensation({
      isCombat: state.isCombat,
      isDaysStraight: state.isDaysStraight,
      dateRanges: state.dateRanges,
      hasChildren: state.hasChildren,
      hasChildrenSpecial: state.hasChildrenSpecial,
      serviceBefore: state.serviceBefore,
      operation24Days: state.operation24Days,
      isOld: state.isOld,
    })

    set({
      totalPerMonth,
      totalMoreThan45,
      totalOperation24,
      totalFromChildren,
      totalVacation,
      totalSpecialChildren,
      totalMental,
      totalFamilyCare,
      totalSpecialDays,
      totalExtended,
      totalAdditional,
      totalDaysStraight,
      totalOld,
      resultsIsCombat: state.isCombat,
      resultsIsStudent: state.isStudent,
    })
  },
}))

export default useStore
