import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { BASEURL } from "../config";
import { pages } from "../hooks/hook";
import {
  CAFE_ESPRESSO_TEST_ID,
  CAFE_AMERICANO_TEST_ID,
  CAFE_CAPPUCCINO_TEST_ID,
  CAFE_LATTE_TEST_ID,
  CAFE_MOCHA_TEST_ID,
  CAFE_FLAT_WHITE_TEST_ID,
  ADD_TO_CART_ARIA_LABEL,
  CHECKOUT_BUTTON_TEST_ID,
  MENU_BUTTON_TEXT,
  EMPTY_CART_MESSAGE_TEST_TEXT,
  CART_COUNTER_SELECTOR,
  TOTAL_PRICE_SELECTOR,
  INVALID_EMAIL_MESSAGE_TEST_TEXT,
} from "../locators/comprarCafeLocators";
import {
  getByTestId,
  clickByText,
  clickByAriaLabel,
  fillNameField,
  fillEmailField,
  clickSubmitButton,
  validateCheckoutSuccess,
  validateMainMenuReturn,
} from "../utils/interactions";

let cantidadDeCafes: string = "";
const getCoffeeLocator = (tiposCafe: string): string => {
  const coffeeTypes: { [key: string]: string } = {
    espresso: CAFE_ESPRESSO_TEST_ID,
    expresso: CAFE_ESPRESSO_TEST_ID,
    americano: CAFE_AMERICANO_TEST_ID,
    cappuccino: CAFE_CAPPUCCINO_TEST_ID,
    latte: CAFE_LATTE_TEST_ID,
    mocha: CAFE_MOCHA_TEST_ID,
    flat_white: CAFE_FLAT_WHITE_TEST_ID,
  };
  return coffeeTypes[tiposCafe.toLowerCase()] || CAFE_ESPRESSO_TEST_ID;
};

Given("El usuario abre la pagina de compra de cafe", async () => {
  for (const page of pages) {
    await page.goto(BASEURL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
  }
});

When(
  "El usuario selecciona {string} cafe {word}",
  async function (cantidad: string, tipoCafe: string) {
    for (const page of pages) {
      cantidadDeCafes = cantidad;
      const coffeeLocator = getCoffeeLocator(tipoCafe);
      for (let i = 0; i < parseInt(cantidad); i++) {
        await getByTestId(page, coffeeLocator);
      }
    }
  }
);

When("El usuario clickea en el carrito de compras", async function () {
  for (const page of pages) {
    await clickByAriaLabel(page, ADD_TO_CART_ARIA_LABEL);
  }
});

When("El usuario confirma la compra", async function () {
  for (const page of pages) {
    await getByTestId(page, CHECKOUT_BUTTON_TEST_ID);
    await page.waitForTimeout(3000);
  }
});

When(
  "El usuario completa con su nombre {string} y email {string}",
  async function (name, email) {
    for (const page of pages) {
      await fillNameField(page, name);
      await fillEmailField(page, email);
      await clickSubmitButton(page);
    }
  }
);

Then("El usuario vuelve al carrito y esta vacio", async function () {
  for (const page of pages) {
    await clickByAriaLabel(page, ADD_TO_CART_ARIA_LABEL);
    await expect(page.getByText(EMPTY_CART_MESSAGE_TEST_TEXT)).toBeVisible();
  }
});

Then("El carrito de compras tiene informacion de la compra", async function () {
  for (const page of pages) {
    await expect(
      page.getByRole("link", { name: ADD_TO_CART_ARIA_LABEL })
    ).toBeVisible();
    await expect(page.locator(".list-header")).toBeVisible();
  }
});

Then(
  "El contador del carrito muestra {string} item",
  async function (cantidad: string) {
    for (const page of pages) {
      await expect(page.locator(CART_COUNTER_SELECTOR)).toContainText(cantidad);
    }
  }
);

Then(
  "El contador del carrito muestra {string} items",
  async function (cantidad: string) {
    for (const page of pages) {
      await expect(page.locator(CART_COUNTER_SELECTOR)).toContainText(cantidad);
    }
  }
);

Then("El usuario ve el mensaje de confirmacion de compra", async function () {
  for (const page of pages) {
    const isSuccessful = await validateCheckoutSuccess(page);
    expect(isSuccessful).toBe(true);
  }
});

Then("El carrito queda vacio", async function () {
  for (const page of pages) {
    await clickByAriaLabel(page, ADD_TO_CART_ARIA_LABEL);
    await expect(page.getByText(EMPTY_CART_MESSAGE_TEST_TEXT)).toBeVisible();
  }
});

Then("El precio total es mayor a {string}", async function (precio: string) {
  for (const page of pages) {
    await expect(page.locator(TOTAL_PRICE_SELECTOR)).not.toContainText(precio);
  }
});

Then("El usuario ve el mensaje de error de email invalido", async function () {
  for (const page of pages) {
    await expect(page.getByText(INVALID_EMAIL_MESSAGE_TEST_TEXT)).toBeVisible();
  }
});

Then("El carrito muestra el mensaje de carrito vacio", async function () {
  for (const page of pages) {
    await expect(page.getByText(EMPTY_CART_MESSAGE_TEST_TEXT)).toBeVisible();
  }
});

Then("El boton de checkout no esta disponible", async function () {
  for (const page of pages) {
    await expect(page.getByTestId(CHECKOUT_BUTTON_TEST_ID)).not.toBeVisible();
  }
});

When("El usuario clickea en el boton menu", async function () {
  for (const page of pages) {
    await clickByText(page, MENU_BUTTON_TEXT);
    await page.waitForTimeout(2000);
  }
});

Then("El usuario regresa al menu principal", async function () {
  for (const page of pages) {
    const isSuccessful = await validateMainMenuReturn(page);
    expect(isSuccessful).toBe(true);
  }
});

Then("El carrito mantiene los productos agregados", async function () {
  for (const page of pages) {
    await expect(page.locator(CART_COUNTER_SELECTOR)).toContainText(
      cantidadDeCafes
    );
  }
});
