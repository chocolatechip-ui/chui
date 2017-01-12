const iosTemplates = require('./ios-templates.js');

const createAndroidProject = (...args) => {
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

  results.appFiles = [
    'gradle.properties',
    'gradlew',
    'gradlew.bat',
    'local.properties',
    'android.app.iml',
    'settings.gradle',
    'build.gradle',
    'gradle-wrapper.jar',
    'gradle-wrapper.properties',
    'proguard-rules.pro',
    'build.gradle',
    'ApplicationTest.java',
    'AndroidManifest.xml',
    'MainActivity.java'
  ];

  return results;
}

module.exports = createAndroidProject;


