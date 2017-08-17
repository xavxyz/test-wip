import React from 'react';
import PropTypes from 'prop-types';
import { withState, compose } from 'recompose';
import { graphql } from 'react-apollo';

import MUTATION_WITHDRAW_FROM_BALANCE from './mutation.withdrawFromBalance';
import MUTATION_DEPOSIT_FUNDS from './mutation.depositFunds';

export const Form = ({ setState, state, mutate, label = 'Submit' }) => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        mutate({
          variables: { money: state.money },
        });
      }}
    >
      <input
        type="number"
        onChange={event => setState({ money: Number(event.target.value) })}
        value={state.money}
      />
      <button>
        {label}
      </button>
    </form>
  );
};

Form.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.shape({
    money: PropTypes.number.isRequired,
  }).isRequired,
  mutate: PropTypes.func,
};

const stateEnhancer = withState('state', 'setState', { money: 0 });
const StatefulForm = stateEnhancer(Form);

const FormWithMutation = ({ withdraw, deposit, ...props }) => {
  if (withdraw) {
    const Component = graphql(MUTATION_WITHDRAW_FROM_BALANCE)(StatefulForm);

    return <Component label="Withdraw from balance" {...props} />;
  }

  if (deposit) {
    const Component = graphql(MUTATION_DEPOSIT_FUNDS)(StatefulForm);

    return <Component label="Deposit funds" {...props} />;
  }

  return <StatefulForm {...props} />;
};

export default FormWithMutation;
