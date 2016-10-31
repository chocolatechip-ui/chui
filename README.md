chui
=======

- Make mobile web apps
- Get hard work done fast
- Use platform-specific themes


ChocolateChip-UI supports iOS 9 and 10 using WkWebView for fast JavaScript rendering, and Android Jelly Bean to Nougat (4.2 - 7.0).

##Installation

Just run (depending on your setup, you may need to run it with `sudo`):

```
npm i -g chui
```

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

##Hybrid Apps

Chui can also convert your completed app into a hybrid app for Android and iOS. It does this by create a simple webview shell that loads your web app. This allows your to open your Android project in Android Studio and your iOS porject in Xcode. You can then build and test these on the respective emulator/simulator or load them directly on tethered devices. When you're satisfied with the performance of your app, you can then submit it for review on Android Play or the Apple App Store.

To create a hybrid app, you use the `-h` flag. You can also use the `-w` followed by the path to your web app. After typing `-w` followed by a space, you can drag your project folder on to the terminal, and the path will be added automatically. Or you can leave `-w` out and copy your app in later. To do this for iOS, open the Xcode project and copy your app's files into the `Website` folder. For Android, copy your app's files into the Android Studio Project's assets folder at `app/src/main/assets`.

####Icons

When you create a hybrid app for Android or iOS, `chui` includes default icons for your app. You'll of course want to replace those with ones for your app. Android and iOS put have different sized apps and store them in different places. Note down the dimensions of the icons provided in your hybrid project and replace them with your custom images with the same dimensions and names. 

##Website
You can learn about how to build apps with ChocolateChip-UI at the website: [chocolatechip-ui.github.io](https://chocolatechip-ui.github.io).


##Older Version (1.2.13)

If you want to create a project for an earlier version of ChocolateChip-UI (version 3.9.2), use chui 1.2.13:

```
npm i -g chui@1.2.13
```
For documentation for this older version of `chui`, [please read this](https://chocolatechip-ui.github.io/v3/documentation/building.html#chui_project_builder).
