Feature: Amazon Cart Management

  Scenario: Add a product to the cart
    Given I am on the Amazon homepage
    When I search for "éponge"
    And I add the first product to the cart
    Then I should see the product in the cart
