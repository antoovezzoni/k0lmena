@ComprarCafe  @Smoke
Feature: Coffee Cart - Comprar Cafe
  
  Background:
    Given El usuario abre la pagina de compra de cafe

  @Carrito
  Scenario: El usuario agrega un cafe al carrito
    When El usuario selecciona "1" cafe expresso
    And El usuario clickea en el carrito de compras
    Then El carrito de compras tiene informacion de la compra
    And El contador del carrito muestra "1" item

 @Compra
  Scenario: El usuario realiza una compra completa exitosa
    When El usuario selecciona "2" cafe cappuccino
    And El usuario clickea en el carrito de compras
    And El usuario confirma la compra
    And El usuario completa con su nombre "Antonella" y email "antonella@gmail.com"
    Then El carrito queda vacio

  @Carrito
  Scenario: El usuario agrega multiples cafes de diferentes tipos
    When El usuario selecciona "1" cafe expresso
    And El usuario selecciona "2" cafe latte
    And El usuario selecciona "1" cafe americano
    And El usuario clickea en el carrito de compras
    Then El carrito de compras tiene informacion de la compra
    And El contador del carrito muestra "4" items

  @Carrito
  Scenario: El usuario intenta acceder al carrito vacio
    When El usuario clickea en el carrito de compras
    Then El carrito muestra el mensaje de carrito vacio
    And El boton de checkout no esta disponible

  @Navegacion
  Scenario: El usuario navega entre el menu principal y el carrito
    When El usuario selecciona "1" cafe espresso
    And El usuario clickea en el carrito de compras
    And El usuario clickea en el boton menu
    Then El usuario regresa al menu principal