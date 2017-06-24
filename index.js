#!/usr/bin/env node
const fs = require('fs')
const mkdirp = require('mkdirp')
const writefile = require('writefile')
const cpFile = require('cp-file')
const ncp = require('ncp').ncp
const cp = require('fs-cp')
const copy = require('copy')
const p = require("path")
const iosTemplates = require('./ios/templates.js')
const android = require('./android/templates/android.js')
const gradle = require('./android/templates/gradle.js')
const OS = require("os")
const replace = require('replace-in-file')
const homedir = (process.platform === "win32") ? process.env.HOMEPATH : process.env.HOME
const user = (process.platform === "win32") ? process.env.USERNAME : process.env.USER
const pkg = require('./package.json')
const argv = require('yargs').argv

const chui = (() => {
  /**
   * Create variables based on commandline arguments
   */
  const originalName = argv.name || argv.n
  const name = originalName ? originalName.toLowerCase() : ''
  let os = argv.os || argv.o || 'ios'
  os = os.toLowerCase()
  const type = argv.type || argv.t
  const hybrid = argv.hybrid || argv.h
  const path = argv.path || argv.p || p.join(homedir, 'Desktop')
  if (name) {
    var appPath = p.join(homedir, 'Desktop', name)
  }
  const chui_examples = argv.examples || argv.e
  const reference_apps = argv.refapps || argv.r
  const icons = argv.icons || argv.i || false
  const website = argv.website || argv.w

  const noop = function() {}
  const chocolatechipui_path = p.join(__dirname, 'node_modules', 'chocolatechipui')


  /**
   * Create iOS project for Xcode 
   */
  const createiOSProject = () => {
    console.log('Creating an Xcode project.')
    mkdirp(appPath)
    mkdirp(p.join(appPath, originalName + '.xcodeproj'))
    mkdirp(p.join(appPath, originalName, 'Base.lproj'))

    /**
     * Create Swift files and Info.plist:
     */
    writefile(p.join(appPath, originalName, 'AppDelegate.swift'), iosTemplates.appDelegate, noop)
    writefile(p.join(appPath, originalName, 'ViewController.swift'), iosTemplates.viewController, noop)
    writefile(p.join(appPath, originalName, 'Info.plist'), iosTemplates.infoPlist)

    /**
     * Create Base.lproj files:
     */
    writefile(p.join(appPath, originalName, 'Base.lproj', 'Main.storyboard'), iosTemplates.mainStoryboard, noop)
    writefile(p.join(appPath, originalName, 'Base.lproj', 'launchScreen.storyboard'), iosTemplates.launchScreenStoryboard, noop)

    /**
     * Create AppIcon Contents file:
     */
    if (icons) {
      ncp(p.join(icons, appPath, originalName, 'Assets.xcassets'), noop)

    } else {
      ncp(p.join(__dirname, 'ios', 'icons'), p.join(appPath, originalName, 'Assets.xcassets'))
    }

    /**
     * Write JSON files for icons and launch images:
     */
    writefile(p.join(appPath, originalName, 'Assets.xcassets', 'AppIcon.appiconset', 'Contents.json'), iosTemplates.appiconset, noop)
    writefile(p.join(appPath, originalName, 'Assets.xcassets', 'iTunesArtwork.imageset', 'Contents.json'), iosTemplates.itunesartwork, noop)
    writefile(p.join(appPath, originalName, 'Assets.xcassets', 'LaunchImage.launchimage', 'Contents.json'), iosTemplates.launchimages, noop)


    writefile(p.join(appPath, originalName + '.xcodeproj', 'xcuserdata', 'xcdegugger'), iosTemplates.debugger, noop)

    /**
     * Create xcuserdata files:
     */
    writefile(p.join(appPath, originalName + '.xcodeproj', 'xcuserdata', user + '.xcschemes', user + '.xcschemes'), iosTemplates.xcscheme, noop)
    writefile(p.join(appPath, originalName + '.xcodeproj', 'xcuserdata', user + '.xcschemes', 'xcschememanagement.plist'), iosTemplates.xcschememanagement, noop)

    /**
     * Create pbxproj file:
     */
    writefile(p.join(appPath, originalName + '.xcodeproj', 'project.pbxproj'), iosTemplates.pbxproj, noop)

    /**
     * Create the Website index file:
     */
    writefile(p.join(appPath, 'Website', 'index.html'), iosTemplates.html, noop)

    /**
     * Create tests:
     */
    writefile(p.join(appPath, originalName + 'Tests', originalName + 'Tests.swift'), iosTemplates.testsSwift, noop)
    writefile(p.join(appPath, name + 'Tests', 'Info.plist'), iosTemplates.testsPlist, noop)

    /**
     * Check to see if user provided
     * a appPath to a Web app:
     */
    if (website) {
      ncp.limit = 16
      ncp(website, p.join(appPath, 'Website'), noop)
    }

    /**
     * Xcode project is complete:
     */
    console.log('The project was successfully created. You may now open it in Xcode.')
  }
  
  /**
   * Create Android project for Android Studio 
   */
  const createAndroidProject = () => {
    console.log('Creating an android app.')

    /**
     * First level files:
     */
    cp(p.join(__dirname, 'android', 'gradle', 'gradle.properties'), p.join(appPath, 'gradle.properties'), noop)
    cp(p.join(__dirname, 'android', 'gradle', 'gradlew'), p.join(appPath, 'gradlew'), noop)
    cp(p.join(__dirname, 'android', 'gradle', 'gradlew.bat'), p.join(appPath, 'gradlew.bat'), noop)
    writefile(p.join(appPath,'local.properties'), gradle.local_properties, noop)
    writefile(p.join(appPath, name.toLowerCase() + '.iml'), android.app_iml, noop)
    writefile(p.join(appPath, 'settings.gradle'), gradle.settings, noop)
    writefile(p.join(appPath, 'build.gradle'), android.build_gradle, noop)

    /**
     * Files in ./gradle:
     */
    cp(p.join(__dirname, 'android', 'gradle', 'gradle-wrapper.jar'), p.join(appPath, 'gradle', 'gradle-wrapper.jar'), noop)
    cp(p.join(__dirname, 'android', 'gradle', 'gradle-wrapper.properties'), p.join(appPath, 'gradle', 'gradle-wrapper.properties'), noop)

    /**
     * Files in ./app:
     */
    writefile(p.join(appPath, 'app','proguard-rules.pro'), android.proguard_rules, noop)
    writefile(p.join(appPath, 'app','build.gradle'), gradle.build_gradle, noop)

    /**
     * Android Test file:
     */
     writefile(p.join(appPath, 'app', 'src', 'androidTest', 'java', 'com', user.toLowerCase(), name.toLowerCase(), 'ApplicationTest.java'), android.app_src_androidTest, noop)

     /**
      * Android Manifest:
      */
     writefile(p.join(appPath, 'app', 'src', 'main', 'AndroidManifest.xml'), android.android_manifest, noop)

     /**
      * Create "MainActivity" file:
      */
     writefile(p.join(appPath, 'app', 'src', 'main', 'java', 'com', user.toLowerCase(), name.toLowerCase(), 'MainActivity.java'), android.main_activity, noop)

     /**
      * Copy out the resources (icons, etc.):
      */
     if (icons) {
      ncp(icons, p.join(appPath, 'app', 'src', 'main', 'res'), noop)
     } else {
       cp(p.join(__dirname, 'android', 'res', 'drawable-hdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-hdpi', 'ic_launcher.png'), noop)
       cp(p.join(__dirname, 'android', 'res', 'drawable-mdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-mdpi', 'ic_launcher.png'), noop)
       cp(p.join(__dirname, 'android', 'res', 'drawable-xhdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-xhdpi', 'ic_launcher.png'), noop)
       cp(p.join(__dirname, 'android', 'res', 'drawable-xxhdpi', 'ic_launcher.png'), p.join(appPath, 'app', 'src', 'main', 'res', 'drawable-xxhdpi', 'ic_launcher.png'), noop)
     }

     cp(p.join(__dirname, 'android', 'res', 'layout', 'activity_main.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'layout', 'activity_main.xml'), noop)
     cp(p.join(__dirname, 'android', 'res', 'menu', 'menu_main.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'menu', 'menu_main.xml'), noop)
     cp(p.join(__dirname, 'android', 'res', 'values', 'dimens.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'values', 'dimens.xml'), noop)
     cp(p.join(__dirname, 'android', 'res', 'values', 'styles.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'values', 'styles.xml'), noop)
     cp(p.join(__dirname, 'android', 'res', 'values-w820dp', 'dimens.xml'), p.join(appPath, 'app', 'src', 'main', 'res', 'values-w820dp', 'dimens.xml'), noop)
     writefile(p.join(appPath, 'app', 'src', 'main', 'res', 'values', 'strings.xml'), android.strings, noop)
    if (argv.app) {
      ncp.limit = 16
      ncp(argv.app, p.join(appPath, 'app', 'src', 'main', 'assets'), noop)
    } else {
     /**
      * If no Web assets provided, out default Web page:
      */
     cp(p.join(__dirname, 'android', 'web', 'index.html'), p.join(appPath, 'app', 'src', 'main', 'assets', 'index.html'), noop)
    }

    /**
     * Anrdoid Studio project is complete:
     */
    console.log('The project was successfully created. You may now import it into Android Studio.')
  }

  /**
   * Ouput all examples to desktop 
   */
  const outputExamples = () => {
    console.log('Outputting ChUI examples to desktop.')
    mkdirp(p.join(homedir, 'Desktop', 'ChUI Examples'), noop)
    ncp.limit = 16
    setTimeout(function() {
      ncp(p.join(chocolatechipui_path, 'examples'), p.join(p.join(homedir, 'Desktop'), 'Chui Examples'), noop)
    }, 200)
  }

  /**
   * Output reference apps to desktop 
   */
  const outputReferenceApps = () => {
    console.log('Outputting ChUI reference apps.')
    console.log('Open the terminal and cd to each project.')
    console.log('Then run: "npm i"')
    console.log('That will install the project\'s dependencies.')
    console.log('Then run: "npm run build" in each project\'s folder.')
    console.log('When the build is complete, you can double click the index.html file to open it in the browser.')
    ncp(p.join(chocolatechipui_path, 'reference-apps'), p.join(p.join(homedir, 'Desktop'), 'Chui Reference Apps'), noop)

    setTimeout(() => {
      ['Fragranž', 'SFCoffee', 'TodoMVC', 'Vino'].forEach(app => {
        copy(p.join(chocolatechipui_path, 'dist', 'css', '*'), p.join(p.join(homedir, 'Desktop'), 'Chui Reference Apps', app, 'css'), noop)
        cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(homedir, 'Desktop', 'Chui Reference Apps', app, 'js', 'chui.min.js'), noop
      )
        cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(homedir, 'Desktop', 'Chui Reference Apps', app, 'js', 'chui.min.js.map'), noop)
      })
    }, 100)
  }

  /**
   * Create a web project as designated by developer 
   */
  const createJSProject = () => {
    const createJSProject = () => {
      console.log('This project uses ES6 modules.')
      console.log('It will require a build step to launch it.')
      console.log('Open the terminal and "cd" to the project folder.')
      console.log('Then run "npm i" to install the project\'s dependencies.')
      console.log('After that you can build the project with: "gulp build".')
      console.log('Or you can build and launch the project in your browser by executing: "gulp" in the temrinal.')

      ncp.limit = 16
      mkdirp(p.join(path, name), noop)
      mkdirp(p.join(path, name, 'js'), noop)
      mkdirp(p.join(path, name, 'dev', 'src'), noop)
      ncp(p.join(chocolatechipui_path, 'dist', 'css'), p.join(path, name, 'css'), noop)
      ncp(p.join(chocolatechipui_path, 'dist', 'widgets'), p.join(path, name, 'dev', 'src', 'widgets'), noop)
      ncp(p.join(chocolatechipui_path, 'dist', 'utils'), p.join(path, name, 'dev', 'src', 'utils'), noop)
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js'), p.join(path, name, 'js', 'chui.min.js'), noop)
      cpFile(p.join(chocolatechipui_path, 'dist', 'chui.min.js.map'), p.join(path, name, 'js', 'chui.min.js.map'), noop)
      
      cpFile(p.join(chocolatechipui_path, 'cli-resources', '.editorconfig'), p.join(path, name, '.editorconfig'), noop)
      cpFile(p.join(chocolatechipui_path, 'cli-resources', '.babelrc'), p.join(path, name, '.babelrc'), noop)
      cpFile(p.join(chocolatechipui_path, 'cli-resources', 'gulpfile.js'), p.join(path, name, 'gulpfile.js'), noop)
      cpFile(p.join(chocolatechipui_path, 'cli-resources', 'package.json'), p.join(path, name, 'package.json'), noop)

      const createProj = (type) => {
        ncp(p.join(chocolatechipui_path, 'cli-resources',  type, 'dev'), p.join(path, name, 'dev'), noop)
        cpFile(p.join(chocolatechipui_path, 'cli-resources',  type, 'index.html'), p.join(path, name, 'index.html'), noop)
      }

      if (type === 'navigation') {
        createProj('navigation')

      } else if (type === 'slideout') {
        createProj('slideout')

      } else if (type === 'tabbar') {
        createProj('tabbar')
        ncp(p.join(chocolatechipui_path, 'cli-resources',  'tabbar', 'images'), p.join(path, name, 'images'), noop)
        cpFile(p.join(chocolatechipui_path, 'cli-resources',  'tabbar', 'css', 'app.css'), p.join(path, name, 'css', 'app.css'), noop)

      } else {
        createProj('basic')
      }
    }

    console.log('Creating a project named: ' + name)


    if (type) {
      createJSProject()
      setTimeout(function() {
        replace({
          replace: /chui_app_name/g,
          with: originalName,
          files: [
            p.join(path, name, 'index.html'),
            p.join(path, name, 'package.json')
          ],
        })
        replace({
          replace: /CHUI_OS_THEME/g,
          with: os,
          files: [
            p.join(path, name, 'index.html'),
          ],
        })
        if (os === 'android') {
          replace({
            replace: /import/,
            with: `import './src/widgets/android-ripple'
import`,
          files: [p.join(path, name, 'dev', 'app.js')]
          })
        }
      }, 2380) 

      return

    } else {
      createJSProject()
      setTimeout(function() {
        replace({
          replace: /chui_app_name/g,
          with: originalName,
          files: [
            p.join(path, name, 'index.html')
          ],
        })
        replace({
          replace: /CHUI_OS_THEME/g,
          with: os,
          files: [
            p.join(path, name, 'index.html'),
          ],
        })
        if (os === 'android') {
          replace({
            replace: /import/,
            with:  `import './src/widgets/android-ripple'
import`,
          files: [p.join(path, name, 'dev', 'app.js')]
          })
        }
      }, 2380) 
    }
  }

  /**
   * Warn user that no arguments were provided 
   */
  const warnNoArgs = () => {
    console.log('')
    console.log('ATTENTION: Arguments missing.')
    console.log('To output the examples, use: chui -e')
    console.log('To output the reference apps, use: chui -r')
    console.log('To create a project for an app, use: chui -n my-app')
    console.log('(Replace my-app with the name for your app)')
    console.log('To create a JavaScript project, use: chui -n my-app')
    console.log('To create a project type, use the flag -t: with one of the flowing: basic, navigation, slideout, tabbar.')
    console.log('chui -n my-app -t basic')
    console.log('chui -n my-app -t navigation')
    console.log('chui -n my-app -t slideout')
    console.log('chui -n my-app -t tabbar')
    console.log('To create a project for a specific os, use the -o flag: android, ios')
    console.log('chui -n my-app -o android')
    console.log('chui -n my-app -o ios')
  }

  /**
   * Core functionality based on user arguments.
   * Test arguments to determine what to do:
   */
  if (chui_examples) {
    /**
     * Examples:
     */
    outputExamples()
    return
  } else if (reference_apps) {
    /**
     * Reference apps:
     */
    outputReferenceApps()
    return
  } else if (hybrid && (name && name !== true)) {
    /**
     * Hybrid app:
     */
    ncp.limit = 16
    console.log('')
    console.log('Making a hybrid app named: ' + name + '.')
    /**
     * Determine whether iOS or Android
     */
    if (name && os === 'ios') {
      createiOSProject()
    } else if (name && os === 'android') {
      createAndroidProject()
    }
    return
  } else if (name) {
    /**
     * Creating a JavaScript project:
     */
    createJSProject()
  } else {
    /**
     * Chui run without arguments:
     */
    warnNoArgs()
  }
})(argv)