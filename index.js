const calculateVacation = (days, children, combat) => {
  // vacation
  if (days >= 45) {
    if (children) {
      if (combat) {
        return 4500;
      } else {
        return 2000;
      }
    } else if (combat) {
      return 3500;
    } else {
      return 1500;
    }
  }
};

const calculateCompensationPerYear = (daysPerYear) => {
  const compensationPerYear = [];
  for (let i = 0; i < daysPerYear.length; i++) {
    compensationPerYear.push(0);

    if (daysPerYear[i] >= 9 && daysPerYear[i] < 14) {
      compensationPerYear[i] = 1410;
    } else if (daysPerYear[i] >= 14 && daysPerYear[i] < 20) {
      compensationPerYear[i] = 2820;
    } else if (daysPerYear[i] >= 20 && daysPerYear[i] < 37) {
      compensationPerYear[i] = 4230;
    } else if (daysPerYear[i] >= 37) {
      compensationPerYear[i] = 5640;
    }

    if (daysPerYear[i] >= 32) {
      compensationPerYear[i] += (daysPerYear[i] - 31) * 133;
    }
  }
  return compensationPerYear;
};

const getDaysForEachYear = (startDate, endDate, serviceBefore) => {
  // how much days served for each year
  // for example, if he served between 31st december 2020 to 2nd january 2021, he served 2 days in 2020 and 1 day in 2021
  const daysPerYear = [];

  // calculate how much days served for each year
  for (let i = startDate.getFullYear(); i <= endDate.getFullYear(); i++) {
    const year = i;
    const yearEndDate = new Date(year, 11, 31);
    const yearStartDate = new Date(year, 0, 1);

    // if the year is the start year, calculate the days from the start date to the end of the year
    if (year === startDate.getFullYear()) {
      daysPerYear.push(
        Math.floor((yearEndDate - startDate) / (1000 * 60 * 60 * 24)) + 1
      );
    }
    // if the year is the end year, calculate the days from the start of the year to the end date
    else if (year === endDate.getFullYear()) {
      daysPerYear.push(
        Math.floor((endDate - yearStartDate) / (1000 * 60 * 60 * 24)) + 1
      );
    }
    // if the year is not the start or the end year, calculate the days from the start of the year to the end of the year
    else {
      daysPerYear.push(
        Math.floor((yearEndDate - yearStartDate) / (1000 * 60 * 60 * 24)) + 1
      );
    }
  }

  if (serviceBefore > 0) {
    daysPerYear[0] += serviceBefore;
  }

  return daysPerYear;
};

