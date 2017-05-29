var argv = require('yargs').argv;
var OS = require("os");
var platform = OS.platform();
var name = argv.name || argv.n;
if (!name) return;
var user;
var progardPath;
if (platform === 'win32') {
  progardPath = `C:\Users\${ process.env.USERNAME }\AppData\Local\Android\sdk\/tools/proguard/proguard-android.txt`;
  user = process.env.USERNAME;
} else if (platform === 'darwin') {
  progardPath = `/Users/${ process.env.USER }/Library/Android/sdk/tools/proguard/proguard-android.txt`;
  user = process.env.USER;
}


exports.app_main_activity = `package com.${ user.toLowerCase() }.${ name.toLowerCase() };

//import android.support.v7.app.ActionBarActivity;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.*;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

      /* Find WebView element by its id*/
        WebView webView = (WebView) findViewById(R.id.webView);
        webView.setWebChromeClient(new WebChromeClient());

        /* Create new settings for our WebView element */
        WebSettings webSettings = webView.getSettings();

        /* Enable JavaScript */
        webSettings.setJavaScriptEnabled(true);

        /* Enable localStorage */
        webSettings.setDomStorageEnabled(true);

        /* Set scrollbars to be inside the app */
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

        /* Define path to your local Web assets */
        /* Using the name "android_asset" means that
        the system will look for a file named "assets"
        at app/src/main, the same fold this file is in. */
        webView.loadUrl("file:///android_asset/index.html");
    }

}`;


exports.proguard_rules = `# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in ${ progardPath }
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}`;


exports.app_src_androidTest = `package com.${ user.toLowerCase() }.${ name.toLowerCase() };

import android.app.Application;
import android.test.ApplicationTestCase;

/**
 * <a href="http://d.android.com/tools/testing/testing_android.html">Testing Fundamentals</a>
 */
public class ApplicationTest extends ApplicationTestCase<Application> {
    public ApplicationTest() {
        super(Application.class);
    }
}`;

exports.values_strings = `<?xml version="1.0" encoding="utf-8"?>
<resources>

    <string name="app_name">${ name }</string>
    <string name="hello_world">Hello world!</string>
    <string name="action_settings">Settings</string>

</resources>`;


exports.android_manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.${ user.toLowerCase() }.${ name.toLowerCase() }" >

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="${ name }"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="${ name }" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
    <uses-permission android:name="android.permission.INTERNET" />

</manifest>`;


exports.main_activity = `package com.${ user.toLowerCase() }.${ name.toLowerCase() };

//import android.support.v7.app.ActionBarActivity;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.*;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

      /* Find WebView element by its id*/
        WebView webView = (WebView) findViewById(R.id.webView);
        webView.setWebChromeClient(new WebChromeClient());

        /* Create new settings for our WebView element */
        WebSettings webSettings = webView.getSettings();

        /* Enable JavaScript */
        webSettings.setJavaScriptEnabled(true);

        /* Enable localStorage */
        webSettings.setDomStorageEnabled(true);

        /* Set scrollbars to be inside the app */
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

        /* Define path to your local Web assets */
        /* Using the name "android_asset" means that
        the system will look for a file named "assets"
        at app/src/main, the same fold this file is in. */
        webView.loadUrl("file:///android_asset/index.html");
    }

}`;

exports.app_iml = `<?xml version="1.0" encoding="UTF-8"?>
<module external.linked.project.path="$MODULE_DIR$" external.root.project.path="$MODULE_DIR$" external.system.id="GRADLE" type="JAVA_MODULE" version="4">
  <component name="FacetManager">
    <facet type="java-gradle" name="Java-Gradle">
      <configuration>
        <option name="BUILD_FOLDER_PATH" value="$MODULE_DIR$/build" />
      </configuration>
    </facet>
  </component>
  <component name="NewModuleRootManager" inherit-compiler-output="false">
    <output url="file://$MODULE_DIR$/build/classes/main" />
    <output-test url="file://$MODULE_DIR$/build/classes/test" />
    <exclude-output />
    <content url="file://$MODULE_DIR$">
      <excludeFolder url="file://$MODULE_DIR$/.gradle" />
    </content>
    <orderEntry type="inheritedJdk" />
    <orderEntry type="sourceFolder" forTests="false" />
  </component>
</module>`;

exports.strings = `<?xml version="1.0" encoding="utf-8"?>
<resources>

    <string name="app_name">${ name }</string>
    <string name="hello_world">Hello world!</string>
    <string name="action_settings">Settings</string>

</resources>`;


exports.build_gradle = `// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.2.1'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
    }
}`;
