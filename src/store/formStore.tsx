import { StateCreator } from "zustand";
import { FormStore, FormValues } from "./types";

const DEFAULT_DATE_RANGE = [
  {
    startDate: "2023-10-07",
    endDate: new Date().toISOString().split("T")[0],
  },
];

const getQueryParams = () => {
  try {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams;
  } catch {
    // change url to be valid
    window.history.pushState({}, "", "?");
    return new URLSearchParams(window.location.search);
  }
};

const queryParams = getQueryParams();
const parseDateRanges = () => {
  try {
    const dateRanges = queryParams.get("dateRanges");
    return dateRanges ? JSON.parse(dateRanges) : DEFAULT_DATE_RANGE;
  } catch {
    return DEFAULT_DATE_RANGE;
  }
};

export const createFormStore: StateCreator<FormStore, [], [], FormStore> = (
  set,
  get,
) => ({
  dateRanges: parseDateRanges(),

  isCombat: queryParams.get("isCombat") === "true",
  hasChildren: queryParams.get("hasChildren") === "true",
  hasChildrenSpecial: queryParams.get("hasChildrenSpecial") === "true",
  isOld: queryParams.get("isOld") === "true",
  isStudent: queryParams.get("isStudent") === "true",
  isIndependent: queryParams.get("isIndependent") === "true", // סיוע לעצמאים
  didVacationCancelled: queryParams.get("didVacationCancelled") === "true", // פיצוי בגין טיסות / ביטול חופשות

  serviceBefore: queryParams.get("serviceBefore") || "0",

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
});
