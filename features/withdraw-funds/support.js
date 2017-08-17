import expect from 'expect';

export default function withdrawFundsSteps({ When, Then }) {
  // Scenario: Client can withdraw their funds
  // Scenario: Client cannot withdraw more funds than they have
  When('Robert withdraws ${int}', async function(int) {
    await this.withdrawFromBalance(int);
  });

  Then('${int} should be dispensed', function(int) {
    expect(this.value).toBe(int);
  });

  // Scenario "Client cannot withdraw more funds than they have"
  Then('nothing should be dispensed', function() {
    expect(this.value).toNotExist();
  });

  Then(
    'Robert is informed that he does not have enough funds to withdraw',
    function() {
      expect(this.error.message).toInclude('Insufficient');
    }
  );
}
