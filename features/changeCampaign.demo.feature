@DemoChangeCampaign @Regression
Feature: Change Campaign

  @DIP-0001 @Smoke
  Scenario: Change campaign of a candidate in the round Scan CV as TA Manager
    Given I sign in with role as "Campaign Manager 1"
    And I create a first campaign with the required fields and move it to Pending tab
    And I create a second campaign with the required fields and move it to Pending tab
    And I log out
    And I sign in with role as "TA Manager"
    And I move the first campaign to Active status
    And I move the second campaign to Active status
    And I create a new applicant with the first campaign in the Scan CV round of Interview Process page
    When I go to Interview Process page
    And I select my first campaign
    And I click on "Change campaign" option in the hamburger menu button of the existing candidate in tab Scan CV
    And I input required fields in Change Campaign modal with the second campaign and Interview Round is <Job Skill Interview> and Interview Status is <Waiting>
    And I click on Confirm button in Change Campaign modal
    Then the "Campaign changed" message should be displayed and the candidate should be moved to the second campaign and in <Job Skill Interview> tab with <Waiting> status

  @DIP-0002 @Smoke
  Scenario: Change campaign of a candidate in the Job Skill Interview round as TA Manager
    Given I sign in with role as "Campaign Manager 1"
    And I create a first campaign with the required fields and move it to Pending tab
    And I create a second campaign with the required fields and move it to Pending tab
    And I log out
    And I sign in with role as "TA Manager"
    And I move the first campaign to Active status
    And I move the second campaign to Active status
    And I create a new applicant with the first campaign in the Job Skill Interview round of Interview Process page
    When I go to Interview Process page
    And I select my first campaign
    And I click on Job Skill Interview tab
    And I click on "Update campaign" option in the hamburger menu button of the candidate
    And I input required fields in Change Campaign modal with the second campaign and Interview Round is <Scan CV> and Interview Status is <Processing>
    And I click on Confirm button in Change Campaign modal
    Then the "Campaign changed" message should be displayed and the candidate should be moved to the second campaign and in <Scan CV> tab with <Processing> status

  @DIP-0003 @Sanity
  Scenario: Change campaign of a candidate in the TA Interview round as TA Manager
    Given I sign in with role as "Campaign Manager 1"
    And I create a first campaign with the required fields and move it to Pending tab
    And I create a second campaign with the required fields and move it to Pending tab
    And I log out
    And I sign in with role as "TA Manager"
    And I move the first campaign to Active status
    And I move the second campaign to Active status
    And I create a new applicant with the first campaign in the TA Interview round of Interview Process page
    When I go to Interview Process page
    And I select my first campaign
    And I click on TA Interview tab
    And I click on "Update campaign" option in the hamburger menu button of the candidate
    And I input required fields in Change Campaign modal with the second campaign and Interview Round is <Scan CV> and Interview Status is <Processing>
    And I click on Confirm button in Change Campaign modal
    Then the "Campaign changed" message should be displayed and the candidate should be moved to the second campaign and in <Scan CV> tab with <Processing> status
