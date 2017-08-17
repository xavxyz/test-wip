import fse from 'fs-extra';
import path from 'path';

const isNotFeatureDefinition = filename =>
  !filename.includes('.js') && !filename.includes('utils');

const isStepDefinition = filename =>
  !filename.includes('.feature') && !filename.includes('world');

const isWorldDefinition = filename => filename.includes('world');

export default supportCodeDirectory => async ({
  setWorldConstructor,
  Given,
  When,
  Then,
}) => {
  try {
    // get the content of the /features directory
    const featuresDirectoryContent = await fse.readdir(supportCodeDirectory);

    // only keep references related to gherkin features definition
    // == remove javascript files and the /utils directory from the list
    const featuresList = featuresDirectoryContent.filter(
      isNotFeatureDefinition
    );

    let worldContstructors = [];

    // load the support code of each feature, one by one
    for (const currentFeature of featuresList) {
      // get the files list of the current feature
      const filesList = await fse.readdir(
        path.join(supportCodeDirectory, currentFeature)
      );

      const filesToLoad = setWorldConstructor
        ? isWorldDefinition
        : isStepDefinition;

      // only keep references to the support code related to the steps
      // == remove gherkin files and the world file
      const stepFiles = filesList.filter(filesToLoad);

      const relativePath = path.relative(__dirname, supportCodeDirectory);

      // for each step file, load its definition
      if (setWorldConstructor) {
        const {
          default: definitionObject,
        } = require(`${relativePath}/${currentFeature}/${stepFiles[0]}`);
        worldContstructors.push(definitionObject);
      } else {
        // console.log('loading step files', stepFiles);
        stepFiles.forEach(definitionFile => {
          const {
            default: definitionFn,
          } = require(`${relativePath}/${currentFeature}/${definitionFile}`);

          definitionFn({ Given, When, Then });
        });
      }
    }

    if (worldContstructors.length) {
      const world = worldContstructors.reduce(
        (worldConstructor, featureConstructor) => ({
          ...worldConstructor,
          ...featureConstructor,
        }),
        {}
      );

      return () =>
        setWorldConstructor(function() {
          return world;
        });
    }
  } catch (e) {
    console.error(e);
    throw new Error('Something bad happened');
  }
};
