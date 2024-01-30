import { StateCreator } from 'zustand'
import { validateForm } from '../components/Form/validation'
import { FormStore } from './types'

export const createFormStore: StateCreator<FormStore, [], [], FormStore> = (
  set,
  get
) => ({
  dateRanges: [
    {
      startDate: '2023-10-07',
      endDate: new Date().toISOString().split('T')[0],
    },
  ],

  isCombat: false,
  hasChildren: false,
  hasChildrenSpecial: false,
  isOld: false,
  isStudent: false,

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

  // Function to update form states
  setFormState: (name: string, value: any) => {
    set((state) => ({ ...state, [name]: value }))
    get().saveStateToUrl()
  },

  // Results and alerts
  validationErrors: [],

  validateAndSetErrors: () => {
    const state = get()
    const errors = validateForm(
      state.dateRanges,
      state.serviceBefore,
      state.operation24Days
    )
    set({ validationErrors: errors })
  },

  hasValidationErrors: () => {
    return get().validationErrors.length > 0
  },

  // Function to save form state to URL query
  saveStateToUrl: () => {
    const state = get()

    // Create a URLSearchParams object from the current URL
    const currentParams = new URLSearchParams(window.location.search)

    // Update the parameters with the new state values
    currentParams.set('serviceBefore', state.serviceBefore)
    currentParams.set('dateRanges', JSON.stringify(state.dateRanges))
    currentParams.set('isCombat', state.isCombat.toString())
    currentParams.set('hasChildren', state.hasChildren.toString())
    currentParams.set('hasChildrenSpecial', state.hasChildrenSpecial.toString())
    currentParams.set('isOld', state.isOld.toString())
    currentParams.set('isStudent', state.isStudent.toString())
    currentParams.set('isIndependent', state.isIndependent.toString())

    // Update the URL with the new query parameters
    window.history.pushState({}, '', '?' + currentParams.toString())
  },

  // Function to load form state from URL query
  loadStateFromUrl: () => {
    const queryParams = new URLSearchParams(window.location.search)
    set((state) => ({
      // Read each query parameter and update the state
      serviceBefore: queryParams.get('serviceBefore') || state.serviceBefore,
      isCombat: queryParams.get('isCombat') === 'true' ? true : state.isCombat,
      hasChildren:
        queryParams.get('hasChildren') === 'true' ? true : state.hasChildren,
      hasChildrenSpecial: queryParams.get('hasChildrenSpecial')
        ? true
        : state.hasChildrenSpecial,
      isOld: queryParams.get('isOld') === 'true' ? true : state.isOld,
      isStudent:
        queryParams.get('isStudent') === 'true' ? true : state.isStudent,
      isIndependent:
        queryParams.get('isIndependent') === 'true'
          ? true
          : state.isIndependent,
      dateRanges: queryParams.get('dateRanges')
        ? JSON.parse(queryParams.get('dateRanges') || '')
        : state.dateRanges,
    }))
  },
})
