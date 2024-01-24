import { create } from 'zustand'
import { createCalculatorResultsStore } from './calculatorResultsStore'
import { createCalculatorStore } from './calculatorStore'
import { CalculatorResults, CalculatorStore, FormStore } from './types'
import { createFormStore } from './formStore'

const useStore = create<CalculatorResults & FormStore & CalculatorStore>()(
  (...a) => ({
    ...createCalculatorResultsStore(...a),
    ...createFormStore(...a),
    ...createCalculatorStore(...a),
  })
)

export default useStore
