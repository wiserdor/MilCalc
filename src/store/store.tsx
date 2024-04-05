import { create } from "zustand";
import { createCalculatorResultsStore } from "./calculatorResultsStore";
import { createCalculatorStore } from "./calculatorStore";
import {
  CalculatorResults,
  CalculatorStore,
  FormStore,
  GlobalStore
} from "./types";
import { createFormStore } from "./formStore";
import { createGlobalStore } from "./globalStore";

const useStore = create<
  CalculatorResults & FormStore & CalculatorStore & GlobalStore
>()((...a) => ({
  ...createCalculatorResultsStore(...a),
  ...createFormStore(...a),
  ...createCalculatorStore(...a),
  ...createGlobalStore(...a)
}));

export default useStore;
