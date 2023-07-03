@DemoCreateNewCampaign @Regression
Feature: Create New Campaign

  @DCL-0001 @Smoke
  Scenario: Add new campaign with all required fields as TA Manager
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the required fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab

  @DCL-0002
  Scenario: Add new campaign with full fields as TA Manager
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the full fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab

  @DCL-0003
  Scenario Outline: As a TA Manager, I can not add new campaign when leave 1 required field blank
    Given I sign in with role as "TA Manager"
    When I go to Campaigns page
    Then The Recruitment Page Should Be Displayed
    And I click on "Add New Campaign" button
    And I create a new campaign all required fields except "<fieldName>" field
    Then the "This field is required" message should be displayed next to "<fieldName>" field
    Examples:
      | fieldName |
      | Name      |
      | Target    |