import { StateCreator } from 'zustand'
import { CalculatorResults, CalculatorStore, FormStore } from './types'
import { calculateCompensation } from '../calculator'

export const createCalculatorStore: StateCreator<
  CalculatorResults & FormStore,
  [],
  [],
  CalculatorStore
> = (set, get) => ({
  updateCalculatorResults: () => {
    const state = get()
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
})
