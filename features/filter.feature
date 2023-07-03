@Filter
Feature: Filter

  @CP-0001 @CP-0001-1
  Scenario: Search Candidate successfully by basic info as TA Manager
    Given I sign in with role as "TA Manager"
    When I go to Candidate Pool page
    And I fill in Basic Info with email
    And I click on "Search" button
    Then The system should return the candidate match with searching email

  @CP-0001 @CP-0001-2
  Scenario: Search Candidate successfully by basic info as TA Executive
    Given I sign in with role as "TA Executive"
    When I go to Candidate Pool page
    And I fill in Basic Info with email
    And I click on "Search" button
    Then The system should return the candidate match with searching email
