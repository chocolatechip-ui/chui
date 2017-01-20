const chai = require('chai');
const p = require("path");
const chocolatechipui_path = p.join(__dirname, 'node_modules', 'chocolatechipui');
const warnNoArgs = require('./stubs/warnNoArgs');
const chui = require('./stubs/chui');
const createJSProject = require('./stubs/createJSProject');
const createiOSProject = require('./stubs/createiOSProject');
const createAndroidProject = require('./stubs/createAndroidProject');
const user = (process.platform === "win32") ? process.env.USERNAME : process.env.USER;
const pkg = require('../package.json');

describe('Tests for package.json:', function() {
  it('Name should be "chui".', function() {
    chai.assert.equal(pkg.name, 'chui');
  });

  it('Version should be 2.6.0.', function() {
    chai.assert.equal(pkg.version, '2.6.0');
  });

  it('License should be MIT.', function() {
    chai.assert.equal(pkg.license, 'MIT');
  });

  it('Repository should be "git+https://github.com/chocolatechip-ui/chui.git".', function() {
    chai.assert.equal(pkg.repository.url, 'git+https://github.com/chocolatechip-ui/chui.git');
  });

});

describe("Tests for warnNoArgs.js:", function () {
  it('warnNoArgs without arguments should return warning.', function() {
    const result = warnNoArgs();
    chai.assert.equal(result, `
ATTENTION: Arguments missing.
To output the examples, use: chui -e.
To output the reference apps, use: chui -r.
To create a project for an app, use: chui -n myApp.
(Replace myApp with the name for your app.)';
To create a project with JSPM, use: chui -n myApp -j.
To create a project with Box, use: chui -n myApp -b.
To create a project with Box and JSPM, use: chui -n myApp -j -b.
To create a project type, use the flag -t: chui -n myApp -t navigation or chui -n myApp -t slideout or chui -n myApp -t tabbar.
To create a project for a specific os, use the -o flag: chui -n myApp -o android or chui -n myApp -o ios or chui -n myApp -o windows.`)
  });

  it('warnNoArgs with args should return them.', function() {
    const result = warnNoArgs('These are some args.');
    chai.assert.equal(result[0], 'These are some args.');
  });
});

describe('Tests for chui.js:', function() {
  it('If chui is provided "e" or "examples", should return path to examples.', function() {
    const results = chui('e');
    chai.assert.equal(results.examples, true);
    chai.assert.equal(results.examplesPath, 'node_modules/chocolatechipui/examples');
    results.examples = false;
    const results2 = chui('examples');
    chai.assert.equal(results2.examples, true);
    chai.assert.equal(results2.examplesPath, 'node_modules/chocolatechipui/examples');
  });

  it('If chui isprovided "r", or "refapps, should return path to reference apps.', function() {
    const results = chui('r');
    chai.assert.equal(results.referenceApps, true);
    chai.assert.equal(results.referenceAppsPath,'node_modules/chocolatechipui/reference-apps');
    results.referenceApps = false;
    const results2 = chui('refapps');
    chai.assert.equal(results2.referenceApps, true);
    chai.assert.equal(results2.referenceAppsPath,'node_modules/chocolatechipui/reference-apps');
  });
});

