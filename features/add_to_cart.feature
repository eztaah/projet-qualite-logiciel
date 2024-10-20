Feature: Add product to cart

  Scenario: Successfully add a product to the cart
    Given I am on a product page
    When I add the product to the cart
    Then I should see the product in the cart
