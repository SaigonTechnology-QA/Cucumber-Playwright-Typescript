@ChangeStatusCampaign
Feature: Change Status Campaign

  @CL-0006
  Scenario: "As a Campaign Manager, I would like to change status campaign from Draft to Pending. As a TA Manager, I would like to change status campaign from Pending to Approved and from Approved to Active "
    Given I sign in with role as "Campaign Manager 1"
    When I go to Campaigns page
    And I click on "Add New Campaign" button
    And I create a new campaign with the Manager field is fullname of current login user
    And I click on "Draft" tab
    And I click on "Submit" button in the hamburger menu of existing campaign
    And I click on "Yes" button on the Comfirm modal
    And I click on "Pending" tab
    Then the newly updated Campaign should be display on table
    And I log out
    When I sign in with role as "TA Manager"
    When I go to Campaigns page
    And I click on "Pending" tab
    And I click on "Approve campaign" button in the hamburger menu of existing campaign
    And I click on "Yes" button on the Comfirm modal
    And I click on "Approved" tab
    Then the newly updated Campaign should be display on table
    And I click on "Update campaign" button in the hamburger menu of existing campaign
    And I input values for 2 fields TA Executive and Primary TA Executive
    And I click on "Approved" tab
    And I click on "Active campaign" button in the hamburger menu of existing campaign
    And I click on "Yes" button on the Comfirm modal
    And I click on "Active" tab
    Then the newly updated Campaign should be display on table