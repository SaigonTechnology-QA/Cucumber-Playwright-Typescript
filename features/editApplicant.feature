@EditApplicant
Feature: Edit Applicant

  @NA-0007 @NA-0007-1
  Scenario: Update Applicant successfully with all required fields as TA Manager
    Given I sign in with role as "TA Manager"
    When I go to New Applicants page
    And I click on "Edit Applicant" option in the hamburger menu button of an existed candidate
    And I update new info into existing Applicant with all required fields
    And I click on "<btnName>" common button
    Then the "Updated candidate" message should be displayed
    And the newly updated Applicant should be saved

    Examples:
      | btnName      |
      | Save         |
      | Save & Close |

  @NA-0007 @NA-0007-2
  Scenario: Update Applicant successfully with all required fields as TA Executive
    Given I sign in with role as "TA Executive"
    When I go to New Applicants page
    And I click on "Edit Applicant" option in the hamburger menu button of an existed candidate
    And I update new info into existing Applicant with all required fields
    And I click on "<btnName>" common button
    Then the "Updated candidate" message should be displayed
    And the newly updated Applicant should be saved

    Examples:
      | btnName      |
      | Save         |
      | Save & Close |
