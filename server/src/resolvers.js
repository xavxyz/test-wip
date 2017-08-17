const resolvers = {
  Mutation: {
    withdrawFromBalance(root, { money }, { Balance }) {
      const currentBalance = Balance.get();

      if (currentBalance < money) {
        throw new Error('Insufficient balance to perform this withdraw');
      }

      Balance.update({ diff: -money });

      return money;
    },
    depositFunds(root, { money }, { Balance }) {
      Balance.update({ diff: money });
      return Balance.get();
    },
  },
  Query: {
    getBalance(root, args, { Balance }) {
      return Balance.get();
    },
  },
};

export default resolvers;
