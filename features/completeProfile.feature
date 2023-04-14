@completeProfile
Feature: Complete Profile

  @NA-0009 @NA-0009-1
  Scenario: Complete profile of an Applicant as TA Manager
    Given I sign in with role as "TA Manager"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields with the attachment is a link
    And I click on "<btnName>" common button
    And I go to New Applicants page
    And I click on "Complete profile" option in the hamburger menu button
    And I input all required fields to complete applicant profile
    And I click on "Confirm" button in the Complete Profile modal
    Then The "Candidates have CVs have been moved to Interview Process." message should be displayed
    And the newly created applicant should be displayed in Candidate Pool page
    Examples:
      | btnName      |
      | Save & Close |

  @NA-0009 @NA-0009-2
  Scenario: Complete profile of an Applicant as TA Manager
    Given I sign in with role as "TA Executive"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields with the attachment is a link
    And I click on "<btnName>" common button
    And I go to New Applicants page
    And I click on "Complete profile" option in the hamburger menu button
    And I input all required fields to complete applicant profile
    And I click on "Confirm" button in the Complete Profile modal
    Then The "Candidates have CVs have been moved to Interview Process." message should be displayed
    And the newly created applicant should be displayed in Candidate Pool page
    Examples:
      | btnName      |
      | Save & Close |