const iosTemplates = require('./ios-templates.js');

const createiOSProject = (...args) => {
  const results = {};
  for (value of args) {
    if (/name/img.test(value)) {
      results.name = value.split('=')[1];
    } else if (/^o=|^os=/img.test(value)) {
      results.os = value.split('=')[1];
    } else if ('h' || 'hybrid') {
      results.hybrid = true;
    } else {
      results.hybrid = false;
    }
  }

  if (results.name && results.hybrid && results.os === 'ios') {
    results.xcode = true;
    results.appFiles = [
      "appDelegate",
      "viewController",
      "infoPlist",
      "mainStoryboard",
      "launchScreenStoryboard",
      "appiconset",
      "itunesartwork",
      "launchimages",
      "debugger",
      "xcscheme",
      "xcschememanagement",
      "pbxproj",
      "html",
      "testsPlist",
      "testsSwift"
    ]
  }
  return results;
}

module.exports = createiOSProject;