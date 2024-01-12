import { Grant, PayDate, Profile } from '../store/types'
import { operation24Calculation } from './calculator'

// *****     תגמולים      ***** //

//התגמול המיוחד
export function getSpecialReward2023(days2023: number) : Grant {
  const name = "2023 התגמול המיוחד"
  const payDate = PayDate.MAY_24
  const rewardAmountPerDay = 133

  function specialRewardCalc(days: number): number{
    return Math.max(days - 32, 0) * rewardAmountPerDay // I assume al is turtle8 as there is no other input option
  }

  return { amount : specialRewardCalc(days2023), name, payDate }
}

//התגמול הנוסף
export function getAdditionalReward2023(days2023: number) : Grant {
  const name = "2023 התגמול הנוסף"
  const payDate = PayDate.MAY_24

  function additionalRewardCalc(days: number): number {
    switch (true) {
      case days >= 37:
        return 5640;
      case days >= 20 && days <= 36.5:
        return 4230;
      case days >= 15 && days <= 19.5:
        return 2820;
      case days >= 10 && days <= 14.5:
        return 1410;
      default:
        return 0;
    }
  }

  return { amount: additionalRewardCalc(days2023), name, payDate }
}

//(5 ימים רצופים) תגמול עבור הוצאות אישיות
export function getPersonalExpensesReward2023(days2023: number, is5DaysStraight: boolean) : Grant {
  const name = "2023 תגמול עבור הוצאות אישיות"
  const payDate = PayDate.MAY_24
  const rewardAmount = 266

  function personalExpensesRewardCalc(days: number,is5DaysStraight: boolean): number{
    if (is5DaysStraight && days < 1)
      return rewardAmount
    else
      return 0
  }

  return { amount : personalExpensesRewardCalc(days2023,is5DaysStraight), name, payDate }
}

//תגמול למוחרגי גיל
export function getOldAgeReward2023(days2023: number, profile: Profile) : Grant {
  const name = "תגמול למוחרגי גיל"
  const payDate = PayDate.MAY_24
  const ratePerDay = 133

  function oldAgeRewardCalc(days: number, isOld: boolean){
    if (isOld)
      return days * ratePerDay
    else
      return 0
  }

  return { amount: oldAgeRewardCalc(days2023,profile.isOld), name, payDate }
}


// *****     מענקים  - חרבות ברזל      ***** //


//מענק הוצאות אישיות
export function getPersonalExpensesGrant2023(daysWarIn2023: number, profile: Profile) : Grant {
  const name = "מענק הוצאות אישיות"
  const payDate = PayDate.JAN_24
  const combatRate = 466
  const nonCombatRate = 266

  function personalExpensesGrantCalc(days: number,isCombat: boolean): number{
    if (days < 40) return 0
    const rate = isCombat ? combatRate : nonCombatRate
    return  Math.floor((days - 30) / 10) * rate
  }

  return { amount: personalExpensesGrantCalc(daysWarIn2023,profile.isCombat), name, payDate }
}

//מענק משפחה
export function getFamilyGrant(daysInWar: number) : Grant {
  const name = "מענק משפחה"
  const payDate = PayDate.NOV_23

  function familyGrantCalc(days: number) {
    if (days >= 8)
      return 1100
    else
      return 0
  }

  return { amount: familyGrantCalc(daysInWar), name, payDate }
}


//מענק הוצאות אישיות מוגדל
export function getExtendedPersonalExpensesGrant(daysInWar: number, profile: Profile) : Grant {
  const name = "מענק משפחה"
  const payDate = PayDate.JAN_24

  function extendedPersonalExpensesCalc(days: number,haChildrenUnder14: boolean) {
    if (days >= 8 && haChildrenUnder14)
      return 2000
    else
      return 0
  }
  return { amount: extendedPersonalExpensesCalc(daysInWar,profile.haChildrenUnder14), name, payDate }
}


