import expect from 'expect';

export default function depositFundsSteps({ When, Then }) {
  // Scenario: Client can deposit cash to their account
  When('Robert deposits ${int}', async function(int) {
    await this.depositFunds(int);
  });

  Then('Robert should be informed about his new balance', async function() {
    expect(this.value).toBe(await this.getBalance());
  });
}
