import {
  endOfYear,
  max,
  min,
  startOfYear,
  differenceInCalendarDays,
} from 'date-fns'
import { DateRange } from '../store/types'
import {
  COMBAT_RATE,
  GRANT_DAILY_RATE,
  NON_COMBAT_RATE,
} from './constants'
import {
  getAdditionalReward2023,
  getCombatGrant2024,
  getCouplesTherapyGrant,
  getExtendedFamilyGrant2023,
  getExtendedHomeEconomicsGrant,
  getPersonalExpensesGrant2023,
  getPersonalExpensesReward2023,
  getSpecialFamilyGrant,
  getSpecialReward2023, getTherapyGrant,
  getVacationVoucher,
} from './grants'

export const calculateVacation = (
  totalDays: number,
  hasChildren: boolean,
  isCombat: boolean
) => {
  if (totalDays < 60) return 0

  const baseVacation = isCombat ? 3500 : 1500
  const additionalForChildren = isCombat ? 1000 : 500

  return hasChildren ? baseVacation + additionalForChildren : baseVacation
}

export const calculateDays = (
  dateRanges: { startDate: Date; endDate: Date }[]
) => {
  let total = 0
  dateRanges.forEach(({ startDate, endDate }) => {
    total += totalDaysInRange(startDate, endDate)
  })

  return total
}

export const calculateMonthlyCompensation = (
  isCombat: boolean,
  days: number
) => {
  if (days < 40) return 0
  const rate = isCombat ? COMBAT_RATE : NON_COMBAT_RATE

  const total = Math.floor((days - 30) / 10) * rate
  return total
}

export const calculateChildrenCompensation = (
  isCombat: boolean,
  days: number
) => {
  // 833 for combat for each 10 days
  //500 for non combat for each 10 days
  if (days < 40) return 0
  const rate = isCombat ? 833 : 500
  const total = Math.floor((days - 30) / 10) * rate
  return total
}

export const operation24Calculation = (operation24Days: number) => {
  // 100 per day for first 10 days
  // extra 150 per day for 11 to 20 days
  // extra 200 per day from 21 and on
  if (operation24Days <= 0) return 0

  let totalAmount = 0

  // Calculate for the first 10 days
  const firstTierDays = Math.min(operation24Days, 10)
  totalAmount += firstTierDays * 100

  // Calculate for days 11 to 20
  if (operation24Days > 10) {
    const secondTierDays = Math.min(operation24Days - 10, 10)
    totalAmount += secondTierDays * 150 // 100 + 150
  }

  // Calculate for days 21 and beyond
  if (operation24Days > 20) {
    const thirdTierDays = operation24Days - 20
    totalAmount += thirdTierDays * 200 // 100 + 200
  }

  return totalAmount
}

export const totalDaysInRange = (startDate: Date, endDate: Date) => {
  return Math.max(differenceInCalendarDays(endDate, startDate) + 1, 0)
}

export const isOneRangeMoreThan5Days = (
  dateRanges: {
    startDate: Date
    endDate: Date
  }[]
) => {
  return dateRanges.some(
    ({ startDate, endDate }) => totalDaysInRange(startDate, endDate) >= 5
  )
}

export const getTotalDaysIn2023 = (
  dateRanges: {
    startDate: Date
    endDate: Date
  }[]
) => {
  let totalDays = 0
  const start2023 = startOfYear(new Date('2023-01-01'))
  const end2023 = endOfYear(new Date('2023-01-01'))

  dateRanges.forEach((range) => {
    if (range.endDate < start2023 || range.startDate > end2023) {
      return 0
    }

    if (range.startDate.getFullYear() < 2023) return

    const start = max([start2023, range.startDate])
    const end = min([end2023, range.endDate])

    totalDays += totalDaysInRange(start, end)
  })

  return totalDays
}