describe('Tests for createJSProject.js:', function() {
  it('If no name for project, should give warning.', function() {
    const results = createJSProject();
    chai.assert.equal(results.name, false);
    chai.assert.equal(results.warning, `
ATTENTION: Arguments missing.
To output the examples, use: chui -e.
To output the reference apps, use: chui -r.
To create a project for an app, use: chui -n myApp.
(Replace myApp with the name for your app.)';
To create a project with JSPM, use: chui -n myApp -j.
To create a project with Box, use: chui -n myApp -b.
To create a project with Box and JSPM, use: chui -n myApp -j -b.
To create a project type, use the flag -t: chui -n myApp -t navigation or chui -n myApp -t slideout or chui -n myApp -t tabbar.
To create a project for a specific os, use the -o flag: chui -n myApp -o android or chui -n myApp -o ios or chui -n myApp -o windows.`)
  });

  it('If name but no type, should return "basic" project.', function() {
    const results = createJSProject('name=MyApp');
    chai.assert.equal(results.name, 'MyApp');
    chai.assert.equal(results.type, 'basic');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/for-desktop/chui-basic/index.html')
  });

  it('If name and type "navigation", should return "navigation" project.', function() {
    const results = createJSProject('name=MyApp', 'type=navigation');
    chai.assert.equal(results.name, 'MyApp');
    chai.assert.equal(results.type, 'navigation');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/for-desktop/chui-navigation/index.html')
  });

  it('If name and type "slideout", should return "slideout" project.', function() {
    const results = createJSProject('name=MyApp', 'type=slideout');
    chai.assert.equal(results.name, 'MyApp');
    chai.assert.equal(results.type, 'slideout');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/for-desktop/chui-slideout/index.html')
  });

  it('If name and type "tabbar", should return "tabbar" project.', function() {
    const results = createJSProject('name=MyApp', 'type=tabbar');
    chai.assert.equal(results.name, 'MyApp');
    chai.assert.equal(results.type, 'tabbar');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/for-desktop/chui-tabbar/index.html')
  });

  it('If name and jspm, should return true.', function() {
    const results = createJSProject('name=MyApp', 'typings', 'jspm');
    chai.assert.equal(results.jspm, true);
  });

  it('If name and jspm, should return paths to jsmp files.', function() {
    const results = createJSProject('name=MyApp', 'jspm');
    chai.assert.equal(results.jspmConfigPath, 'node_modules/chocolatechipui/cli-resources/jspm/config.js');
    chai.assert.equal(results.jspmGulpfilePath, 'node_modules/chocolatechipui/cli-resources/jspm/gulpfile.js');
    chai.assert.equal(results.jspmPackagePath, 'node_modules/chocolatechipui/cli-resources/jspm/package.json');
  });

  it('If name and no jspm flag, jspm should return false.', function() {
    var results = createJSProject('name=MyApp');
    chai.assert.equal(results.jspm, false);
  });

  it('If name and jspm and custom flag, path to minimal path should be: "node_modules/chocolatechipui/cli-resources/jspm/dist".', function() {
    const results = createJSProject('name=MyApp', 'jspm', 'custom');
    chai.assert.equal(results.minChui, 'node_modules/chocolatechipui/cli-resources/jspm/dist')
  })

  it('If name and jspm and custom flag, path to importable modules should be: "node_modules/chocolatechipui/cli-resources/jspm/dev/src".', function() {
    const results = createJSProject('name=MyApp', 'jspm', 'custom');
    chai.assert.equal(results.importableModules, 'node_modules/chocolatechipui/cli-resources/src')
  })

  it('If name and jspm and no type flag, should return basic type for JSPM project.', function() {
    const results = createJSProject('name=MyApp', 'jspm');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/jspm/basic/index.html')
  });

  it('If name and jspm and type equals "basic", should return basic type for JSPM project.', function() {
    const results = createJSProject('name=MyApp', 'jspm','type=basic');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/jspm/basic/index.html')
  });

  it('If name and jspm and type equals "navigation", should return "navigation" type for JSPM project.', function() {
    const results = createJSProject('name=MyApp', 'jspm','type=basic');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/jspm/basic/index.html')
  });

  it('If name and jspm and type equals "slideout", should return "slideout" type for JSPM project.', function() {
    const results = createJSProject('name=MyApp', 'jspm','type=basic');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/jspm/basic/index.html')
  });

  it('If name and jspm and type equals "tabbar", should return "tabbar" type for JSPM project.', function() {
    const results = createJSProject('name=MyApp', 'jspm','type=basic');
    chai.assert.equal(results.htmlPath, 'node_modules/chocolatechipui/cli-resources/jspm/basic/index.html')
  });

  it('If os equals "ios", should return iOS theme.', function() {
    var results = createJSProject('name=MyApp', 'jspm','type=basic', 'os=ios');
    chai.assert.equal(results.os, 'ios');
    chai.assert.equal(results.themePath, 'node_modules/chocolatechipui/dist/css/chui-ios.min.css');
  });

  it('If os equals "android", should return Android theme.', function() {
    var results = createJSProject('name=MyApp', 'jspm','type=basic', 'os=android');
    chai.assert.equal(results.os, 'android');
    chai.assert.equal(results.themePath, 'node_modules/chocolatechipui/dist/css/chui-android.min.css');
  });

  it('If no os, should return iOS theme as default.', function() {
    var results = createJSProject('name=MyApp', 'jspm','type=basic', 'os=ios');
    chai.assert.equal(results.os, 'ios');
    chai.assert.equal(results.themePath, 'node_modules/chocolatechipui/dist/css/chui-ios.min.css');
  });


  it('If typings, return true.', function() {
    const results = createJSProject('name=MyApp', 'typings');
    chai.assert.equal(results.typings, true);
  });

  it('If typings, should return path to typings.', function() {
    const results = createJSProject('name=MyApp', 'typings');
    chai.assert.equal(results.typingsPath, 'node_modules/chocolatechipui/typings');
  });

  it('If no typings, return false.', function() {
    const results = createJSProject();
    chai.assert.equal(results.typings, false);
  });
});

