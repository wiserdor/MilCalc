// store.js
import { create } from 'zustand'
import { validateForm } from './components/Form/validation'
import { calculateCompensation } from './calculator'

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
  compensationPerYear: number[]
}

export interface CalculatorState extends CalculatorResults {
  // Form states
  isCombat: boolean
  startDate: string
  endDate: string
  hasChildren: boolean
  hasChildrenSpecial: boolean
  isStudent: boolean
  serviceBefore: string
  didOperation24: boolean

  // Function to update form states
  setFormState: (name: string, value: any) => void

  validationErrors: string[]

  resetResults: () => void
  validateAndSetErrors: () => void

  // Function to calculate and update compensation
  updateCalculatorResults: () => void
}

const useStore = create<CalculatorState>((set) => ({
  // Form states
  isCombat: false,
  startDate: '2023-10-07',
  endDate: new Date().toISOString().split('T')[0],
  hasChildren: false,
  hasChildrenSpecial: false,
  isStudent: false,
  serviceBefore: '0',
  didOperation24: false,

  // Results
  totalPerMonth: 0,
  totalMoreThan45: 0,
  totalOperation24: 0,
  totalFromChildren: 0,
  totalVacation: 0,
  totalSpecialChildren: 0,
  totalMental: 0,
  totalFamilyCare: 0,
  compensationPerYear: [],

  // Function to update form states
  setFormState: (name: string, value: any) =>
    set((state) => ({ ...state, [name]: value })),

  // Results and alerts
  validationErrors: [],

  validateAndSetErrors: () => {
    const state = useStore.getState()
    const errors = validateForm(
      state.startDate,
      state.endDate,
      state.serviceBefore.toString()
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
      compensationPerYear: [],
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
      compensationPerYear,
    } = calculateCompensation({
      isCombat: state.isCombat,
      startDate: state.startDate,
      endDate: state.endDate,
      hasChildren: state.hasChildren,
      hasChildrenSpecial: state.hasChildrenSpecial,
      serviceBefore: state.serviceBefore,
      didOperation24: state.didOperation24,
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
      compensationPerYear,
    })
  },
}))

export default useStore
