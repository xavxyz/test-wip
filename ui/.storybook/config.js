/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, addDecorator } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-decorator';

import typeDefs from '../../server/src/typeDefs';
import createMocks from '../../server/src/mocks';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks: createMocks({ initialBalance: 100 }),
  })
);

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
