import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { runGraphQL } from '../utils';

import typeDefs from '../../server/src/typeDefs';
import resolvers from '../../server/src/resolvers';
import createMocks from '../../server/src/mocks';
import createContext from '../../server/src/context';

import QUERY_GET_BALANCE from '../../ui/src/Display/query.getBalance';

export default {
  value: null,
  error: null,
  schema: null,
  context: null,
  mockedSchema: false,
  createSchema() {
    this.schema = makeExecutableSchema({ typeDefs, resolvers });
  },
  mockSchema() {
    this.mockedSchema = true;
  },
  setContext({ initialBalance }) {
    this.context = createContext();

    if (this.mockedSchema) {
      addMockFunctionsToSchema({
        schema: this.schema,
        mocks: createMocks({ initialBalance }),
      });
    }
    this.context.Balance.update({ set: initialBalance });
  },
  async getBalance() {
    const { value } = await runGraphQL({
      schema: this.schema,
      context: this.context,
      operation: QUERY_GET_BALANCE,
    });

    return value;
  },
};
