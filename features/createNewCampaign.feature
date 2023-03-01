@CreateNewCampaign
Feature: Create New Campaign

  @CL-0001 @CL-0001-1
  Scenario: Add new campaign with all required fields as TA Manager
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the required fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab

  @CL-0001 @CL-0001-2
  Scenario: Add new campaign with all required fields as Campaign Manager
    Given I sign in with role as "Campaign Manager 1"
    Then The Recruitment Page Should Be Displayed
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the required fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab


