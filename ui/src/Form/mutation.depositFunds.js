// note: should be a GraphQL file
// as CRA without ejecting doesn't allow to configure Babel or Webpack this file is a JS file
import { gql } from 'react-apollo';
export default gql`
  mutation depositFunds($money: Int!) {
    depositFunds(money: $money)
  }
`;
