Feature: Amazon User Login

  Scenario: Successful Login with valid credentials
    Given I am on the Amazon login page
    When I enter valid credentials
    Then I should be logged in and redirected to the homepage
