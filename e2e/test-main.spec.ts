import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByText("במערך הלוחם").click();
  await page.getByText("ילדים עד גיל").click();
  await page.getByText("ילדים עם צרכים מיוחדים").click();
  await page.getByText("מוחרג/ת גיל").click();
  await page.getByText("עצמאי/ת").click();
  await page.getByText("סטודנט/ית").click();
  await page.getByRole("button", { name: "לחישוב המענקים" }).click();
  await page.locator("._barSegment_jm7bm_13").first().isVisible();
  await page
    .locator("._innerBarContainer_jm7bm_6 > div:nth-child(2)")
    .isVisible();
  await page.getByText("מענק הוצאות אישיות", { exact: true }).isVisible();
  await page.getByText("מענק משפחה", { exact: true }).isVisible();
  await page.getByText("מענק הוצאות אישיות מוגדל").first().isVisible();
  await page.getByText("מענק משפחה מוגדל").first().isVisible();
  await page.getByText("מענק משפחה מיוחדת").isVisible();
  await page.getByText("התגמול הנוסף").first().isVisible();
  await page.getByText("תגמול עבור מוחרגי גיל 2024").isVisible();
  await page.getByText("מענק כלכלת בית מוגדל").isVisible();
  await page.getByText("שובר חופשה").isVisible();
  await page.getByText("טיפול זוגי").isVisible();
  await page.getByText("קרן הסיוע עבור עצמאים").isVisible();
  await page.getByText("טיפול רגשי, נפשי ומשלים").isVisible();
  await page.getByText("% מימון לשנת לימודים תשפ״ד").isVisible();
});
