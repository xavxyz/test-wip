const createMocks = ({ initialBalance }) => {
  let currentBalance = initialBalance;

  const domainGet = () => currentBalance;
  const domainWithdraw = money => {
    if (money > currentBalance) {
      throw new Error('Insufficient balance to perform this withdraw');
    }

    currentBalance -= money;

    return money;
  };
  const domainDeposit = money => (currentBalance += money);

  return {
    Mutation: () => ({
      withdrawFromBalance(root, { money }) {
        return domainWithdraw(money);
      },
      depositFunds: (root, { money }) => domainDeposit(money),
    }),
    Query: () => ({
      getBalance: () => domainGet(),
    }),
  };
};

export default createMocks;
