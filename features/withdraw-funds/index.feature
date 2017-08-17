Feature: Withdrawing funds

  Scenario: Client can withdraw their funds   
    Given Robert has a balance of $100
    When Robert withdraws $20
    Then Robert’s balance should be $80
    And $20 should be dispensed

  Scenario: Client cannot withdraw more funds than they have
    Given Robert has a balance of $20
    When Robert withdraws $50
    Then nothing should be dispensed
    And Robert is informed that he does not have enough funds to withdraw
    And Robert’s balance should be $20