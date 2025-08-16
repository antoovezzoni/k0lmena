import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";


Given("El usuario abre el formulario de práctica", async function (this: TestWorld) {
  form = new FormPage(this.page);
  await form.open();
});

When(
  "El usuario completa el nombre {string} y el apellido {string}",
  async function (this: TestWorld, nombre: string, apellido: string) {
    await form.fillFirstName(nombre);
    await form.fillLastName(apellido);
  }
);

When("El usuario selecciona género {string}", async function (this: TestWorld, genero: string) {
  await form.selectGender(genero.toLowerCase() === "masculino" ? "male" : "female");
});

When("El usuario selecciona {int} años de experiencia", async function (this: TestWorld, anios: number) {
  await form.selectExperience(anios === 2 ? 2 : 5);
});

When("El usuario ingresa la fecha {string}", async function (this: TestWorld, fecha: string) {
  await form.fillDate(fecha);
});

When(
  "El usuario marca profesión manual {string} y automatización {string}",
  async function (this: TestWorld, manual: string, autom: string) {
    await form.selectProfession({
      manual: manual.toLowerCase() === "si",
      automation: autom.toLowerCase() === "si"
    });
  }
);

When(
  "El usuario marca herramientas IDE {string} y WebDriver {string}",
  async function (this: TestWorld, ide: string, webdriver: string) {
    await form.selectTools({
      ide: ide.toLowerCase() === "si",
      webdriver: webdriver.toLowerCase() === "si"
    });
  }
);

When("El usuario selecciona el continente {string}", async function (this: TestWorld, continente: string) {

  await form.selectContinent("Europe");
});

When("El usuario selecciona los comandos {string}", async function (this: TestWorld, comandos: string) {
  if (!comandos.trim()) return; // sin selección
  const list = comandos.split(",").map(s => s.trim().toLowerCase());
  const mapped = list.map((x) => (x.includes("browser") ? "Browser" : "Wait")) as ("Browser" | "Wait")[];
  await form.selectCommands(mapped);
});

When("El usuario envía el formulario", async function (this: TestWorld) {
  await form.submit();
});


Then("El usuario observa que el sitio responde sin errores", async function (this: TestWorld) {
  await form.expectNoCrash();