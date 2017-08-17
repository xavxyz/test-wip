import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormWithMutation, { Form } from './index';

storiesOf('Form', module)
  .add('mocked form', () =>
    <Form
      state={{ money: 10 }}
      setState={action('change event on input value')}
      mutate={action('mutation triggered')}
      label={'Submit'}
    />
  )
  .add('withdraw form', () => <FormWithMutation withdraw />)
  .add('deposit form', () => <FormWithMutation deposit />);
