import { BASEURL } from "../config";
import { Given, When, Then } from "@cucumber/cucumber";
import { pages } from "../hooks/hook";
import { getByLocatorAndFillIt } from "../utils/interactions";

Given("El usuario abre el formulario de práctica", async () => {
  for (const page of pages) {
    await page.goto(BASEURL);
  }
});

When(
  "El usuario completa el nombre {string} y el apellido {string}",
  async (name, lastName) => {
    for (const page of pages) {
      await getByLocatorAndFillIt(page, "firstname", name);
      await getByLocatorAndFillIt(page, "lastname", lastName);
    }
  }
);

