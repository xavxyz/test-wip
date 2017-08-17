import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import './index.css';
import Form from './Form';

class App extends React.Component {
  createClient() {
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: 'http://localhost:8080/graphql',
      }),
    });
  }

  render() {
    return (
      <ApolloProvider client={this.createClient()}>
        <div>
          <Form withdraw />
          <Form deposit />
        </div>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
