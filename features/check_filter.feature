Feature: Amazon Category Filter

  Scenario: Apply category filter to search results
    Given I have searched for "Ordinateur"
    When I apply the category filter "Ordinateurs portables classiques"
    Then I should see only laptops in the results