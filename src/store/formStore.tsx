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

  // Function to update form states
  setFormState: (name: string, value: any) =>
    set((state) => ({ ...state, [name]: value })),

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
})
