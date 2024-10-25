Feature: Change Country on Amazon

  Scenario: User changes the country to USA on Amazon
    Given the user is on the Amazon France homepage
    When the user opens the "All" menu
    And the user selects the "France" option
    And the user opens the country selector
    And the user selects "United States" from the country list
    And the user clicks on "Access Website" to confirm the country change
    Then the user should be redirected to the Amazon USA website
