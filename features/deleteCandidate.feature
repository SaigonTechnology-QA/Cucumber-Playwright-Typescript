@DeleteCandidate
Feature: Delete Candidate

  @NA-0008 @NA-0008-1
  Scenario: Delete Candidate successfully as TA Manager
    Given I sign in with role as "TA Manager"
    When I go to New Applicants page
    And I click on "Delete candidate" option in the hamburger menu button of an existed candidate
    And I click on "Yes" button in the Confirm Message modal
    Then the "Deleted candidate" message should be displayed
    And the newly deleted Candidate should not be displayed on New Applicants page

  @NA-0008 @NA-0008-2
  Scenario: Delete Candidate successfully as TA Executive
    Given I sign in with role as "TA Executive"
    When I go to New Applicants page
    And I click on "Delete candidate" option in the hamburger menu button of an existed candidate
    And I click on "Yes" button in the Confirm Message modal
    Then the "Deleted candidate" message should be displayed
    And the newly deleted Candidate should not be displayed on New Applicants page
