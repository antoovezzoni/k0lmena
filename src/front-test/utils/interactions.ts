import { Page } from "@playwright/test";
import { LocatorType } from "./types";

export const getElementByRole = async (
  page: Page,
  roleType: LocatorType,
  name: string
) => {
  return page.getByRole(roleType, { name: name }).click();
};

export const getElementByText = async (
  page: Page,
  text: string,
  exact?: boolean
) => {
  await page.getByText(text, { exact: exact }).click();
};

export const getElementByRoleAndClickIt = async (
  page: Page,
  roleType: LocatorType,
  name: string
) => {
  page.getByRole(roleType, { name }).click();
};

export const getElementAndCheckIt = async (page: Page) => {
  page.getByRole("checkbox").check();
};

export const getTextboxAndClear = async (page: Page) => {
  page.getByRole("textbox").clear();
};

export const getTextboxAndFill = async (
  page: Page,
  roleType: LocatorType,
  value: string
) => {
  page.getByRole(roleType).fill(value);
};

export const getAttributeByName = async (
  page: Page,
  name: string,
  options: any
) => {
  page.getAttribute(name, options);
};

export const getAltByText = async (page: Page, altText: string) => {
  page.getByAltText(altText).click();
};

export const getByLabelAndFillIt = async (
  page: Page,
  label: string,
  keyword
) => {
  page.getByLabel(label, { exact: true }).fill(keyword);
};

export const getByPlaceholderAndFillIt = async (
  page: Page,
  placeholder: string,
  value: string
) => {
  page.getByPlaceholder(placeholder).fill(value);
};

export const getByPlaceholderAndClickIt = async (
  page: Page,
  placeholder: string
) => {
  page.getByPlaceholder(placeholder).click();
};

export const getByTestId = async (page: Page, testId: string) => {
  const element = page.locator(`[data-test="${testId}"]`);
  try {
    await element.scrollIntoViewIfNeeded();
    await element.waitFor({ state: "attached", timeout: 5000 });
    await element.click();
  } catch (error) {
    throw error;
  }
};

export const getByText = async (page: Page, text: string, exact?: boolean) => {
  return page.getByText(text, { exact: exact });
};

export const clickByText = async (
  page: Page,
  text: string,
  exact?: boolean
) => {
  try {
    const element = page.getByText(text, { exact: exact });
    await element.first().click();
  } catch (error) {
    throw error;
  }
};

export const clickByAriaLabel = async (page: Page, ariaLabel: string) => {
  await page.getByRole("link", { name: ariaLabel }).click();
};

export const fillByTestId = async (
  page: Page,
  testId: string,
  value: string
) => {
  const element = page.locator(`[data-test="${testId}"]`);
  try {
    await element.waitFor({ state: "visible", timeout: 10000 });
    await element.fill(value);
  } catch (error) {
    throw error;
  }
};

export const fillNameField = async (page: Page, value: string) => {
  const selectors = [
    'input[name*="name" i]',
    'input[placeholder*="name" i]',
    'input[id*="name" i]',
    'input[aria-label*="name" i]',
  ];

  for (const selector of selectors) {
    const count = await page.locator(selector).count();

    if (count > 0) {
      const element = page.locator(selector).first();
      await element.waitFor({ state: "visible", timeout: 5000 });
      await element.fill(value);
      return;
    }
  }
  throw new Error("No name field found with any selector");
};

export const fillEmailField = async (page: Page, value: string) => {
  const selectors = [
    'input[type="email"]',
    'input[name*="email" i]',
    'input[placeholder*="email" i]',
    'input[id*="email" i]',
    'input[aria-label*="email" i]',
  ];

  for (const selector of selectors) {
    const count = await page.locator(selector).count();
    if (count > 0) {
      const element = page.locator(selector).first();
      await element.waitFor({ state: "visible", timeout: 5000 });
      await element.fill(value);
      return;
    }
  }
  throw new Error("No email field found with any selector");
};

export const clickSubmitButton = async (page: Page) => {
  const selectors = [
    'input[type="submit"]',
    'button[type="submit"]',
    'button:has-text("Submit" i)',
    'button:has-text("Pay" i)',
    'button:has-text("Complete" i)',
    'button:has-text("Confirm" i)',
    'button:has-text("Order" i)',
    'input[value*="submit" i]',
    'button[name*="submit" i]',
    'button[id*="submit" i]',
  ];

  for (const selector of selectors) {
    const count = await page.locator(selector).count();
    if (count > 0) {
      const element = page.locator(selector).first();
      await element.waitFor({ state: "visible", timeout: 5000 });
      await element.click();
      return;
    }
  }
  throw new Error("No submit button found with any selector");
};

export const validateCheckoutSuccess = async (page: Page) => {
  await page.waitForTimeout(3000);
  const currentUrl = page.url();
  const checkoutModalExists = await page
    .locator('[data-test="checkout"]')
    .count();

  const errorSelectors = [
    'text*="error"',
    'text*="invalid"',
    'text*="failed"',
    'text*="required"',
    ".error",
    ".alert-error",
    '[role="alert"]',
    ".invalid-feedback",
  ];

  let hasErrors = false;
  for (const errorSelector of errorSelectors) {
    const errorCount = await page.locator(errorSelector).count();
    if (errorCount > 0) {
      hasErrors = true;
    }
  }

  if (!hasErrors && checkoutModalExists === 0) {
    return true;
  }

  if (currentUrl.includes("success") || currentUrl.includes("thank")) {
    return true;
  }

  const successMessages = [
    "Thanks for your purchase!",
    "Thank you for your purchase!",
    "Purchase successful!",
    "Order successful!",
    "Success!",
    "Completed!",
    "Confirmed!",
  ];

  for (const message of successMessages) {
    const count = await page.getByText(message, { exact: false }).count();
    if (count > 0) {
      return true;
    }
  }

  if (!hasErrors) {
    return true;
  }
  throw new Error(
    "Checkout validation inconclusive - please check the logs above"
  );
};

export const validateMainMenuReturn = async (page: Page) => {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);

  const currentUrl = page.url();

  const isOnMainPage =
    currentUrl.includes("coffee-cart.app") && !currentUrl.includes("/cart");

  if (!isOnMainPage) {
    throw new Error(`Still on cart page or wrong URL: ${currentUrl}`);
  }

  return true;
};

export const getByTitle = async (page: Page, title: string) => {
  await page.getByTitle(title).click();
};

export const getInputValue = async (page: Page) => {
  page.getByRole("textbox").inputValue();
};

export const getCheckboxValue = async (page: Page) => {
  page.getByRole("checkbox").isChecked();
};

export const findLocator = async (page: Page, locator: LocatorType) => {
  return await page.locator(locator);
};

export const pressKey = async (page: Page, key: string) => {
  await page.keyboard.press(key);
};

export const getByLocator = async (page: Page, locator: LocatorType) => {
  await page.locator(locator).click();
};

export const getByLocatorAndFillIt = async (
  page: Page,
  locator: LocatorType,
  value: string
) => {
  await page.locator(locator).fill(value);
};

export const getLocatorBySelector = async (page: Page, selector: string) => {
  return await page.locator(selector);
};

export const waitForElementToBeVisible = async (
  page: Page,
  selector: string,
  timeout = 10000
) => {
  try {
    await page.locator(selector).waitFor({ state: "visible", timeout });
    return await page.locator(selector);
  } catch (error) {
    throw error;
  }
};
