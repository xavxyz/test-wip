import { parse, print } from 'graphql';

// from a GraphQL AST or a GraphQL string, get both
// source: string
// document info extracted from the AST
export default operation => {
  const isString = typeof operation === 'string';

  return {
    source: isString ? operation : print(operation),
    information: extractDocumentInfo(isString ? parse(operation) : operation),
  };
};

// note: should be extracted elsewhere
// extract operation name and first selection name
// input: parsed graphql document (gql`` / graphql file)
// gql`query yoUoYo {
//   getBalance { ... }
// }`
// output: { operation: 'query', operationName: 'yoUoYo', selectionName: 'getBalance' }
const extractDocumentInfo = document => {
  const { definitions } = document;
  const [firstDef] = definitions;

  const {
    selectionSet: { selections },
    operation,
    name: operationNameObject,
  } = firstDef;

  if (!operationNameObject) {
    if (operation === 'query') {
      throw new Error(
        'Implicit query are not allowed! Please specify an operation name.'
      );
    }

    throw new Error(
      'Unnamed operations are not allowed! Please specify an operation name.'
    );
  }

  if (selections.length > 1) {
    throw new Error(
      'More than 1 selection is defined in this operation! Please specify only 1 selection'
    );
  }

  const [firstSelection] = selections;
  const { name: { value: selectionName } } = firstSelection;

  return { operation, operationName: operationNameObject.value, selectionName };
};
