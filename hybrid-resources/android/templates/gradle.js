var argv = require('yargs').argv;
var username = argv.user || "joe";

var os = require("os");
var platform = os.platform();
var user;
var pathToSDK;
if (platform === 'win32') {
  home = 'C:' + process.env.HOMEPATH;
  user = process.env.USERNAME;
  pathToSDK = `sdk.dir=C\:\Users\${ user }\AppData\Local\Android\sdk`;
} else {
  home = process.env.HOME;
  user = process.env.USER;
  pathToSDK = `sdk.dir=/Users/${ user }/Library/Android/sdk`;
}

exports.local_properties = `## This file is automatically generated by Android Studio.
# Do not modify this file -- YOUR CHANGES WILL BE ERASED!
#
# This file must *NOT* be checked into Version Control Systems,
# as it contains information specific to your local configuration.
#
# Location of the SDK. This is only used by Gradle.
# For customization when using a Version Control System, please read the
# header note.
#Fri Feb 13 13:44:37 PDT 2017
${ pathToSDK }`;



exports.settings = "include ':app'";


exports.build_gradle = `apply plugin: 'com.android.application'

android {
    compileSdkVersion 21
    buildToolsVersion "21.1.2"

    defaultConfig {
        applicationId "com.' + argv.user.toLowerCase() + '.' + argv.proj.toLowerCase() + '"
        minSdkVersion 15
        targetSdkVersion 21
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:21.0.3'
}`;


