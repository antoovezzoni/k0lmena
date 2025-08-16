import { Page } from "@playwright/test";
import { LocatorType } from "./types";

export const validateElementIsDisabled = async (
  page: Page,
  element: LocatorType
) => {
  return await page.getByRole(element).isDisabled();
};

export const valiteElementIsEditable = async (
  page: Page,
  element: LocatorType
) => {
  return await page.getByRole(element).isEditable();
};

export const validateItemIsHidden = async (
  page: Page,
  element: LocatorType
) => {
  return await page.getByRole(element).isHidden();
};

export const validateItemIsVisible = async (
  page: Page,
  element: LocatorType
) => {
  return await page.getByRole(element).isVisible();
};

export const validateLocatorIsVisible = async (
  page: Page,
  element: LocatorType
) => {
  await page.getByRole(element).isVisible();
};

export const validateFirstLocator = async (
  page: Page,
  element: string,
  textValue: string
) => {
  await page.locator(element).filter({ hasText: textValue }).first();
};