describe('Test for createiOSProject.js:', function() {
  it('It should return project name for hybrid app for iOS.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.name, 'MyApp');
    chai.assert.equal(results.hybrid, true);
    chai.assert.equal(results.os, 'ios');
  });

  it('It should return appDelegate template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[0], 'appDelegate');
  });

  it('It should return viewController template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[1], 'viewController');
  });

  it('It should return infoPlist template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[2], 'infoPlist');
  });

  it('It should return mainStoryboard template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[3], 'mainStoryboard');
  });

  it('It should return launchScreenStoryboard template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[4], 'launchScreenStoryboard');
  });

  it('It should return appiconset template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[5], 'appiconset');
  });

  it('It should return itunesartwork template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[6], 'itunesartwork');
  });

  it('It should return launchimages template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[7], 'launchimages');
  });

  it('It should return debugger template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[8], 'debugger');
  });

  it('It should return xcscheme template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[9], 'xcscheme');
  });

  it('It should return xcschememanagement template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[10], 'xcschememanagement');
  });

  it('It should return pbxproj template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[11], 'pbxproj');
  });

  it('It should return html template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[12], 'html');
  });

  it('It should return testsPlist template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[13], 'testsPlist');
  });

  it('It should return testsSwift template for iOS Xcode project.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=ios');
    chai.assert.equal(results.appFiles[14], 'testsSwift');
  });
});


describe('Tests for createAndroidProject.js:', function() {
  it('It should return project name for hybrid app for Android.', function() {
    const results = createiOSProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.name, 'MyApp');
    chai.assert.equal(results.hybrid, true);
    chai.assert.equal(results.os, 'android');
  });

  it('It should return gradle.properties template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[0], 'gradle.properties');
  });

  it('It should return gradlew template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[1], 'gradlew');
  });

  it('It should return gradlew.bat template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[2], 'gradlew.bat');
  });

  it('It should return local.properties template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[3], 'local.properties');
  });

  it('It should return android.app.iml template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[4], 'android.app.iml');
  });

  it('It should return settings.gradle template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[5], 'settings.gradle');
  });

  it('It should return build.gradle template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[6], 'build.gradle');
  });

  it('It should return gradle-wrapper.jar template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[7], 'gradle-wrapper.jar');
  });

  it('It should return gradle-wrapper.properties template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[8], 'gradle-wrapper.properties');
  });

  it('It should return proguard-rules.pro template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[9], 'proguard-rules.pro');
  });

  it('It should return build.gradle template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[10], 'build.gradle');
  });

  it('It should return ApplicationTest.java template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[11], 'ApplicationTest.java');
  });

  it('It should return AndroidManifest.xml template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[12], 'AndroidManifest.xml');
  });

  it('It should return MainActivity.java template for Android Studio project.', function() {
    const results = createAndroidProject('name=MyApp','h', 'os=android');
    chai.assert.equal(results.appFiles[13], 'MainActivity.java');
  });
})