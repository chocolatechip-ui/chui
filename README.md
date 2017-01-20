chui
=======
[![npm version](https://badge.fury.io/js/chui.svg)](https://badge.fury.io/js/chui)

[![NPM](https://nodei.co/npm/chui.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/chui/)

- Make mobile web apps
- Get hard work done fast
- Use platform-specific themes


For iOS, ChocolateChip-UI supports versions 9 and 10 using Swift 3 and WkWebView for fast JavaScript rendering. For Android it supports Jelly Bean up to Nougat (4.2 - 7.0).

##Installation

Just run (depending on your setup, you may need to run it with `sudo`):


    npm i -g chui


##Updating

`chui` is dependent on `chocolatechipui` for its resources. Since we update `chocolatechipui` frequently, it's a go idea to run `npm update` at least once a week. This will pull down the latest version for `chui` to use.

##Testing

You can test this after running `npm i` in this directory. The tests use Mocha and Chai. Because this tool create folders and files on the user's desktop, we do not physically test for those results. Instead we use mocks of internal functions to test the logic used to determine who files should be created. To run the tests:

    npm test

##Creating Projects

`Chui` helps you quickly create a ChocolateChip-UI project. There are two types of projects: 

1. Plain - HTML, CSS and JavaScript. Double click the index file and the app will launch in the browser. Work on your project like you would on any website. This is the simplest possible setup.
2. JSPM - ES6, Babel, JSPM and Browsersync. This is the true developer version of a project. It gives you a setup that uses JSPM to transpile your ES6 modules into a single ES5 file, then it launches your app in a browser using Browsersync. This also watches your source files for changes and builds and reloads when it detects changes.

To create a simple JavaScript project without the need to running a server, you have the following options:

1. -n (project name)
2. -o (ios or android)
3. -t (basic, navigation, slideout, tabbar)
4. -b (support for local data persistence using ChocolateChip-UI's Box)

Here are example's of using `chui` with these options:

```
# Android navigation list:
chui -n myProject -o anroid -t navigation

# iOS slideout app:
chui -n coolApp -t slideout -o ios

# Android tabbar app:
chui -n tabbie -o android -t tabbar

# Plain iOS app:
chui -n simpleApp

# Plain Android app:
chui -n simpleApp -o android

# Android app with Box:
chui -n storageApp -o android -b
chui -n storageApp -o ios -b
```

To learn more about local data persistence with ChocolateChip-UI's Box, please read the [documentation](https://chocolatechip-ui.github.io/v4/docs/box/box-intro.html).

##Build a Project with ES6

The official launch of ES6 (ECMAScript 2015) means that if you want, you can build your ChocolateChip-UI app with it. Chui helps you by giving you the tools to write your app using the advanced features of ES6 while transpiling to ES5 for browsers that do not yet support ES6. Using ES6 modules, you can organize your app's code for better maintainability.

When you create a project that uses ES6, you'll need to build it before launching it in a browser. Chui provides everything to make this easy for you.

To create a project that supports ES6, use the flag `-j`. This will set your project up to use Babel and JSPM:

```
# Android app using ES6:
chui -n myES6App -o android -t navigation -j

# iOS app using ES6:
chui -n coolApp -o ios -t slideout -j

# Android app using ES6 and Box:
chui -n storageApp -o android -t basic -j -b

```

After creating a project with support for ES6, you need to `cd` to the project folder and run these commands:

```
npm i

# When the npm install finishes, run:
jspm i

# When the jspm install finishes, run:
gulp
```

Running gulp will build and launch your project in your default browser. It will also watch your dev folder and reload the browser whenever you make and save chages to the code in that folder.

When you create a new project for ES6, you'll find all your development code in the project's `dev` folder. When you run `gulp`, it takes those files and compiles them into ES5 and puts them in the `js` folder, which your project loads.

##Custom Build

You can also make a project that has a minimal build of ChocolateChip-UI. This can greatly reduce the size of your app, sometimes by half. This is only possible with ES6 projects since it uses ES6 modules to let you import only the parts you need. To create a custom project, use the `-c` flag:


```
# For Android:
chui -n myProject -o android -t basic -j -c
chui -n myProject -o android -t navigation -j -c
chui -n myProject -o android -t slideout -j -c
chui -n myProject -o android -t tabbar -j -c
# Default (basic):
chui -n myProject -o android -j -c
```

```
# For iOS:
chui -n myProject -o ios -t basic -j -c
chui -n myProject -o ios -t navigation -j -c
chui -n myProject -o ios -t slideout -j -c
chui -n myProject -o ios -t tabbar -j -c
# Default (basic):
chui -n myProject -j -c
```

Creating a custom build puts a folder called `src` in your project's `dev` folder. You can import any other modules you want from that `src` folder:

```
import './src/switches';
import './src/range';
import './src/popup';
```

Be aware that the path will need to be adjusted depending on where you are importing the module into. You can check out the reference apps to see how this is done. Open the `jspm` folder and examine the files in each project's `dev` folder to see how they import their ChocolateChip-UI modules.

##TypeScript support

You can get TypeScript support for either a simple JavaScript project or a JSPM project with the flag `--ts`. This will put a folder called `typings` at the root of your project, along with a filed called `jsconfig.json`. Editors and IDEs that have plugins or extensions to support TypeScript will be able to use the TypeScript declaration file to add intellisense to your code. This provides code hints, code completion and code lookups as you type or hover over ChocolateChip-UI code.

Editors that support TypeScript intellisense for JavaScript:

1. [Visual Studio Code](http://code.visualstudio.com) - Free on Mac, Windows and Linux.
2. [WebStorm](https://www.jetbrains.com/webstorm/) - Commercial on Mac, Windows and Linux.

##Hybrid Apps

Chui can also convert your completed app into a hybrid app for Android and iOS. It does this by create a simple webview shell that loads your web app. This allows your to open your Android project in Android Studio and your iOS porject in Xcode. You can then build and test these on the respective emulator/simulator or load them directly on tethered devices. When you're satisfied with the performance of your app, you can then submit it for review on Android Play or the Apple App Store.

To create a hybrid app, you use the `-h` flag. You can also use the `-w` followed by the path to your web app. After typing `-w` followed by a space, you can drag your project folder on to the terminal, and the path will be added automatically. Or you can leave `-w` out and copy your app in later. To do this for iOS, open the Xcode project and copy your app's files into the `Website` folder. For Android, copy your app's files into the Android Studio Project's assets folder at `app/src/main/assets`.

####Icons

When you create a hybrid app for Android or iOS, `chui` includes default icons for your app. You'll of course want to replace those with ones for your app. Android and iOS put have different sized apps and store them in different places. Note down the dimensions of the icons provided in your hybrid project and replace them with your custom images with the same dimensions and names. 

##Website
You can learn about how to build apps with ChocolateChip-UI at the website: [chocolatechip-ui.github.io](https://chocolatechip-ui.github.io).


##Older Version (1.2.13)

If you want to create a project for an earlier version of ChocolateChip-UI (version 3.9.2), use chui 1.2.13:

    npm i -g chui@1.2.13

For documentation for this older version of `chui`, [please read this](https://chocolatechip-ui.github.io/v3/documentation/building.html#chui_project_builder).
