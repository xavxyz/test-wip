import { defineSupportCode } from 'cucumber';
import { setSupportLoader } from './utils';

defineSupportCode(async function({
  Given,
  When,
  Then,
  Before,
  setWorldConstructor,
}) {
  // create a support loader related to the cucumber entry point (=== this file, here.)
  const supportLoader = setSupportLoader(__dirname);

  const worldConstructor = await supportLoader({ setWorldConstructor });

  worldConstructor();

  Before(async function() {
    // set the schema for this scenario
    this.createSchema();
  });

  Before(
    {
      tags: '@mock',
    },
    async function() {
      // set the mocks if needed
      this.mockSchema();
    }
  );

  await supportLoader({ Given, When, Then });
});
