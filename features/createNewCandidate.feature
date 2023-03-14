@CreateNewCandidate
Feature: Create New Candidate

  @NA-0001 @NA-0001-1
  Scenario: Add new Candidate with all required fields as TA Manager
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I input all the required fields with the attachment is a file
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed in Candidate Pool page
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |

  @NA-0001 @NA-0001-2
  Scenario: Add new Candidate with all required fields as TA Executive
    Given I sign in with role as "TA Executive"
    Then The Recruitment Page Should Be Displayed
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I input all the required fields with the attachment is a file
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed in Candidate Pool page
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |
