import { DateRange } from '../store/types'
import {
  COMBAT_RATE,
  FAMILY_CARE_COMPENSATION,
  GRANT_DAILY_RATE,
  MENTAL_HEALTH_COMPENSATION,
  NON_COMBAT_RATE,
  SPECIAL_NEEDS_COMPENSATION,
} from './constants'

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

const calculateDays = (dateRanges: { startDate: Date; endDate: Date }[]) => {
  let total = 0
  dateRanges.forEach(({ startDate, endDate }) => {
    total += totalDaysInRange(startDate, endDate)
  })

  return total
}

const calculateMonthlyCompensation = (isCombat: boolean, days: number) => {
  if (days < 40) return 0
  const rate = isCombat ? COMBAT_RATE : NON_COMBAT_RATE

  const total = Math.floor((days - 30) / 10) * rate
  return total
}

const calculateChildrenCompensation = (isCombat: boolean, days: number) => {
  // 833 for combat for each 10 days
  //500 for non combat for each 10 days
  if (days < 40) return 0
  const rate = isCombat ? 833 : 500
  const total = Math.floor((days - 30) / 10) * rate
  return total
}

const operation24Calculation = (operation24Days: number) => {
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

const totalDaysInRange = (startDate: Date, endDate: Date) => {
  let Difference_In_Time = endDate.getTime() - startDate.getTime()
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
  return Difference_In_Days + 1
}

const isOneRangeMoreThan5Days = (
  dateRanges: {
    startDate: Date
    endDate: Date
  }[]
) => {
  return dateRanges.some(
    ({ startDate, endDate }) => totalDaysInRange(startDate, endDate) >= 5
  )
}

const specialGrantCalculation = (
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

  const daysWar = calculateDays(dateRanges)

  const {
    totalSpecialDays,
    totalExtended,
    totalAdditional,
    totalDaysStraight,
  } = specialGrantCalculation(
    serviceBefore,
    daysWar,
    isDaysStraight || isDaysStraightInWar
  )

  let totalPerMonth = calculateMonthlyCompensation(
    isCombat,
    Math.max(daysWar, 0)
  )

  let totalOperation24 = operation24Calculation(operation24Days)
  let totalMoreThan45 = isCombat && daysWar > 45 ? 2500 : 1450

  let totalFromChildren = hasChildren
    ? calculateChildrenCompensation(isCombat, daysWar)
    : 0
  let totalVacation = calculateVacation(daysWar, hasChildren, isCombat)
  let totalSpecialChildren = hasChildrenSpecial ? SPECIAL_NEEDS_COMPENSATION : 0

  let totalMental = daysWar > 30 ? MENTAL_HEALTH_COMPENSATION : 0
  let totalFamilyCare = FAMILY_CARE_COMPENSATION

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
