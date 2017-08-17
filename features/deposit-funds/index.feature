Feature: Deposit funds

  Scenario: Client can deposit cash to their account
    Given Robert has a balance of $30
    When Robert deposits $50
    Then Robert’s balance should be $80
    And Robert should be informed about his new balance