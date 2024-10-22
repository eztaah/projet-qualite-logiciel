Feature: Amazon User Login

  Scenario: CAPTCHA displayed after entering valid credentials
    Given I am on the Amazon login page
    When I enter credentials
    Then I should see a CAPTCHA verification page
