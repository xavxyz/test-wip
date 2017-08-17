import { runGraphQL } from '../utils';

import MUTATION_DEPOSIT_FUNDS from '../../ui/src/Form/mutation.depositFunds';

export default {
  async depositFunds(money) {
    const { value, error } = await runGraphQL({
      schema: this.schema,
      context: this.context,
      operation: MUTATION_DEPOSIT_FUNDS,
      variables: { money },
      // showLogs: true,
    });

    this.value = value;
    this.error = error;
  },
};
