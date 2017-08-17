const typeDefs = `
  type Mutation {
    withdrawFromBalance(money: Int!): Int
    depositFunds(money: Int!): Int
  }

  type Query {
    getBalance: Int
  }
`;

export default typeDefs;
