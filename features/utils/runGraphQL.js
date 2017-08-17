import { graphql } from 'graphql';
import decomposeOperation from './decomposeOperation';

export default async ({
  schema,
  operation,
  context,
  variables,
  showLogs = false,
}) => {
  try {
    // get the operation string & AST
    const { source, information } = decomposeOperation(operation);

    const result = await graphql({
      schema,
      source,
      contextValue: context,
      variableValues: variables,
    });

    const { data, errors = [] } = result;

    if (showLogs) {
      console.log('\n// operation\n', operation);
      console.log('\n// operation result\n', data);
      console.log('\n// operation errors\n', errors);
    }

    return { value: data[information.selectionName], error: errors[0] };
  } catch (err) {
    throw new Error(err);
  }
};