const calculateCompensation = () => {
  // reset results
  document.getElementById("results").innerHTML = "";

  // reset alerts
  document.getElementById("alerts").innerHTML = "";

  const isCombat = document.getElementById("combat").checked;
  const startDate = new Date(document.getElementById("serviceDate").value);
  const endDate = new Date(document.getElementById("endServiceDate").value);
  const hasChildren = document.getElementById("children").checked;
  const hasChildrenSpecial =
    document.getElementById("children-special").checked;
  const isStudent = document.getElementById("student").checked;
  const serviceBefore = document.getElementById("serviceBefore").value;
  const didOperation24 = document.getElementById("operation24").checked;

  let errors = false;
  // validation
  if (startDate > endDate) {
    document.getElementById("alerts").innerHTML =
      "תאריך סיום השירות לא יכול להיות לפני תחילת השירות";
    errors = true;
  }

  // date cannot be nan
  if (isNaN(startDate) || isNaN(endDate)) {
    document
      .getElementById("alerts")
      .appendChild(document.createElement("li")).innerText = "תאריך לא תקין";
    errors = true;
  }

  // service before cannot be nan
  if (serviceBefore === "") {
    document
      .getElementById("alerts")
      .appendChild(document.createElement("li")).innerText =
      "ימי מילואים לפני ה7/10 לא תקין";
    errors = true;
  }

  if (errors) {
    //scroll to alerts smoothly
    document.getElementById("alerts").scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  // calculate today minus date days
  const days =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) +
    parseInt(serviceBefore);

  // calculate months by calculating the months passed since the start of the service and subtracting the months passed since the start of the service
  const months =
    endDate.getMonth() +
    1 -
    (startDate.getMonth() + 1) +
    12 * (endDate.getFullYear() - startDate.getFullYear());

  // if the soldier is a combat soldier, add 1400 per month else 800
  let sum = isCombat ? 1400 * months : 800 * months;

  // if the soldier served more than 45 days, add 2500
  let sum45 = isCombat && days >= 45 ? 2500 : 0;

  let sumOperation24 = didOperation24 ? 4500 : 0;

  // if there are children under the age of 14
  let sumChildren = 0;

  if (hasChildren) {
    if (isCombat) {
      sumChildren = 2500 * months;
    } else {
      sumChildren = 1500 * months;
    }
  }

  let sumVacation = calculateVacation(days, hasChildren, isCombat);

  // if there are children with special needs, add 2000
  let sumChildrenSpecial = hasChildrenSpecial ? 2000 : 0;

  let sumMental = 1500;

  let sumFamilyCare = 1500;

  const compensationPerYear = calculateCompensationPerYear(
    getDaysForEachYear(startDate, endDate, parseInt(serviceBefore))
  );

  const totalCompensation =
    sum +
    sumOperation24 +
    sum45 +
    compensationPerYear.reduce((a, b) => a + b, 0);

  const totalSum = sumChildren + sumChildrenSpecial + sumVacation;

  const totalCare = sumMental + sumFamilyCare;

  const el = document.getElementById("results");

  if (totalCompensation > 0) {
    const compenEl1 = el.appendChild(document.createElement("ul"));
    compenEl1.appendChild(document.createElement("li")).innerText =
      "תגמולים ומענקים - סה״כ " + totalCompensation + " ש״ח:";
    compenEl1.lastChild.style.fontWeight = "bold";
    const compEl2 = compenEl1.appendChild(document.createElement("ul"));

    for (let i = 0; i < compensationPerYear.length; i++) {
      if (compensationPerYear[i] === 0) continue;
      compEl2.appendChild(document.createElement("li")).innerText =
        compensationPerYear[i] +
        " ש״ח מענק לשנת " +
        (startDate.getFullYear() + i) +
        ".";
    }

    if (sum > 0) {
      compEl2.appendChild(document.createElement("li")).innerText =
        sum + " ש״ח מענקים חודשיים.";
    }

    if (sum45 > 0) {
      compEl2.appendChild(document.createElement("li")).innerText =
        sum45 + " ש״ח מענק כלכלת בית.";
    }

    if (sumOperation24 > 0) {
      compEl2.appendChild(document.createElement("li")).innerText =
        sumOperation24 + " ש״ח מענק תע״מ 2024.";
    }
  }

  if (totalSum > 0) {
    const sumEl1 = el.appendChild(document.createElement("ul"));
    sumEl1.appendChild(document.createElement("li")).innerText =
      "מעטפת משפחתית וכלכלית - סה״כ " + totalSum + " ש״ח:";
    sumEl1.lastChild.style.fontWeight = "bold";
    const sumEl2 = sumEl1.appendChild(document.createElement("ul"));
    if (sumChildren > 0) {
      sumEl2.appendChild(document.createElement("li")).innerText =
        sumChildren + " ש״ח מענק חודשי להורים לילדים עד גיל 14.";
    }
    //vacation
    if (sumVacation > 0) {
      sumEl2.appendChild(document.createElement("li")).innerText =
        sumVacation + " ש״ח מענק חופשה.";
    }

    if (sumChildrenSpecial > 0) {
      sumEl2.appendChild(document.createElement("li")).innerText =
        sumChildrenSpecial + " ש״ח מענק חודשי להורים לילדים עם צרכים מיוחדים.";
    }
  }

  if (totalCare > 0 || isStudent) {
    const careEl1 = el.appendChild(document.createElement("ul"));
    careEl1.appendChild(document.createElement("li")).innerText =
      "מעטפת משלימה - סה״כ " + totalCare + " ש״ח:";
    careEl1.lastChild.style.fontWeight = "bold";
    const careEl2 = careEl1.appendChild(document.createElement("ul"));

    if (sumFamilyCare > 0) {
      careEl2.appendChild(document.createElement("li")).innerText =
        sumFamilyCare + " ש״ח מימון טיפול אישי ומשפחתי.";
    }

    if (sumMental > 0) {
      careEl2.appendChild(document.createElement("li")).innerText =
        sumMental + " ש״ח מימון לליווי וטיפול רגשי.";
    }

    if (isStudent && days >= 60) {
      if (isCombat) {
        careEl2.appendChild(document.createElement("li")).innerText =
          "מגיע לך 100% סבסוד לשנת לימודים תשפ״ד.";
      } else {
        careEl2.appendChild(document.createElement("pli")).innerText =
          "מגיע לך 30% סבסוד לשנת לימודים תשפ״ד.";
      }
    }
  }

  // scroll to results smoothly
  document.getElementById("results").scrollIntoView({
    behavior: "smooth",
  });
};

const dateToString = (date) => {
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    // add leading zero if minutes is less than 10
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes()
  );
};

document.getElementById("endServiceDate").valueAsDate = new Date();
document.getElementById("lastModified").textContent =
  "עדכון אחרון: " + dateToString(new Date(document.lastModified));
