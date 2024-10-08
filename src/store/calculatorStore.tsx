import { StateCreator } from "zustand";
import { CalculatorResults, CalculatorStore, FormStore } from "./types";
import { calculateCompensation } from "../calculator";

export const createCalculatorStore: StateCreator<
  CalculatorResults & FormStore,
  [],
  [],
  CalculatorStore
> = (set, get) => ({
  updateCalculatorResults: () => {
    const state = get();
    if (state.validationErrors.length > 0) {
      state.resetResults();
      return;
    }

    const totals = calculateCompensation({
      isCombat: state.isCombat,
      dateRanges: state.dateRanges,
      hasChildren: state.hasChildren,
      hasChildrenSpecial: state.hasChildrenSpecial,
      serviceBefore: state.serviceBefore,
      isStudent: state.isStudent,
      isOld: state.isOld
    });

    set({
      ...totals
    });
  }
});
