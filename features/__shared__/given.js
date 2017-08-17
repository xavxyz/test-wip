export default function({ Given }) {
  // Scenario: Client can withdraw their funds
  // Scenario: Client cannot withdraw more funds than they have
  Given('Robert has a balance of ${int}', function(int) {
    this.setContext({ initialBalance: int });
  });
}
