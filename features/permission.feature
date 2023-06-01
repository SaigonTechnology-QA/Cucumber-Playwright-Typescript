@Permission
Feature: Permission

    @IP-0008
    Scenario: As a TA Manager, I would like to see rounds and candidates of all campaigns
        Given I sign in with role as "Campaign Manager 1"
        And I create a first campaign with the required fields and move it to Pending tab
        And I create a second campaign with the required fields and move it to Pending tab
        And I log out
        And I sign in with role as "TA Manager"
        And I move the first campaign to Active status
        And I move the second campaign to Active status
        And I create a first new applicant with the first campaign with round is <Scan CV> and with status is <Processing>
        And I create a second new applicant with the second campaign with round is <Job Skill Interview> and with status is <Waiting>
        When I go to Interview Process page
        And I select my first campaign
        Then Then I should can see rounds: Scan CV, Job Skill Interview, TA Interview, Send Offer and see the first candidate with status is <Processing>
        And I select my second campaign
        Then I should can see rounds: Scan CV, Job Skill Interview, TA Interview, Send Offer
        And I click on <Job Skill Interview> tab
        Then I should can see the second candidate with status is <Waiting>

    @IP-0009
    Scenario: As a TA Executive, I would like to see rounds and candidates not beloging to my campaign
        Given I sign in with role as "Campaign Manager 2"
        And I create a campaign with the required fields and name <campaign_name> and move it to Pending tab
        And I log out
        And I sign in with role as "TA Manager"
        And I move the campaign <campaign_name> to Active status and add TA Executive <TAE1>
        And I create a new applicant with campaign <campaign_name> in the <Scan CV> round and with status is <Processing>
        And I log out
        And I sign in with role as "TA Executive"
        When I go to Interview Process page
        And I select my campaign <campaign_name>
        Then I should can see rounds: Scan CV, Job Skill Interview, TA Interview, Send Offer and I can see the candidate with status is <Processing>

    @IP-0010
    Scenario: As a TA Executive, I would like to see rounds and candidates not beloging to my campaign
        Given I sign in with role as "Campaign Manager 2"
        And I create a campaign with the required fields and name <campaign_name> and move it to Pending tab
        And I log out
        And I sign in with role as "TA Manager"
        And I move the campaign <campaign_name> to Active status
        And I create a new applicant with campaign <campaign_name> in the <Scan CV> round and with status is <Processing>
        And I log out
        And I sign in with role "TA Executive" not belonging to campaign <campaign_name>
        When I go to Interview Process page
        And I input <campaign_name> in "Select Campaign" dropdown list
        Then I cannot see <campaign_name> in dropdown list