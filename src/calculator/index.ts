import {
  differenceInDays,
  eachYearOfInterval,
  endOfYear,
  startOfYear,
} from 'date-fns'
import {
  COMBAT_RATE,
  EXTRA_DAYS_COMPENSATION,
  FAMILY_CARE_COMPENSATION,
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

export const calculateCompensationPerYear = (daysPerYear: number[]) => {
  const compensationPerYear = daysPerYear.map((days) => {
    let compensation = 0

    if (days >= 9) compensation += 1410
    if (days >= 14) compensation += 1410
    if (days >= 20) compensation += 1410
    if (days >= 37) compensation += 1410
    if (days >= 32) compensation += (days - 31) * 133

    return compensation
  })

  return compensationPerYear
}

export const getDaysForEachYear = (
  startDate: Date,
  endDate: Date,
  serviceBefore: number
) => {
  const interval = { start: startDate, end: endDate }
  const years = eachYearOfInterval(interval)

  return years.map((date, index) => {
    const start = index === 0 ? startDate : startOfYear(date)
    const end = index === years.length - 1 ? endDate : endOfYear(date)

    let days = differenceInDays(end, start) + 1
    return index === 0 ? days + serviceBefore : days
  })
}

const calculateDays = (
  startDate: Date,
  endDate: Date,
  serviceBefore: number
) => {
  const dayDifference = differenceInDays(endDate, startDate)
  return dayDifference + serviceBefore
}

const calculateMonthlyCompensation = (isCombat: boolean, days: number) => {
  if (days < 40) return 0
  //should be for each 10 days
  const rate = isCombat ? COMBAT_RATE : NON_COMBAT_RATE
  const total = Math.floor(days / 10) * rate
  return total
}

const calculateChildrenCompensation = (isCombat: boolean, days: number) => {
  // 833 for combat for each 10 days
  //500 for non combat for each 10 days
  if (days < 40) return 0
  const rate = isCombat ? 833 : 500
  const total = Math.floor(days / 10) * rate
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
    totalAmount += secondTierDays * 250 // 100 + 150
  }

  // Calculate for days 21 and beyond
  if (operation24Days > 20) {
    const thirdTierDays = operation24Days - 20
    totalAmount += thirdTierDays * 300 // 100 + 200
  }

  return totalAmount
}

export const calculateCompensation = (inputs: {
  startDate: string
  endDate: string
  operation24Days: string
  isCombat: boolean
  hasChildren: boolean
  hasChildrenSpecial: boolean
  serviceBefore: string
}) => {
  const {
    startDate: start,
    endDate: end,
    operation24Days: operation24DaysString,
    isCombat,
    hasChildren,
    hasChildrenSpecial,
    serviceBefore: serviceBeforeString,
  } = inputs

  const startDate = new Date(start)
  const endDate = new Date(end)
  const serviceBefore = parseInt(serviceBeforeString)
  const operation24Days = parseInt(operation24DaysString)

  const days = calculateDays(startDate, endDate, serviceBefore)

  let totalPerMonth = calculateMonthlyCompensation(isCombat, days)
  let totalExtraDays =
    isCombat && days >= 32 ? EXTRA_DAYS_COMPENSATION * (days - 31) : 0
  let totalOperation24 = operation24Calculation(operation24Days)
  let totalMoreThan45 = isCombat && days > 45 ? 2500 : 0

  let totalFromChildren = hasChildren
    ? calculateChildrenCompensation(isCombat, days)
    : 0
  let totalVacation = calculateVacation(days, hasChildren, isCombat)
  let totalSpecialChildren = hasChildrenSpecial ? SPECIAL_NEEDS_COMPENSATION : 0

  let totalMental = days > 30 ? MENTAL_HEALTH_COMPENSATION : 0
  let totalFamilyCare = FAMILY_CARE_COMPENSATION

  const compensationPerYear = calculateCompensationPerYear(
    getDaysForEachYear(startDate, endDate, serviceBefore)
  )

  return {
    totalPerMonth,
    totalExtraDays,
    totalMoreThan45,
    totalOperation24,
    totalFromChildren,
    totalVacation,
    totalSpecialChildren,
    totalMental,
    totalFamilyCare,
    compensationPerYear,
  }
}
