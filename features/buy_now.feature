Feature: Product Search and Purchase on Amazon

  Scenario: Search for a product and attempt to purchase
    Given the user is on the Amazon homepage
    When the user searches for a product
    And the user clicks on the first product in the search results
    And the user clicks on "Buy Now" button
    Then the user should be redirected to the login page