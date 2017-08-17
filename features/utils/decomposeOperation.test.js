import gql from 'graphql-tag';
import decomposeOperation from './decomposeOperation';

describe('decomposeOperation', () => {
  it('should return a GraphQL source & infos about it from a GraphQL source', () => {
    const operationAsSource = 'query hello { world }';

    expect(decomposeOperation(operationAsSource)).toMatchSnapshot();
  });

  it('should return a GraphQL source & infos about it from a GraphQL source', () => {
    const operationAsDocument = gql`
      query hello {
        world
      }
    `;

    expect(decomposeOperation(operationAsDocument)).toMatchSnapshot();
  });

  it('should fail if the operation is an implicit query', () => {
    const implicitQuery = gql`
      {
        implicitQuery
      }
    `;

    expect(() =>
      decomposeOperation(implicitQuery)
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if the operation is an unnamed operation', () => {
    const disallowedDoc = gql`
      mutation {
        noOperationName
      }
    `;

    expect(() =>
      decomposeOperation(disallowedDoc)
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if the operation has more than 1 selection', () => {
    const disallowedDoc = gql`
      mutation tooComplexForThisProgram {
        firstSelection {
          abc
        }
        secondSelection {
          xyz
        }
      }
    `;

    expect(() =>
      decomposeOperation(disallowedDoc)
    ).toThrowErrorMatchingSnapshot();
  });
});
