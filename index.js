#!/usr/bin/env node
const fs = require('fs');
const mkdirp = require('mkdirp');
const writefile = require('writefile');
const cpFile = require('cp-file');
const ncp = require('ncp').ncp;
const cp = require('fs-cp');
const p = require("path");
const iosTemplates = require('./ios/templates.js');
const android = require('./android/templates/android.js');
const gradle = require('./android/templates/gradle.js');
const OS = require("os");
const replace = require('replace-in-file');
const homedir = (process.platform === "win32") ? process.env.HOMEPATH : process.env.HOME;
const user = (process.platform === "win32") ? process.env.USERNAME : process.env.USER;
const pkg = require('./package.json');
const argv = require('yargs').argv;

module.exports = ((argv) => {
  /**
   * Create variables based on commandline arguments
   */
  const name = argv.name || argv.n;
  let os = argv.os || argv.o || 'ios';
  os = os.toLowerCase();
  const type = argv.type || argv.t;
  const hybrid = argv.hybrid || argv.h;
  const path = argv.path || argv.p || p.join(homedir, 'Desktop');
  if (name) {
    var appPath = p.join(homedir, 'Desktop', name);
  }
  const browsersync = argv.browsersync || argv.b;
  const jspm = argv.jspm || argv.j;
  const box = argv.box || argv.b
  const chui_examples = argv.examples || argv.e;
  const reference_apps = argv.refapps || argv.r;
  const icons = argv.icons || argv.i || false;
  const website = argv.website || argv.w;
  const typings = argv.ts;

  const noop = function() {};
  const chocolatechipui_path = p.join(__dirname, 'node_modules', 'chocolatechipui');
  const jsconfig = '{\n\
    "compilerOptions": {\n\
        "target": "ES6"\n\
    },\n\
    "exclude": [\n\
        "node_modules",\n\
        "jspm_modules"\n\
    ]\n\
  }';

  /**
   * Create iOS project for Xcode 
   */
  const createiOSProject = () => {
    console.log('Creating an Xcode project.');
    mkdirp(appPath);
    mkdirp(p.join(appPath, name + '.xcodeproj'));
    mkdirp(p.join(appPath, name, 'Base.lproj'));

    /**
     * Create Swift files and Info.plist:
     */
    writefile(p.join(appPath, name, 'AppDelegate.swift'), iosTemplates.appDelegate, noop);
    writefile(p.join(appPath, name, 'ViewController.swift'), iosTemplates.viewController, noop);
    writefile(p.join(appPath, name, 'Info.plist'), iosTemplates.infoPlist);

    /**
     * Create Base.lproj files:
     */
    writefile(p.join(appPath, name, 'Base.lproj', 'Main.storyboard'), iosTemplates.mainStoryboard, noop);
    writefile(p.join(appPath, name, 'Base.lproj', 'launchScreen.storyboard'), iosTemplates.launchScreenStoryboard, noop);

    /**
     * Create AppIcon Contents file:
     */
    if (icons) {
      ncp(p.join(icons, appPath, name, 'Assets.xcassets'), noop);

    } else {
      ncp(p.join(__dirname, 'ios', 'icons'), p.join(appPath, name, 'Assets.xcassets'));
    }

    /**
     * Write JSON files for icons and launch images:
     */
    writefile(p.join(appPath, name, 'Assets.xcassets', 'AppIcon.appiconset', 'Contents.json'), iosTemplates.appiconset, noop);
    writefile(p.join(appPath, name, 'Assets.xcassets', 'iTunesArtwork.imageset', 'Contents.json'), iosTemplates.itunesartwork, noop);
    writefile(p.join(appPath, name, 'Assets.xcassets', 'LaunchImage.launchimage', 'Contents.json'), iosTemplates.launchimages, noop);


    writefile(p.join(appPath, name + '.xcodeproj', 'xcuserdata', 'xcdegugger'), iosTemplates.debugger, noop);

    /**
     * Create xcuserdata files:
     */
    writefile(p.join(appPath, name + '.xcodeproj', 'xcuserdata', user + '.xcschemes', user + '.xcschemes'), iosTemplates.xcscheme, noop);
    writefile(p.join(appPath, name + '.xcodeproj', 'xcuserdata', user + '.xcschemes', 'xcschememanagement.plist'), iosTemplates.xcschememanagement, noop);

    /**
     * Create pbxproj file:
     */
    writefile(p.join(appPath, name + '.xcodeproj', 'project.pbxproj'), iosTemplates.pbxproj, noop);

    /**
     * Create the Website index file:
     */
    writefile(p.join(appPath, 'Website', 'index.html'), iosTemplates.html, noop);

    /**
     * Create tests:
     */
    writefile(p.join(appPath, name + 'Tests', name + 'Tests.swift'), iosTemplates.testsSwift, noop);
    writefile(p.join(appPath, name + 'Tests', 'Info.plist'), iosTemplates.testsPlist, noop);

    /**
     * Check to see if user provided
     * a appPath to a Web app:
     */
    if (website) {
      ncp.limit = 16;
      ncp(website, p.join(appPath, 'Website'), noop);
    }

    /**
     * Xcode project is complete:
     */
    console.log('The project was successfully created. You may now open it in Xcode.');
  };

  /**
   * Create Android project for Android Studio 
   */
  const createAndroidProject = () => {
    console.log('creating and android app');

    /**
     * First level files:
     */
    cp(p.join(__dirname, 'android', 'gradle', 'gradle.properties'), p.join(appPath, 'gradle.properties'), noop);
    cp(p.join(__dirname, 'android', 'gradle', 'gradlew'), p.join(appPath, 'gradlew'), noop);
    cp(p.join(__dirname, 'android', 'gradle', 'gradlew.bat'), p.join(appPath, 'gradlew.bat'), noop);
    writefile(p.join(appPath,'local.properties'), gradle.local_properties, noop);
    writefile(p.join(appPath, name.toLowerCase() + '.iml'), android.app_iml, noop);
    writefile(p.join(appPath, 'settings.gradle'), gradle.settings, noop);
    writefile(p.join(appPath, 'build.gradle'), android.build_gradle, noop);

    /**
     * Files in ./gradle:
     */
    cp(p.join(__dirname, 'android', 'gradle', 'gradle-wrapper.jar'), p.join(appPath, 'gradle', 'gradle-wrapper.jar'), noop);
    cp(p.join(__dirname, 'android', 'gradle', 'gradle-wrapper.properties'), p.join(appPath, 'gradle', 'gradle-wrapper.properties'), noop);

    /**
     * Files in ./app:
     */
    writefile(p.join(appPath, 'app','proguard-rules.pro'), android.proguard_rules, noop);
    writefile(p.join(appPath, 'app','build.gradle'), gradle.build_gradle, noop);

    /**
     * Android Test file:
     */
     writefile(p.join(appPath, 'app', 'src', 'androidTest', 'java', 'com', user.toLowerCase(), name.toLowerCase(), 'ApplicationTest.java'), android.app_src_androidTest, noop);

     /**
      * Android Manifest:
      */
     writefile(p.join(appPath, 'app', 'src', 'main', 'AndroidManifest.xml'), android.android_manifest, noop);


     /**
      * Create "MainActivity" file:
      */
     writefile(p.join(appPath, 'app', 'src', 'main', 'java', 'com', user.toLowerCase(), name.toLowerCase(), 'MainActivity.java'), android.main_activity, noop);

     /**
      * Copy out the resources (icons, etc.):
      */
     if (icons) {
      ncp(icons, p.join(appPath, 'app', 'src', 'main', 'res'), noop);
     } else {
       cp(p.join(__dirname, 'android', 'res', 'drawable-hdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-hdpi', 'ic_launcher.png'), noop);
       cp(p.join(__dirname, 'android', 'res', 'drawable-mdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-mdpi', 'ic_launcher.png'), noop);
       cp(p.join(__dirname, 'android', 'res', 'drawable-xhdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-xhdpi', 'ic_launcher.png'), noop);
       cp(p.join(__dirname, 'android', 'res', 'drawable-xxhdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-xxhdpi', 'ic_launcher.png'), noop);
     }

     cp(p.join(__dirname, 'android', 'res', 'layout', 'activity_main.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'layout', 'activity_main.xml'), noop);
     cp(p.join(__dirname, 'android', 'res', 'menu', 'menu_main.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'menu', 'menu_main.xml'), noop);
     cp(p.join(__dirname, 'android', 'res', 'values', 'dimens.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'values', 'dimens.xml'), noop);
     cp(p.join(__dirname, 'android', 'res', 'values', 'styles.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'values', 'styles.xml'), noop);
     cp(p.join(__dirname, 'android', 'res', 'values-w820dp', 'dimens.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'values-w820dp', 'dimens.xml'), noop);
     writefile(p.join(appPath, 'app', 'src', 'main', 'res', 'values', 'strings.xml'), android.strings, noop);
    if (argv.app) {
      ncp.limit = 16;
      ncp(argv.app, p.join(appPath, 'app', 'src', 'main', 'assets'), noop);
    } else {
     /**
      * If no Web assets provided, out default Web page:
      */
     cp(p.join(__dirname, 'android', 'web', 'index.html'), p.join(appPath, 'app', 'src', 'main', 'assets', 'index.html'), noop);
    }

    /**
     * Anrdoid Studio project is complete:
     */
    console.log('The project was successfully created. You may now import it into Android Studio.');
  };

  /**
   * Ouput all examples to desktop 
   */
  const outputExamples = () => {
    console.log('Outputting ChUI examples to desktop.');
    mkdirp(p.join(homedir, 'Desktop', 'Chui Examples', 'examples'), noop);
    mkdirp(p.join(homedir, 'Desktop', 'Chui Examples', 'dist'), noop);
    ncp.limit = 16;
    setTimeout(function() {
      ncp(p.join(chocolatechipui_path, 'examples'), p.join(p.join(homedir, 'Desktop'), 'Chui Examples', 'examples'), noop);
      ncp(p.join(chocolatechipui_path, 'dist'), p.join(p.join(homedir, 'Desktop'), 'Chui Examples', 'dist'), noop);


    }, 20);
  };

  /**
   * Output reference apps to desktop 
   */
  const outputReferenceApps = () => {
    console.log('Outputting ChUI reference apps.');
    ncp(p.join(chocolatechipui_path, 'reference-apps'), p.join(p.join(homedir, 'Desktop'), 'Chui Reference Apps'), noop);

    setTimeout(function(){
      // Copy Basic Apps:
      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Fragranž', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Fragranž', 'js', 'chui.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Fragranž', 'js', 'chui.min.js.map'), noop);

      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'SFCoffee', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'SFCoffee', 'js', 'chui.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'SFCoffee', 'js', 'chui.min.js.map'), noop);

      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'TodoMVC', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui-box.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'TodoMVC', 'js', 'chui-box.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui-box.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'TodoMVC', 'js', 'chui-box.min.js.map'), noop);

      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Vino', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Vino', 'js', 'chui.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Vino', 'js', 'chui.min.js.map'), noop);

      if (typings) {

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Fragranž', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Fragranž', 'jsconfig.json'), jsconfig, noop);

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'SFCoffee', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'SFCoffee', 'jsconfig.json'), jsconfig, noop);

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'TodoMVC', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'TodoMVC', 'jsconfig.json'), jsconfig, noop);

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Vino', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'basic', 'Vino', 'jsconfig.json'), jsconfig, noop);
      }


      /**
       * Copy JSPM apps:
       */
      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Fragranž', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Fragranž', 'js', 'chui.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Fragranž', 'js', 'chui.min.js.map'), noop);


      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'SFCoffee', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'SFCoffee', 'js', 'chui.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'SFCoffee', 'js', 'chui.min.js.map'), noop);

      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'TodoMVC', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui-box.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'TodoMVC', 'js', 'chui-box.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui-box.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'TodoMVC', 'js', 'chui-box.min.js.map'), noop);

      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Vino', 'css'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Vino', 'js', 'chui.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Vino', 'js', 'chui.min.js.map'), noop);

      if (typings) {

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Fragranž', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Fragranž', 'jsconfig.json'), jsconfig, noop);

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'SFCoffee', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'SFCoffee', 'jsconfig.json'), jsconfig, noop);

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'TodoMVC', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'TodoMVC', 'jsconfig.json'), jsconfig, noop);

        ncp(p.join(chocolatechipui_path, 'typings'), p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Vino', 'typings'), noop);
        writefile(p.join(homedir, 'Desktop', 'Chui Reference Apps', 'jspm', 'Vino', 'jsconfig.json'), jsconfig, noop);
      }

    }, 100);
  };

  /**
   * Create a web project as designated by developer 
   */
  const createJSProject = () => {

    /**
     * Create plain JavaScript project
     */
    const createPlainJSProject = () => {
      console.log('You can double click this app to launch it.');

      ncp.limit = 16;
      mkdirp(p.join(path, name), noop);
      mkdirp(p.join(path, name, 'js'), noop);
      mkdirp(p.join(path, name, 'css'), noop);
      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(path, name, 'css'), noop);

      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(path, name, 'js', 'chui.min.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(path, name, 'js', 'chui.min.js.map'), noop);


      if (type && (type === 'navigation') || (type === 'n')) {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-navigation', 'js'), p.join(path, name, 'js'), noop);
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-navigation', 'css'), p.join(path, name, 'css'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-navigation', 'index.html'), p.join(path, name, 'index.html'), noop);

      } else if (type && (type === 'tabbar') || (type === 't')) {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-tabbar', 'js'), p.join(path, name, 'js'), noop);
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-tabbar', 'css'), p.join(path, name, 'css'), noop);
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-tabbar', 'images'), p.join(path, name, 'images'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-tabbar', 'index.html'), p.join(path, name, 'index.html'), noop);

      } else if (type && (type === 'slideout') || (type === 's')) {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-slideout', 'js'), p.join(path, name, 'js'), noop);
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-slideout', 'css'), p.join(path, name, 'css'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-slideout', 'index.html'), p.join(path, name, 'index.html'), noop);

      } else {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-basic', 'js'), p.join(path, name, 'js'), noop);
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-basic', 'css'), p.join(path, name, 'css'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'for-desktop',  'chui-basic', 'index.html'), p.join(path, name, 'index.html'), noop);
      }
    }

    /**
     * Create project with JSPM
     */
    const createJSPMProject = () => {
      console.log('This project uses JSPM so you can write ES6 modules.');
      console.log('It will require a build step to launch it.');

      ncp.limit = 16;
      mkdirp(p.join(path, name), noop);
      mkdirp(p.join(path, name, 'js'), noop);
      mkdirp(p.join(path, name, 'dev'), noop);
      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(path, name, 'css'), noop);

      cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'config.js'), p.join(path, name, 'config.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'gulpfile.js'), p.join(path, name, 'gulpfile.js'), noop);
      cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'package.json'), p.join(path, name, 'package.json'), noop);

      if (box) {
        cpFile(p.join(chocolatechipui_path, 'dist', 'chui-box.min.js'), p.join(path, name, 'js', 'chui-box.min.js'), noop);
        cpFile(p.join(chocolatechipui_path, 'dist', 'chui-box.min.js.map'), p.join(path, name, 'js', 'chui-box.min.js.map'), noop);

      } else {
        cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(path, name, 'js', 'chui.min.js'), noop);
        cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(path, name, 'js', 'chui.min.js.map'), noop);

      }

      if (type === 'navigation') {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'navigation', 'dev'), p.join(path, name, 'dev'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'navigation', 'index.html'), p.join(path, name, 'index.html'), noop);

      } else if (type === 'slideout') {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'slideout', 'dev'), p.join(path, name, 'dev'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'slideout', 'index.html'), p.join(path, name, 'index.html'), noop);

      } else if (type === 'tabbar') {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'tabbar', 'dev'), p.join(path, name, 'dev'), noop);
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'tabbar', 'images'), p.join(path, name, 'images'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'tabbar', 'css', 'app.css'), p.join(path, name, 'css', 'app.css'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'tabbar', 'index.html'), p.join(path, name, 'index.html'), noop);

      } else {
        ncp(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'basic', 'dev'), p.join(path, name, 'dev'), noop);
        cpFile(p.join(chocolatechipui_path, 'cli-resources', 'jspm',  'basic', 'index.html'), p.join(path, name, 'index.html'), noop);

      }
    }

    console.log('Creating a project named: ' + name);

    /**
     * If user request typings, output TypeScript delcaration file.
     */
    if (typings) {
      ncp(p.join(chocolatechipui_path, 'typings'), p.join(path, name, 'typings'), noop);
      writefile(p.join(path, name, 'jsconfig.json'), jsconfig, noop);

    }
    if (jspm) {
      createJSPMProject();
      setTimeout(function() {
        replace({
          replace: /CHUI_APP_NAME/g,
          with: name,
          files: [
            p.join(path, name, 'index.html'),
            p.join(path, name, 'package.json')
          ],
        });
        replace({
          replace: /CHUI_OS_THEME/g,
          with: os,
          files: [
            p.join(path, name, 'index.html'),
          ],
        });
      }, 380);

      return;

    } else {
      createPlainJSProject();
      setTimeout(function() {
        replace({
          replace: /CHUI_APP_NAME/g,
          with: name,
          files: [
            p.join(path, name, 'index.html')
          ],
        });
        replace({
          replace: /CHUI_OS_THEME/g,
          with: os,
          files: [
            p.join(path, name, 'index.html'),
          ],
        });
      }, 380);
    }
  };

  /**
   * Warn user that no arguments were provided 
   */
  const warnNoArgs = () => {
    console.log('');
    console.log('ATTENTION: Arguments missing.');
    console.log('To output the examples, use: chui -e.');
    console.log('To output the reference apps, use: chui -r.');
    console.log('To create a project for an app, use: chui -n myApp.');
    console.log('(Replace myApp with the name for your app.)');
    console.log('To create a project with JSPM, use: chui -n myApp -j.');
    console.log('To create a project with Box, use: chui -n myApp -b.');
    console.log('To create a project with Box and JSPM, use: chui -n myApp -j -b.');
    console.log('To create a project type, use the flag -t: chui -n myApp -t navigation or chui -n myApp -t slideout or chui -n myApp -t tabbar.');
    console.log('To create a project for a specific os, use the -o flag: chui -n myApp -o android or chui -n myApp -o ios or chui -n myApp -o windows.');
  };

  /**
   * Test arguments to determine what to do:
   */
  if (chui_examples) {
    /**
     * Examples:
     */
    outputExamples();
    return;
  } else if (reference_apps) {
    /**
     * Reference apps:
     */
    outputReferenceApps();
    return;
  } else if (hybrid && (name && name !== true)) {
    /**
     * Hybrid app:
     */
    ncp.limit = 16;
    console.log('');
    console.log('Making a hybrid app named: ' + name + '.');
    /**
     * Determine whether iOS or Android
     */
    if (name && os === 'ios') {
      createiOSProject();
    } else if (name && os === 'android') {
      createAndroidProject();
    }
    return;
  } else if (name) {
    /**
     * Creating a JavaScript project:
     */
    createJSProject();
  } else {
    /**
     * Chui run without arguments:
     */
    warnNoArgs();
  }
})(argv);