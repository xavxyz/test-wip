import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import createContext from './context';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const PORT = 8080;
const server = express();

// note: this context is using a model relying on a single value,
// this is why we are comfortabl about passing an initial value

server.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress(request => ({
    schema,
    context: createContext(),
  }))
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    query: `
{ 
  getBalance 
}
`,
  })
);

server.listen(PORT, () => {
  console.log(
    `GraphQL Server is now running on http://localhost:${PORT}/graphql`
  );
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});
