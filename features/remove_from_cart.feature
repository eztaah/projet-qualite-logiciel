Feature: Amazon Cart Management

  Scenario: Remove a product from the cart
    Given I have a product in my cart
    When I go to the cart page
    And I remove the product from the cart
    Then the cart should be empty