export const specialGrantCalculation = (
  daysBefore: number,
  daysInWar: number,
  daysStraight: boolean
) => {
  // 10-14.5 = 1410
  // 15-19.5 = 2820
  // 20-36.5 = 4230
  //37 and above = 5640
  // did you do 5-9 days straight 266
  const totalDays = daysBefore + daysInWar

  let totalAdditional = 0
  if (totalDays >= 10 && totalDays <= 14.5) {
    totalAdditional = 1410
  } else if (totalDays >= 15 && totalDays <= 19.5) {
    totalAdditional = 2820
  } else if (totalDays >= 20 && totalDays <= 36.5) {
    totalAdditional = 4230
  } else if (totalDays >= 37) {
    totalAdditional = 5640
  }

  // Special Grant
  const specialDays = Math.min(Math.max(daysBefore - 32, 0), 28)
  let totalSpecialDays = specialDays * GRANT_DAILY_RATE

  let extendedDays = 0
  if (daysBefore >= 60) {
    extendedDays = daysInWar
  } else if (daysBefore > 32) {
    extendedDays = Math.max(daysInWar - specialDays, 0)
  } else {
    extendedDays = Math.max(daysInWar - (31 - daysBefore), 0)
  }

  const totalExtended = extendedDays * GRANT_DAILY_RATE

  const totalDaysStraight = daysStraight ? 266 : 0

  return { totalDaysStraight, totalSpecialDays, totalExtended, totalAdditional }
}

export const calculateCompensation = (inputs: {
  dateRanges: DateRange[]
  operation24Days: string
  isCombat: boolean
  isDaysStraight: boolean
  hasChildren: boolean
  hasChildrenSpecial: boolean
  serviceBefore: string
}) => {
  const {
    dateRanges: dateRangesString,
    operation24Days: operation24DaysString,
    isCombat,
    isDaysStraight,
    hasChildren,
    hasChildrenSpecial,
    serviceBefore: serviceBeforeString,
  } = inputs

  // date Ranges to dates
  const dateRanges = dateRangesString.map((dateRange) => {
    return {
      startDate: new Date(dateRange.startDate),
      endDate: new Date(dateRange.endDate),
    }
  })

  const serviceBefore = parseFloat(serviceBeforeString)
  const operation24Days = parseFloat(operation24DaysString)

  const isDaysStraightInWar = isOneRangeMoreThan5Days(dateRanges)

  const daysInWar = calculateDays(dateRanges)

  const daysWarIn2023 = getTotalDaysIn2023(dateRanges)

  const profile = {
    isCombat : isCombat,
    haChildrenUnder14: hasChildren,
    hasSpecialChildren: hasChildrenSpecial,
    isCommander: false,
    isOld: false,
  }

  const totalSpecialDays = getSpecialReward2023(daysWarIn2023 + serviceBefore).amount
  const totalExtended = 0 // as it included in the 'totalSpecialDays' also for non_combat
  const totalAdditional = getAdditionalReward2023(daysWarIn2023 + serviceBefore).amount
  const totalDaysStraight = getPersonalExpensesReward2023(daysWarIn2023 + serviceBefore,isDaysStraight || isDaysStraightInWar).amount

  let totalPerMonth = getPersonalExpensesGrant2023(daysWarIn2023, profile).amount

  let totalOperation24 = getCombatGrant2024(operation24Days).amount
  let totalMoreThan45 = getExtendedHomeEconomicsGrant(daysInWar, profile).amount

  let totalFromChildren = getExtendedFamilyGrant2023(daysWarIn2023, profile).amount

  let totalVacation = getVacationVoucher(daysInWar, profile).amount
  let totalSpecialChildren = getSpecialFamilyGrant(daysInWar, profile).amount

  let totalMental = getCouplesTherapyGrant(daysInWar).amount
  let totalFamilyCare = getTherapyGrant(daysInWar).amount

  let totalDedication = 0

  return {
    totalPerMonth,
    totalMoreThan45,
    totalOperation24,
    totalFromChildren,
    totalVacation,
    totalSpecialChildren,
    totalMental,
    totalFamilyCare,
    totalDedication,
    totalSpecialDays,
    totalExtended,
    totalAdditional,
    totalDaysStraight,
  }
}
