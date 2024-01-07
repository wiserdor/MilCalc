import {
  differenceInDays,
  eachYearOfInterval,
  endOfYear,
  startOfYear,
} from 'date-fns'
import {
  COMBAT_RATE,
  EXTRA_45_DAYS_COMPENSATION,
  FAMILY_CARE_COMPENSATION,
  MENTAL_HEALTH_COMPENSATION,
  NON_COMBAT_RATE,
  OPERATION_24_COMPENSATION,
  SPECIAL_NEEDS_COMPENSATION,
} from './constants'

export const calculateVacation = (
  totalDays: number,
  hasChildren: boolean,
  isCombat: boolean
) => {
  if (totalDays < 45) return 0

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

const calculateMonthlyCompensation = (isCombat: boolean, months: number) => {
  return isCombat ? COMBAT_RATE * months : NON_COMBAT_RATE * months
}

export const calculateCompensation = (inputs: {
  startDate: string
  endDate: string
  didOperation24: boolean
  isCombat: boolean
  hasChildren: boolean
  hasChildrenSpecial: boolean
  serviceBefore: string
}) => {
  const {
    startDate: start,
    endDate: end,
    didOperation24,
    isCombat,
    hasChildren,
    hasChildrenSpecial,
    serviceBefore: serviceBeforeString,
  } = inputs

  const startDate = new Date(start)
  const endDate = new Date(end)
  const serviceBefore = parseInt(serviceBeforeString)

  const days = calculateDays(startDate, endDate, serviceBefore)
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear()) +
    1

  let totalPerMonth = calculateMonthlyCompensation(isCombat, months)
  let totalMoreThan45 = isCombat && days >= 45 ? EXTRA_45_DAYS_COMPENSATION : 0
  let totalOperation24 = didOperation24 ? OPERATION_24_COMPENSATION : 0

  let totalFromChildren = hasChildren ? (isCombat ? 2500 : 1500) * months : 0
  let totalVacation = calculateVacation(days, hasChildren, isCombat)
  let totalSpecialChildren = hasChildrenSpecial ? SPECIAL_NEEDS_COMPENSATION : 0

  let totalMental = MENTAL_HEALTH_COMPENSATION
  let totalFamilyCare = FAMILY_CARE_COMPENSATION

  const compensationPerYear = calculateCompensationPerYear(
    getDaysForEachYear(startDate, endDate, serviceBefore)
  )

  return {
    totalPerMonth,
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
