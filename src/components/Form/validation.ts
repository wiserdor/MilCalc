export const validateForm = (
  startDate: string,
  endDate: string,
  serviceBefore: string
) => {
  const errors = []
  const startDateDate = new Date(startDate)
  const endDateDate = new Date(endDate)

  // validation
  if (startDateDate > endDateDate) {
    errors.push('תאריך סיום השירות לא יכול להיות לפני תחילת השירות')
  }

  // date cannot be nan
  if (isNaN(startDateDate.getTime()) || isNaN(endDateDate.getTime())) {
    errors.push('תאריך לא תקין')
  }

  // service before cannot be nan
  if (serviceBefore === '') {
    errors.push('ימי מילואים לפני ה7/10: ערך לא תקין')
  }

  return errors
}
