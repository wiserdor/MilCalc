export const MAX_MONTH_APPROVAL = 2800

export const MAX_CHILD_APPROVAL = 5000

export const getMaxMonthApproval = (isCombat: boolean) => {
  return isCombat ? 2800 : 1600
}

export const getMaxChildApproval = (isCombat: boolean) => {
  return isCombat ? 5000 : 3000
}
