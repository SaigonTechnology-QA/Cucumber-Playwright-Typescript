@CreateNewCandidate
Feature: Create New Candidate

  @NA-0001 @NA-0001-1
  Scenario: As a TA Manager I would like to create new applicant successfully with required fields and the attachment is a file
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields and the attachment is a file
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed in Candidate Pool page
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |

  @NA-0001 @NA-0001-2
  Scenario: TA Executive, I would like to create new applicant successfully with required fields and the attachment is a file
    Given I sign in with role as "TA Executive"
    Then The Recruitment Page Should Be Displayed
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields and the attachment is a file
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed in Candidate Pool page
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |

  @NA-0002 @NA-0002-1
  Scenario: As a TA Manager, I would like to create new applicant successfully with required fields  and attachment is a link
    Given I sign in with role as "TA Manager"
    Then The Recruitment Page Should Be Displayed
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields with the attachment is a link
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed on New Applicant List
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |

  @NA-0002 @NA-0002-2
  Scenario: As a TA Executive, I would like to create new applicant successfully with required fields  and attachment is a link
    Given I sign in with role as "TA Executive"
    Then The Recruitment Page Should Be Displayed
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields with the attachment is a link
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed on New Applicant List
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |

  @NA-0003 @NA-0003-1
  Scenario:As a TA Manager, I would like to create new applicant successfully with all fields and attached file
    Given I sign in with role as "TA Manager"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And And I create New Candidate with all fields and the attachment is a file
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed on Interview Process page of Campaign and Candidate Pool page
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |

  @NA-0003 @NA-0003-2
  Scenario:As a TA Executive, I would like to create new applicant successfully with all fields and attached file
    Given I sign in with role as "TA Executive"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And And I create New Candidate with all fields and the attachment is a file
    And I click on "<buttonName>" common button
    Then the newly created applicant should be displayed on Interview Process page of Campaign and Candidate Pool page
    Examples:
      | buttonName   |
      | Save         |
      | Save & Close |

  @NA-0004 @NA-0004-1
  Scenario Outline:As TA Manager, I cannot create new applicant when leave 1 required field blank
    Given I sign in with role as "TA Manager"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields but except "<fieldName>" field
    Then the "This field is required" message should be displayed next to "<fieldName>" field in Create New Candidate page
    Examples:
      | fieldName        |
      | Source           |
      | Skills           |
      | Working Location |
      | First name       |
      | Last name        |
      | Email            |
      | Phone number     |
      | Attachment       |

  @NA-0004 @NA-0004-2
  Scenario Outline:As TA Executive, I cannot create new applicant when leave 1 required field blank
    Given I sign in with role as "TA Executive"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields but except "<fieldName>" field
    Then the "This field is required" message should be displayed next to "<fieldName>" field in Create New Candidate page
    Examples:
      | fieldName        |
      | Source           |
      | Skills           |
      | Working Location |
      | First name       |
      | Last name        |
      | Email            |
      | Phone number     |
      | Attachment       |

  @NA-0005 @NA-0005-1
  Scenario Outline:As TA Manager, I cannot create new applicant when leave 1 required field blank
    Given I sign in with role as "TA Manager"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create successfully an applicant with email "abc1@gmail.com"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields and the attachment is a file
    And I input email "abc1@gmail.com" in Applicants page
    And I click on "Save" button
    Then the "Email is existed" toast message should be displayed

  @NA-0005 @NA-0005-2
  Scenario Outline:As TA Executive, I cannot create new applicant when leave 1 required field blank
    Given I sign in with role as "TA Executive"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create successfully an applicant with email "abc1@gmail.com"
    When I go to New Applicants page
    And I click on "Add New Candidate" button
    And I create New Candidate with all the required fields and the attachment is a file
    And I input email "abc1@gmail.com" in Applicants page
    And I click on "Save" button
    Then the "Email is existed" toast message should be displayed
