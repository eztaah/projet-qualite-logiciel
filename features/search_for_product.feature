Scenario: Search for a product and verify results are displayed
  Given I am on the Amazon homepage
  When I search for "éponge"
  Then I should see a list of products