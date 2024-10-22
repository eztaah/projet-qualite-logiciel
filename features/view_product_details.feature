Scenario: View product details
  Given I have searched for "éponge"
  When I click on the first product in the search results
  Then I should be taken to the product details page
  And I should see the product title and price