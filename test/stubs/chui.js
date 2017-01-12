const p = require("path");
const chocolatechipui_path = p.join(__dirname, 'node_modules', 'chocolatechipui');

const chui = (...args) => {
  const results = {};
  for (value of args) {
    /**
     * Test for examples
     */
    if (value === 'e' || value === 'examples') {
      results.examples = true;
      results.examplesPath = p.join(chocolatechipui_path, 'examples').split('chui/test/stubs/')[1];
    } else {
      results.examples = false;
      results.examplesPath = undefined;
    }
    /**
     * Test for reference apps
     */
    if (value === 'r' || value === 'refapps') {
      results.referenceApps = true;
      results.referenceAppsPath = p.join(chocolatechipui_path, 'reference-apps').split('chui/test/stubs/')[1];;
    } else {
      results.referenceApps = false;
      results.referenceAppsPath = undefined;
    }
  }
  return results
};

module.exports = chui;