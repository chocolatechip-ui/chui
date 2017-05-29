var argv = require('yargs').argv;
var username = argv.user;
var os = require("os");
var platform = os.platform();
var progardPath;
if (platform === 'win32') {
  progardPath = `C:\Users\${ process.env.USERNAME  }\AppData\Local\Android\sdk\/tools/proguard/proguard-android.txt`;
} else if (platform === 'darwin') {
  progardPath = `/Users/${ process.env.USER }/Library/Android/sdk/tools/proguard/proguard-android.txt`;
}


exports.app_main_activity = `package com.${ argv.user.toLowerCase() }.${ argv.proj.toLowerCase() };

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


exports.app_src_androidTest = `package com.${ argv.user.toLowerCase() }.${ argv.proj.toLowerCase() };

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

    <string name="app_name">${ argv.proj }</string>
    <string name="hello_world">Hello world!</string>
    <string name="action_settings">Settings</string>

</resources>`;


exports.android_manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.${ argv.user.toLowerCase() }.${ argv.proj.toLowerCase() }" >

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="${ argv.proj }"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="${ argv.proj }" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
    <uses-permission android:name="android.permission.INTERNET" />

</manifest>`;


exports.main_activity = `package com.${ argv.user.toLowerCase() }.${ argv.proj.toLowerCase() };

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

exports.strings = `<?xml version="1.0" encoding="utf-8"?>
<resources>

    <string name="app_name">' + argv.proj + '</string>
    <string name="hello_world">Hello world!</string>
    <string name="action_settings">Settings</string>

</resources>`;
