Feature: Shopping Cart Amazon

  Scenario: Verify product quantities in the cart
    Given the user is on the Amazon homepage
    When the user searches for a product
    And the user clicks on the first product in the search results
    And the user adds the product to the cart
    And the user repeats proccedure for multiple items
    And the user goes to the cart page
    Then the user should see the correct quantity of the product in the cart