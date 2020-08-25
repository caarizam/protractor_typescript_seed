Feature: Sample scenarios

  @e2e
  Scenario: Sample login scenario
    Given The user is on the login page
    When The user tries to login with "sample.user@yopmail.com" and "12345678"
    Then The user should see the Welcome Page
