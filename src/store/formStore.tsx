import { StateCreator } from "zustand";
import { FormStore, FormValues } from "./types";

export const createFormStore: StateCreator<FormStore, [], [], FormStore> = (
  set,
  get,
) => ({
  dateRanges: [
    {
      startDate: "2023-10-07",
      endDate: new Date().toISOString().split("T")[0],
    },
  ],

  isCombat: false,
  hasChildren: false,
  hasChildrenSpecial: false,
  isOld: false,
  isStudent: false,
  isIndependent: false, // סיוע לעצמאים
  didVacationCancelled: false, // פיצוי בגין טיסות / ביטול חופשות

  serviceBefore: "0",
  operation24Days: "0",

  // Function to update form states
  setFormState: (data: FormValues) => {
    set(data);
    get().saveStateToUrl();
  },

  // Results and alerts
  validationErrors: [],

  setValidationErrors: (errors: string[]) => {
    set({ validationErrors: errors });
  },

  hasValidationErrors: () => {
    return get().validationErrors.length > 0;
  },

  // Function to save form state to URL query
  saveStateToUrl: () => {
    const state = get();

    // Create a URLSearchParams object from the current URL
    const currentParams = new URLSearchParams(window.location.search);

    // Update the parameters with the new state values
    currentParams.set("serviceBefore", state.serviceBefore);
    currentParams.set("dateRanges", JSON.stringify(state.dateRanges));
    currentParams.set("isCombat", state.isCombat.toString());
    currentParams.set("hasChildren", state.hasChildren.toString());
    currentParams.set(
      "hasChildrenSpecial",
      state.hasChildrenSpecial.toString(),
    );
    currentParams.set(
      "didVacationCancelled",
      state.didVacationCancelled.toString(),
    );
    currentParams.set("isOld", state.isOld.toString());
    currentParams.set("isStudent", state.isStudent.toString());
    currentParams.set("isIndependent", state.isIndependent.toString());

    // Update the URL with the new query parameters
    window.history.pushState({}, "", "?" + currentParams.toString());
  },

  // Function to load form state from URL query
  loadStateFromUrl: () => {
    const queryParams = new URLSearchParams(window.location.search);
    set((state) => ({
      // Read each query parameter and update the state
      serviceBefore: queryParams.get("serviceBefore") || state.serviceBefore,
      isCombat: queryParams.get("isCombat") === "true" ? true : state.isCombat,
      hasChildren:
        queryParams.get("hasChildren") === "true" ? true : state.hasChildren,
      hasChildrenSpecial: queryParams.get("hasChildrenSpecial")
        ? true
        : state.hasChildrenSpecial,
      isOld: queryParams.get("isOld") === "true" ? true : state.isOld,
      isStudent:
        queryParams.get("isStudent") === "true" ? true : state.isStudent,
      isIndependent:
        queryParams.get("isIndependent") === "true"
          ? true
          : state.isIndependent,
      didVacationCancelled: queryParams.get("didVacationCancelled")
        ? true
        : state.didVacationCancelled,
      dateRanges: queryParams.get("dateRanges")
        ? JSON.parse(queryParams.get("dateRanges") || "")
        : state.dateRanges,
    }));
  },
});