//מענק לחימה
export function getCombatGrant2024(operationDays:number) : Grant {
  const name = "מענק לחימה"
  const payDate = PayDate.MONTHLY
  return { amount: operation24Calculation(operationDays), name, payDate }
}

//מענק התמדה
export function getPersistenceGrant(daysInWar: number,normalDays2024: number) : Grant{
  const name = "מענק התמדה"
  const payDate = PayDate.MONTHLY

  function persistenceGrantCalc(daysInWar: number,normalDays2024: number) {
    if (daysInWar >= 60)
      return normalDays2024 * 100
    else
      return 0
  }

  return { amount: persistenceGrantCalc(daysInWar,normalDays2024), name, payDate }
}


//מענק משפחה מוגדל
export function getExtendedFamilyGrant2023(days2023: number, profile: Profile) : Grant {
  const name = "מענק משפחה מוגדל"
  const payDate = PayDate.JAN_24
  const combatRate = 833 // for each 10 days
  const nonCombatRate = 500 // for each 10 days

  function extendedFamilyGrantCalc(days: number, isCombat: boolean, haChildrenUnder14:boolean) {
    if (days >= 40 && haChildrenUnder14) {
      const rate = isCombat ? combatRate : nonCombatRate
      return Math.floor((days - 30) / 10) * rate
    }
    else
      return 0
  }

  return { amount: extendedFamilyGrantCalc(days2023,profile.isCombat,profile.haChildrenUnder14), name, payDate }
}

//מענק משפחה מיוחדת
export function getSpecialFamilyGrant(days: number, profile: Profile) : Grant {
  const name = "מענק משפחה מיוחדת"
  const payDate = PayDate.MAR_24

  function specialFamilyCalc(days: number, hasSpecialChildren:boolean) {
    if (days >= 45 && hasSpecialChildren)
      return 2000
    else
      return 0
  }

  return { amount: specialFamilyCalc(days,profile.hasSpecialChildren), name, payDate }
}

//מענק כלכלת בית מוגדל
export function getExtendedHomeEconomicsGrant(days: number, profile: Profile) : Grant {
  const name = "מענק כלכלת בית מוגדל"
  const payDate = PayDate.SEP_24
  const combatAmount = 1250
  const nonCombatAmount = 2500

  function extendedHomeEconomicsGrantCalc(days: number,isCombat: boolean) {
    if (days>45)
      return isCombat ? combatAmount : nonCombatAmount
    else
      return 0
  }

  return { amount: extendedHomeEconomicsGrantCalc(days,profile.isCombat), name, payDate }
}

//שובר חופשה
export function getVacationVoucher(days: number, profile: Profile) : Grant {
  const name = "שובר חופשה"
  const payDate = PayDate.DEMAND

  function vacationVoucherCalc(days: number, hasChildren: boolean, isCombat: boolean) {
    if (days < 60) return 0

    switch (true) {
      case !isCombat && !hasChildren:
        return 1500
      case !isCombat && hasChildren:
        return 2000
      case isCombat && !hasChildren:
        return 3500
      case isCombat && hasChildren:
        return 4500
    }
    return 0
  }

  return { amount: vacationVoucherCalc(days,profile.haChildrenUnder14,profile.isCombat), name, payDate }
}

//טיפול זוגי
export function getCouplesTherapyGrant(days: number) : Grant {
  const name = "טיפול זוגי"
  const payDate = PayDate.DEMAND

  function couplesTherapyGrantCalc(days: number) {
    if (days >= 30)
      return 1500
    else
      return 0
  }

  return { amount: couplesTherapyGrantCalc(days), name, payDate }
}

//טיפול רגשי, נפשי וטיפול משלים
export function getTherapyGrant(days: number) : Grant {
  const name = "טיפול רגשי, נפשי וטיפול משלים"
  const payDate = PayDate.DEMAND

  function therapyGrantCalc(days: number) {
    if (days >= 30)
      return 1500
    else
      return 0
  }

  return { amount: therapyGrantCalc(days), name, payDate }
}
