import {
  getTotalDaysIn,
  specialGrantCalculation,
  totalDaysInRange,
  isOneRangeMoreThan5DaysLessThan9,
  calculateDays,
  getMonthlyAfter24Compensation,
  getFromChildrenMonthlyAfter24
} from "../calculator";

describe("Calculator", () => {
  describe("totalDaysInRange", () => {
    it("should return 0 if start date is after end date", () => {
      expect(
        totalDaysInRange(new Date("2021/01/02"), new Date("2020/01/01"))
      ).toBe(0);
    });

    it("should return 1 if start date is same as end date", () => {
      expect(
        totalDaysInRange(new Date("2021/01/01"), new Date("2021/01/01"))
      ).toBe(1);
    });

    it("should return correct number of days if start date is before end date", () => {
      expect(
        totalDaysInRange(new Date("2021-01-01"), new Date("2021-01-31"))
      ).toBe(31);
    });
  });

  describe("getTotalDaysIn", () => {
    it("should return 0 if date ranges not in 2023", () => {
      expect(
        getTotalDaysIn(
          [
            {
              startDate: new Date("2021-01-01"),
              endDate: new Date("2021-01-31")
            },
            {
              startDate: new Date("2024-01-01"),
              endDate: new Date("2024-01-31")
            }
          ],
          2023
        )
      ).toBe(0);
    });

    it("should return currect number of days in 2023", () => {
      expect(
        getTotalDaysIn(
          [
            {
              startDate: new Date("2023-12-31"),
              endDate: new Date("2024-01-30")
            }
          ],
          2023
        )
      ).toBe(1);

      expect(
        getTotalDaysIn(
          [
            {
              startDate: new Date("2023-01-01"),
              endDate: new Date("2023-01-31")
            },
            {
              startDate: new Date("2023-02-01"),
              endDate: new Date("2023-02-28")
            },
            {
              startDate: new Date("2023-12-31"),
              endDate: new Date("2024-12-01")
            }
          ],
          2023
        )
      ).toBe(60);
    });

    it("should return correct number of days for date ranges started before 2023 and ended in 2023", () => {
      expect(
        getTotalDaysIn(
          [
            {
              startDate: new Date("2022-11-31"),
              endDate: new Date("2023-01-30")
            }
          ],
          2023
        )
      ).toBe(30);
    });
  });

  describe("specialGrantCalculation", () => {
    it("should return correct number of days", () => {
      expect(specialGrantCalculation(0, 0, false, false)).toStrictEqual({
        totalDaysStraight: 0,
        totalAdditional: 0,
        totalSpecialDays: 0,
        totalExtended: 0
      });
    });
    it("should calculate correctly for basic input", () => {
      expect(specialGrantCalculation(10, 5, false, false)).toEqual({
        totalDaysStraight: 0,
        totalSpecialDays: 0,
        totalExtended: 0,
        totalAdditional: 2904
      });
    });
    it("should handle edge case of 14.5 total days", () => {
      expect(specialGrantCalculation(14, 0.5, true, false)).toEqual({
        totalDaysStraight: 266,
        totalSpecialDays: 0,
        totalExtended: 0,
        totalAdditional: 1452
      });
    });
    it("should calculate correctly for days before 32", () => {
      expect(specialGrantCalculation(20, 10, true, false)).toEqual({
        totalDaysStraight: 266,
        totalSpecialDays: 0,
        totalExtended: 0,
        totalAdditional: 4356
      });
    });

    it("should calculate zero for negative values", () => {
      expect(specialGrantCalculation(-5, -10, false, false)).toEqual({
        totalDaysStraight: 0,
        totalSpecialDays: 0,
        totalExtended: 0,
        totalAdditional: 0
      });
    });

    it("should calculate correctly for 95 war days", () => {
      expect(specialGrantCalculation(0, 95, true, false)).toEqual({
        totalDaysStraight: 266,
        totalSpecialDays: 0,
        totalExtended: 8512,
        totalAdditional: 5808
      });
    });
  });

  describe("isOneRangeMoreThan5Days", () => {
    it("should return false if no ranges", () => {
      expect(isOneRangeMoreThan5DaysLessThan9([])).toBe(false);
    });
    it("should return false if no range is more than 5 days", () => {
      expect(
        isOneRangeMoreThan5DaysLessThan9([
          {
            startDate: new Date("2021-01-01"),
            endDate: new Date("2021-01-04")
          },
          {
            startDate: new Date("2021-01-06"),
            endDate: new Date("2021-01-09")
          }
        ])
      ).toBe(false);
    });

    it("should return true if one range is more than 5 days", () => {
      expect(
        isOneRangeMoreThan5DaysLessThan9([
          {
            startDate: new Date("2021-01-01"),
            endDate: new Date("2021-01-04")
          },
          {
            startDate: new Date("2021-01-06"),
            endDate: new Date("2021-01-11")
          }
        ])
      ).toBe(true);
    });

    it("should return false if range is more than 9 days", () => {
      expect(
        isOneRangeMoreThan5DaysLessThan9([
          {
            startDate: new Date("2021-01-06"),
            endDate: new Date("2021-01-16")
          }
        ])
      ).toBe(false);
    });
  });

  describe("calculateDays", () => {
    it("should return 0 if no date ranges", () => {
      expect(calculateDays([])).toBe(0);
    });

    it("should return correct number of days for basic input", () => {
      expect(
        calculateDays([
          {
            startDate: new Date("2021-01-01"),
            endDate: new Date("2021-01-04")
          },
          {
            startDate: new Date("2021-01-06"),
            endDate: new Date("2021-01-11")
          }
        ])
      ).toBe(10);
    });

    it("should return correct number of days for basic input", () => {
      expect(
        calculateDays([
          {
            startDate: new Date("2023-10-07"),
            endDate: new Date("2024-01-09")
          }
        ])
      ).toBe(95);
    });
  });

  describe("getMonthlyAfter24Compensation", () => {
    it("should return empty array if no date ranges", () => {
      expect(getMonthlyAfter24Compensation(false, [])).toStrictEqual([]);
    });

    it("should return empty array if all date ranges are before 2024", () => {
      expect(
        getMonthlyAfter24Compensation(false, [
          {
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-01-31")
          }
        ])
      ).toEqual([]);
    });

    it("should return correct number of months for basic input", () => {
      let result = getMonthlyAfter24Compensation(true, [
        {
          startDate: new Date("2023-10-07"),
          endDate: new Date("2024-01-11")
        }
      ]);

      let expected = [
        {
          total: 466,
          month: new Date("2024-03-01")
        }
      ];

      result.forEach((r, i) => {
        expect(r.total).toBeCloseTo(expected[i].total);
        expect(r.month.getMonth()).toEqual(expected[i].month.getMonth());
        expect(r.month.getFullYear()).toEqual(expected[i].month.getFullYear());
      });

      result = getMonthlyAfter24Compensation(false, [
        {
          startDate: new Date("2023-10-07"),
          endDate: new Date("2024-01-11")
        },
        {
          startDate: new Date("2024-01-12"),
          endDate: new Date("2024-01-31")
        }
      ]);

      expected = [
        {
          total: 798,
          month: new Date("2024-03-01")
        }
      ];

      result.forEach((r, i) => {
        expect(r.total).toBeCloseTo(expected[i].total);
        expect(r.month.getMonth()).toEqual(expected[i].month.getMonth());
        expect(r.month.getFullYear()).toEqual(expected[i].month.getFullYear());
      });
    });
  });

  describe("getFromChildrenMonthlyAfter24", () => {
    it("should return empty array if no date ranges", () => {
      expect(getFromChildrenMonthlyAfter24(false, [])).toStrictEqual([]);
    });

    it("should return empty array if all date ranges are before 2024", () => {
      expect(
        getFromChildrenMonthlyAfter24(false, [
          {
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-01-31")
          }
        ])
      ).toEqual([]);
    });

    it("should return correct number of months for basic input", () => {
      let result = getFromChildrenMonthlyAfter24(true, [
        {
          startDate: new Date("2023-10-07"),
          endDate: new Date("2024-01-11")
        }
      ]);
      let expected = [
        {
          total: 833,
          month: new Date("2024-03-01")
        }
      ];

      result.forEach((r, i) => {
        expect(r.total).toBeCloseTo(expected[i].total);
        expect(r.month.getMonth()).toEqual(expected[i].month.getMonth());
        expect(r.month.getFullYear()).toEqual(expected[i].month.getFullYear());
      });

      result = getFromChildrenMonthlyAfter24(false, [
        {
          startDate: new Date("2023-10-07"),
          endDate: new Date("2024-01-11")
        },
        {
          startDate: new Date("2024-01-12"),
          endDate: new Date("2024-01-31")
        }
      ]);
      expected = [
        {
          total: 1500,
          month: new Date("2024-03-01")
        }
      ];

      result.forEach((r, i) => {
        expect(r.total).toBeCloseTo(expected[i].total);
        expect(r.month.getMonth()).toEqual(expected[i].month.getMonth());
        expect(r.month.getFullYear()).toEqual(expected[i].month.getFullYear());
      });

      result = getFromChildrenMonthlyAfter24(true, [
        {
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-03-11")
        }
      ]);

      expected = [
        {
          total: 2499,
          month: new Date("2024-03-01")
        },
        {
          total: 1666,
          month: new Date("2024-04-01")
        },
        {
          total: 833,
          month: new Date("2024-05-01")
        }
      ];

      result.forEach((r, i) => {
        expect(r.total).toBeCloseTo(expected[i].total);
        expect(r.month.getMonth()).toEqual(expected[i].month.getMonth());
        expect(r.month.getFullYear()).toEqual(expected[i].month.getFullYear());
      });
    });
  });
});
