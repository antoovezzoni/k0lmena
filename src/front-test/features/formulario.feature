@Smoke
 Feature: Completar formulario
 Scenario: El usuario completa el formulario con datos válidos y lo envía
   Given El usuario abre el formulario de práctica
    When El usuario completa el nombre "Antonella" y el apellido "Vezzoni"
    And El usuario selecciona género "Femenino"
    And El usuario selecciona 5 años de experiencia
    And El usuario ingresa la fecha "14/08/2025"
    And El usuario marca profesión manual "Si" y automatización "Si"
    And El usuario marca herramientas IDE "Si" y WebDriver "Si"
    And El usuario selecciona el continente "Europe"
    And El usuario selecciona los comandos "Browser Commands, Wait Commands"
    And El usuario envía el formulario
    Then El usuario observa que el sitio responde sin errores

 