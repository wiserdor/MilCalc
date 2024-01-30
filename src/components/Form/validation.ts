import { DateRange } from '../../store/types'

export const validateForm = (
  dateRanges: DateRange[],
  serviceBefore: string,
  operation24Days: string
) => {
  const errors = []

  // date range cannot be empty
  if (dateRanges.length === 0) {
    errors.push('יש להזין לפחות תאריך אחד')
  }

  let breakLoop = false

  for (let i = 0; i < dateRanges.length; i++) {
    const { startDate, endDate } = dateRanges[i]
    const startDateDate = new Date(startDate)
    const endDateDate = new Date(endDate)

    // date cannot be nan
    if (isNaN(startDateDate.getTime()) || isNaN(endDateDate.getTime())) {
      errors.push('תאריך לא תקין')
      breakLoop = true
    }

    // validation
    if (startDateDate > endDateDate) {
      errors.push('תאריך סיום השירות לא יכול להיות לפני תחילת השירות')
      breakLoop = true
    }

    // break loop if error found
    if (breakLoop) {
      break
    }
  }

  // dates cannot overlap
  if (!breakLoop) {
    for (let i = 0; i < dateRanges.length; i++) {
      const { startDate, endDate } = dateRanges[i]
      const startDateDate = new Date(startDate)
      const endDateDate = new Date(endDate)

      for (let j = 0; j < dateRanges.length; j++) {
        if (i === j) {
          continue
        }

        const { startDate: startDate2, endDate: endDate2 } = dateRanges[j]
        const startDateDate2 = new Date(startDate2)
        const endDateDate2 = new Date(endDate2)

        if (
          (startDateDate >= startDateDate2 && startDateDate <= endDateDate2) ||
          (endDateDate >= startDateDate2 && endDateDate <= endDateDate2)
        ) {
          errors.push('תאריכים לא יכולים להתנגש')
          breakLoop = true
          break
        }
      }

      // break loop if error found
      if (breakLoop) {
        break
      }
    }
  }

  // service before cannot be nan
  if (serviceBefore === '') {
    errors.push('ימי מילואים לפני ה7/10: ערך לא תקין')
  }

  // operation 24 cannot be nan
  if (operation24Days === '') {
    errors.push('ימי פעולה 24: ערך לא תקין')
  }

  return errors
}

export const doDateRangesOverlap = (dateRanges: DateRange[]): boolean => {
  for (let i = 0; i < dateRanges.length; i++) {
    const { startDate, endDate } = dateRanges[i]
    const startDateDate = new Date(startDate)
    const endDateDate = new Date(endDate)

    for (let j = 0; j < dateRanges.length; j++) {
      if (i === j) {
        continue
      }

      const { startDate: startDate2, endDate: endDate2 } = dateRanges[j]
      const startDateDate2 = new Date(startDate2)
      const endDateDate2 = new Date(endDate2)

      if (
        (startDateDate >= startDateDate2 && startDateDate <= endDateDate2) ||
        (endDateDate >= startDateDate2 && endDateDate <= endDateDate2)
      ) {
        return true
      }
    }
  }
  return false
}
