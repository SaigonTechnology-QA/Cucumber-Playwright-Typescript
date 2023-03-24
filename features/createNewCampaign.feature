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

  @CL-0002 @CL-0002-1
  Scenario: Add new campaign with full fields as TA Manager
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the full fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab

  @CL-0002 @CL-0002-2
  Scenario: Add new campaign with full fields as Campaign Manager
    Given I sign in with role as "Campaign Manager 1"
    Then The Recruitment Page Should Be Displayed
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the full fields
    Then the newly created campaign should be displayed on Campaigns page in Draft status tab

  @CL-0003 @CL-0003-1
  Scenario Outline: : As a TA Manager, I can not add new campaign when leave 1 required field blank
    Given I sign in with role as "TA Manager"
    When I go to Campaigns page
    Then The Recruitment Page Should Be Displayed
    And I click on "Add New Campaign" button
    And I create a new campaign all required fields except "<fieldName>" field
    Then the "This field is required" message should be displayed next to "<fieldName>" field

    Examples:
      | fieldName             |
      | Name                  |
      | Target                |
      | Priority              |
      | Request Date          |
      | Deadline              |
      | Job Skill Interviewer |
      | Department            |
      | Job title             |
      | Contract type         |
      | Difficulty Level      |
      | Job Description       |
      | Job Requirement       |
      | Primary Skills        |
      | Levels                |
      | Location              |
      | Salary                |
      | Knowledge             |
      | Skill/Experience      |
      | Attitude              |
      | English               |

  @CL-0003 @CL-0003-2
  Scenario Outline: : As a Campaign Manager, I can not add new campaign when leave 1 required field blank
    Given I sign in with role as "Campaign Manager 1"
    When I go to Campaigns page
    Then The Recruitment Page Should Be Displayed
    And I click on "Add New Campaign" button
    And I create a new campaign all required fields except "<fieldName>" field
    Then the "This field is required" message should be displayed next to "<fieldName>" field

    Examples:
      | fieldName             |
      | Name                  |
      | Target                |
      | Priority              |
      | Request Date          |
      | Deadline              |
      | Job Skill Interviewer |
      | Department            |
      | Job title             |
      | Contract type         |
      | Difficulty Level      |
      | Job Description       |
      | Job Requirement       |
      | Primary Skills        |
      | Levels                |
      | Location              |
      | Salary                |
      | Knowledge             |
      | Skill/Experience      |
      | Attitude              |
      | English               |

  @CL-0004 @CL-0004-1
  Scenario: Add new campaign with full fields as TA Manager
    Given I sign in with role as "TA Manager"
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    When I create a new campaign with the required fields and campaign name is "new01"
    And I click on "Add New Campaign" button
    And I create a new campaign with the required fields and existing campaign name
    Then  the "Campaign Name already exists" message should be displayed

  @CL-0004 @CL-0004-2
  Scenario: Add new campaign with full fields as TA Manager
    Given I sign in with role as "Campaign Manager 1"
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    When I create a new campaign with the required fields and campaign name is "new01"
    And I click on "Add New Campaign" button
    And I create a new campaign with the required fields and existing campaign name
    Then  the "Campaign Name already exists" message should be displayed