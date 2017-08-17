import { runGraphQL } from '../utils';

import MUTATION_WITHDRAW_FROM_BALANCE from '../../ui/src/Form/mutation.withdrawFromBalance';

export default {
  async withdrawFromBalance(money) {
    const { value, error } = await runGraphQL({
      schema: this.schema,
      context: this.context,
      operation: MUTATION_WITHDRAW_FROM_BALANCE,
      variables: { money },
    });

    this.value = value;
    this.error = error;
  },
};
