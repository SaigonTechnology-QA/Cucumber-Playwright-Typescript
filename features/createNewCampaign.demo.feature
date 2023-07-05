@DemoCreateNewCampaign @Regression
Feature: Create New Recruitment Campaign
  TA Manager can create a Recruitment campaign whenever there's a resource request.

  Background: TA Manager Access To The Recruitment Page
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed

  @DCL-0001 @Smoke
  Scenario: TA Manager Should Add New Campaign With The Required Fields Filled Successfully
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the required fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab

  @DCL-0002 
  Scenario: TA Manager Should Add New Campaign With Full Fields Filled Successfully
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the full fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab

  @DCL-0003
  Scenario Outline: TA Manager Could NOT Add A New Campaign With A Blank Required Field
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign all required fields except "<fieldName>" field
    Then the "This field is required" message should be displayed next to "<fieldName>" field
    Examples:
      | fieldName |
      | Name      |
      | Target    |