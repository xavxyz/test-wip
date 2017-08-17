import runGraphQL from './runGraphQL';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

describe('runGraphQL', () => {
  const schema = makeExecutableSchema({
    typeDefs: `
      type Query { say: String }
      type Mutation { addOneTo(number: Int!): Int }
    `,
  });
  addMockFunctionsToSchema({ schema });

  const context = {};

  it('should run an operation against a schema', async () => {
    const result = await runGraphQL({
      schema,
      context,
      operation: 'query hey { say }',
    });

    expect(result).toMatchSnapshot();
  });

  it('should reject the promise on invalid operation', () => {
    expect(
      runGraphQL({
        schema,
        context,
        operation: '{ say }',
      })
    ).rejects.toBeDefined();

    expect(
      runGraphQL({
        schema,
        context,
        operation: 'mutation { addOneTo(number: 20) }',
      })
    ).rejects.toBeDefined();
  });
});
