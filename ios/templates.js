
var argv = require('yargs').argv;
var user = (process.platform === "win32") ? process.env.USERNAME : process.env.USER;
var name = argv.name || argv.n;
if (!name) return;
var icons = argv.icons;

exports.appDelegate = `//
//  AppDelegate.swift
//  ${ name }
//
//  Created by " + user + " on 2/15/16.
//  Copyright (c) 2017 " + user + ". All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
      // Override point for customization after application launch.
      return true
  }

  func applicationWillResignActive(_ application: UIApplication) {
      // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
      // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
  }

  func applicationDidEnterBackground(_ application: UIApplication) {
      // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
      // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
  }

  func applicationWillEnterForeground(_ application: UIApplication) {
      // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
  }

  func applicationDidBecomeActive(_ application: UIApplication) {
      // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
  }

  func applicationWillTerminate(_ application: UIApplication) {
      // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
  }
}`;

exports.viewController = `//
//  ViewController.swift
//  ${ name }
//
//  Created by ${ name } on 2/15/16.
//  Copyright (c) 2017 ' + user + '. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController {

  //Hide the status bar
  override var prefersStatusBarHidden: Bool {
    get {
      return true
    }
  }
  
  @IBOutlet var webView: UIWebView!
  override func viewDidLoad() {
      
    // Define location of local HTML file:
    let html = Bundle.main.path(forResource: "index.html", ofType: "", inDirectory: "Website")
    
    // Create an URL object with the above path:
    let url = URL.init(fileURLWithPath: html!)
    
    // Create a request object with the url object:
    let request = URLRequest(url: url)
    
    // Tell the Web view to load the url request object:
    self.webView.loadRequest(request as URLRequest)
  }
}`;

exports.infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>en</string>
  <key>CFBundleExecutable</key>
  <string>$(EXECUTABLE_NAME)</string>
  <key>CFBundleIdentifier</key>
  <string>${ name }.$(PRODUCT_BUNDLE_IDENTIFIER)</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>$(PRODUCT_NAME)</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>LSRequiresIPhoneOS</key>
  <true/>
  <key>UILaunchStoryboardName</key>
  <string>LaunchScreen</string>
  <key>UIMainStoryboardFile</key>
  <string>Main</string>
  <key>UIRequiredDeviceCapabilities</key>
  <array>
    <string>armv7</string>
  </array>
  <key>UIRequiresFullScreen</key>
  <true/>
  <key>UISupportedInterfaceOrientations</key>
  <array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationLandscapeLeft</string>
    <string>UIInterfaceOrientationLandscapeRight</string>
  </array>
  <key>UISupportedInterfaceOrientations~ipad</key>
  <array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationPortraitUpsideDown</string>
    <string>UIInterfaceOrientationLandscapeLeft</string>
    <string>UIInterfaceOrientationLandscapeRight</string>
  </array>
</dict>
</plist>
`;
exports.mainStoryboard = `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="11521.1" systemVersion="16A323" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" colorMatched="YES" initialViewController="BYZ-38-t0r">
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="11517.1"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--View Controller-->
        <scene sceneID="tne-QT-ifu">
            <objects>
                <viewController id="BYZ-38-t0r" customClass="ViewController" customModule="Dingie" customModuleProvider="target" sceneMemberID="viewController">
                    <layoutGuides>
                        <viewControllerLayoutGuide type="top" id="y3c-jy-aDJ"/>
                        <viewControllerLayoutGuide type="bottom" id="wfy-db-euE"/>
                    </layoutGuides>
                    <view key="view" contentMode="scaleToFill" id="8bC-Xf-vdC">
                        <rect key="frame" x="0.0" y="0.0" width="768" height="1024"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <webView contentMode="scaleToFill" preservesSuperviewLayoutMargins="YES" translatesAutoresizingMaskIntoConstraints="NO" id="1sT-6d-39b">
                                <color key="backgroundColor" red="0.36078431370000003" green="0.38823529410000002" blue="0.4039215686" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                            </webView>
                        </subviews>
                        <color key="backgroundColor" red="1" green="1" blue="1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                        <constraints>
                            <constraint firstItem="1sT-6d-39b" firstAttribute="top" secondItem="8bC-Xf-vdC" secondAttribute="top" id="P9H-l2-aEG"/>
                            <constraint firstItem="1sT-6d-39b" firstAttribute="leading" secondItem="8bC-Xf-vdC" secondAttribute="leading" id="TFq-ns-Bp9"/>
                            <constraint firstItem="1sT-6d-39b" firstAttribute="bottom" secondItem="wfy-db-euE" secondAttribute="top" id="Xlp-sW-vA3"/>
                            <constraint firstAttribute="trailing" secondItem="1sT-6d-39b" secondAttribute="trailing" id="eQ2-Qz-7RY"/>
                        </constraints>
                    </view>
                    <connections>
                        <outlet property="webView" destination="1sT-6d-39b" id="XYq-tZ-H2i"/>
                    </connections>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="dkx-z0-nzr" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="136.80000000000001" y="137.18140929535232"/>
        </scene>
    </scenes>
</document>`;

exports.launchScreenStoryboard = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="11134" systemVersion="15F34" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="11106"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--View Controller-->
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <layoutGuides>
                        <viewControllerLayoutGuide type="top" id="Llm-lL-Icb"/>
                        <viewControllerLayoutGuide type="bottom" id="xb3-aO-Qok"/>
                    </layoutGuides>
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="375" height="667"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <color key="backgroundColor" red="1" green="1" blue="1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
</document>`;


exports.appiconsetWithout = `{
  "images" : [
    {
      "idiom" : "iphone",
      "size" : "29x29",
      "scale" : "2x"
    },
    {
      "idiom" : "iphone",
      "size" : "29x29",
      "scale" : "3x"
    },
    {
      "idiom" : "iphone",
      "size" : "40x40",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "scale" : "3x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "scale" : "2x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "scale" : "3x"
    },
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}`;

exports.appiconset = `{
  "images" : [
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "AppIcon-41.png",
      "scale" : "2x"
    },
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "AppIcon-61.png",
      "scale" : "3x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "AppIcon-29@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "AppIcon-29@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "AppIcon-40@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "AppIcon-40@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "AppIcon-60@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "AppIcon-60@3x.png",
      "scale" : "3x"
    },
    {
      "idiom" : "ipad",
      "size" : "20x20",
      "filename" : "AppIcon-20.png",
      "scale" : "1x"
    },
    {
      "idiom" : "ipad",
      "size" : "20x20",
      "filename" : "AppIcon-20@2x.png",
      "scale" : "2x"
    },
    {
      "idiom" : "ipad",
      "size" : "29x29",
      "filename" : "AppIcon-29.png",
      "scale" : "1x"
    },
    {
      "idiom" : "ipad",
      "size" : "29x29",
      "filename" : "AppIcon-29@2x.png",
      "scale" : "2x"
    },
    {
      "idiom" : "ipad",
      "size" : "40x40",
      "filename" : "AppIcon-40.png",
      "scale" : "1x"
    },
    {
      "idiom" : "ipad",
      "size" : "40x40",
      "filename" : "AppIcon-40@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "76x76",
      "idiom" : "ipad",
      "filename" : "AppIcon-76.png",
      "scale" : "1x"
    },
    {
      "idiom" : "ipad",
      "size" : "76x76",
      "filename" : "AppIcon-76@2x.png",
      "scale" : "2x"
    },
    {
      "idiom" : "ipad",
      "size" : "83.5x83.5",
      "filename" : "AppIcon-83.5@2x.png",
      "scale" : "2x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}`;

exports.itunesartworkWithout = `{
  "images" : [
    {
      "idiom" : "iphone",
      "scale" : "1x",
    },
    {
      "idiom" : "iphone",
      "scale" : "2x",
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}`;

exports.itunesartwork = `{
  "images" : [
    {
      "idiom" : "iphone",
      "scale" : "1x",
      "filename" : "iTunesArtwork.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "filename" : "iTunesArtwork@2x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
      "filename" : "iTunesArtwork@3x.png"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}`;

exports.launchimagesWithout = `{
  "images" : [
    {
      "extent" : "full-screen",
      "idiom" : "iphone",
      "subtype" : "736h",
      "minimum-system-version" : "8.0",
      "orientation" : "portrait",
      "scale" : "3x"
    },
    {
      "extent" : "full-screen",
      "idiom" : "iphone",
      "subtype" : "667h",
      "minimum-system-version" : "8.0",
      "orientation" : "portrait",
      "scale" : "2x"
    },
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "minimum-system-version" : "7.0",
      "scale" : "2x"
    },
    {
      "extent" : "full-screen",
      "idiom" : "iphone",
      "subtype" : "retina4",
      "minimum-system-version" : "7.0",
      "orientation" : "portrait",
      "scale" : "2x"
    },
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "scale" : "1x"
    },
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "scale" : "2x"
    },
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "subtype" : "retina4",
      "scale" : "2x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}`;

exports.launchimages = `{
  "images" : [
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "filename" : "LaunchImage~iphone.png",
      "scale" : "1x"
    },
    {
      "extent" : "full-screen",
      "idiom" : "iphone",
      "subtype" : "736h",
      "filename" : "LaunchImage-736h@3x~iphone.png",
      "minimum-system-version" : "8.0",
      "orientation" : "portrait",
      "scale" : "3x"
    },
    {
      "extent" : "full-screen",
      "idiom" : "iphone",
      "subtype" : "667h",
      "filename" : "LaunchImage-667h@2x~iphone.png",
      "minimum-system-version" : "8.0",
      "orientation" : "portrait",
      "scale" : "2x"
    },
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "minimum-system-version" : "7.0",
      "filename" : "LaunchImage@2x~iphone.png",
      "scale" : "2x"
    },
    {
      "extent" : "full-screen",
      "idiom" : "iphone",
      "subtype" : "retina4",
      "filename" : "LaunchImage-568h@2x~iphone.png",
      "minimum-system-version" : "7.0",
      "orientation" : "portrait",
      "scale" : "2x"
    },
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "filename" : "LaunchImage@2x~iphone.png",
      "scale" : "2x"
    },
    {
      "orientation" : "portrait",
      "idiom" : "iphone",
      "extent" : "full-screen",
      "filename" : "LaunchImage-568h@2x~iphone.png",
      "subtype" : "retina4",
      "scale" : "2x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}`;

exports.debugger = `<?xml version="1.0" encoding="UTF-8"?>
<Bucket
   type = "1"
   version = "2.0">
</Bucket>`;

exports.xcscheme = `<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "0610"
   version = "1.3">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "53AD62B81A91208300115D9B"
               BuildableName = "${ name }.app"
               BlueprintName = "${ name }"
               ReferencedContainer = "container:${ name }.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "NO"
            buildForArchiving = "NO"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "53AD62CD1A91208300115D9B"
               BuildableName = "${ name }Tests.xctest"
               BlueprintName = "${ name }Tests"
               ReferencedContainer = "container:${ name }.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES"
      buildConfiguration = "Debug">
      <Testables>
         <TestableReference
            skipped = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "53AD62CD1A91208300115D9B"
               BuildableName = "${ name }Tests.xctest"
               BlueprintName = "${ name }Tests"
               ReferencedContainer = "container:${ name }.xcodeproj">
            </BuildableReference>
         </TestableReference>
      </Testables>
      <MacroExpansion>
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "53AD62B81A91208300115D9B"
            BuildableName = "${ name }.app"
            BlueprintName = "${ name }"
            ReferencedContainer = "container:${ name }.xcodeproj">
         </BuildableReference>
      </MacroExpansion>
   </TestAction>
   <LaunchAction
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      buildConfiguration = "Debug"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable>
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "53AD62B81A91208300115D9B"
            BuildableName = "${ name }.app"
            BlueprintName = "${ name }"
            ReferencedContainer = "container:${ name }.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
      <AdditionalOptions>
      </AdditionalOptions>
   </LaunchAction>
   <ProfileAction
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      buildConfiguration = "Release"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable>
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "53AD62B81A91208300115D9B"
            BuildableName = "${ name }.app"
            BlueprintName = "${ name }"
            ReferencedContainer = "container:${ name }.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>`;

exports.xcschememanagement = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>SchemeUserState</key>
  <dict>
    <key>${ name }.xcscheme</key>
    <dict>
      <key>orderHint</key>
      <integer>0</integer>
    </dict>
  </dict>
  <key>SuppressBuildableAutocreation</key>
  <dict>
    <key>53AD62B81A91208300115D9B</key>
    <dict>
      <key>primary</key>
      <true/>
    </dict>
    <key>53AD62CD1A91208300115D9B</key>
    <dict>
      <key>primary</key>
      <true/>
    </dict>
  </dict>
</dict>
</plist>`;

exports.pbxproj = `// !$*UTF8*$!
{
  archiveVersion = 1;
  classes = {
  };
  objectVersion = 46;
  objects = {

/* Begin PBXBuildFile section */
    56D70DDD1D90E5C800DA1812 /* AppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 56D70DDC1D90E5C800DA1812 /* AppDelegate.swift */; };
    56D70DDF1D90E5C800DA1812 /* ViewController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 56D70DDE1D90E5C800DA1812 /* ViewController.swift */; };
    56D70DE21D90E5C800DA1812 /* Main.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DE01D90E5C800DA1812 /* Main.storyboard */; };
    56D70DE41D90E5C800DA1812 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DE31D90E5C800DA1812 /* Assets.xcassets */; };
    56D70DE71D90E5C800DA1812 /* LaunchScreen.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DE51D90E5C800DA1812 /* LaunchScreen.storyboard */; };
    56D70DEF1D90E8B900DA1812 /* Website in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DEE1D90E8B900DA1812 /* Website */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
    56D70DD91D90E5C800DA1812 /* ${ name }.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = ${ name }.app; sourceTree = BUILT_PRODUCTS_DIR; };
    56D70DDC1D90E5C800DA1812 /* AppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AppDelegate.swift; sourceTree = "<group>"; };
    56D70DDE1D90E5C800DA1812 /* ViewController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ViewController.swift; sourceTree = "<group>"; };
    56D70DE11D90E5C800DA1812 /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = Base.lproj/Main.storyboard; sourceTree = "<group>"; };
    56D70DE31D90E5C800DA1812 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
    56D70DE61D90E5C800DA1812 /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = Base.lproj/LaunchScreen.storyboard; sourceTree = "<group>"; };
    56D70DE81D90E5C800DA1812 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
    56D70DEE1D90E8B900DA1812 /* Website */ = {isa = PBXFileReference; lastKnownFileType = folder; path = Website; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
    56D70DD61D90E5C800DA1812 /* Frameworks */ = {
      isa = PBXFrameworksBuildPhase;
      buildActionMask = 2147483647;
      files = (
      );
      runOnlyForDeploymentPostprocessing = 0;
    };
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
    56D70DD01D90E5C800DA1812 = {
      isa = PBXGroup;
      children = (
        56D70DDB1D90E5C800DA1812 /* ${ name } */,
        56D70DDA1D90E5C800DA1812 /* Products */,
        56D70DEE1D90E8B900DA1812 /* Website */,
      );
      sourceTree = "<group>";
    };
    56D70DDA1D90E5C800DA1812 /* Products */ = {
      isa = PBXGroup;
      children = (
        56D70DD91D90E5C800DA1812 /* ${ name }.app */,
      );
      name = Products;
      sourceTree = "<group>";
    };
    56D70DDB1D90E5C800DA1812 /* ${ name } */ = {
      isa = PBXGroup;
      children = (
        56D70DDC1D90E5C800DA1812 /* AppDelegate.swift */,
        56D70DDE1D90E5C800DA1812 /* ViewController.swift */,
        56D70DE01D90E5C800DA1812 /* Main.storyboard */,
        56D70DE31D90E5C800DA1812 /* Assets.xcassets */,
        56D70DE51D90E5C800DA1812 /* LaunchScreen.storyboard */,
        56D70DE81D90E5C800DA1812 /* Info.plist */,
      );
      path = ${ name };
      sourceTree = "<group>";
    };
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
    56D70DD81D90E5C800DA1812 /* ${ name } */ = {
      isa = PBXNativeTarget;
      buildConfigurationList = 56D70DEB1D90E5C800DA1812 /* Build configuration list for PBXNativeTarget "${ name }" */;
      buildPhases = (
        56D70DD51D90E5C800DA1812 /* Sources */,
        56D70DD61D90E5C800DA1812 /* Frameworks */,
        56D70DD71D90E5C800DA1812 /* Resources */,
      );
      buildRules = (
      );
      dependencies = (
      );
      name = ${ name };
      productName = ${ name };
      productReference = 56D70DD91D90E5C800DA1812 /* ${ name }.app */;
      productType = "com.apple.product-type.application";
    };
/* End PBXNativeTarget section */

/* Begin PBXProject section */
    56D70DD11D90E5C800DA1812 /* Project object */ = {
      isa = PBXProject;
      attributes = {
        LastSwiftUpdateCheck = 0800;
        LastUpgradeCheck = 0810;
        ORGANIZATIONNAME = "Robert Biggs";
        TargetAttributes = {
          56D70DD81D90E5C800DA1812 = {
            CreatedOnToolsVersion = 8.0;
            LastSwiftMigration = 0800;
            ProvisioningStyle = Automatic;
          };
        };
      };
      buildConfigurationList = 56D70DD41D90E5C800DA1812 /* Build configuration list for PBXProject "${ name }" */;
      compatibilityVersion = "Xcode 3.2";
      developmentRegion = English;
      hasScannedForEncodings = 0;
      knownRegions = (
        en,
        Base,
      );
      mainGroup = 56D70DD01D90E5C800DA1812;
      productRefGroup = 56D70DDA1D90E5C800DA1812 /* Products */;
      projectDirPath = "";
      projectRoot = "";
      targets = (
        56D70DD81D90E5C800DA1812 /* ${ name } */,
      );
    };
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
    56D70DD71D90E5C800DA1812 /* Resources */ = {
      isa = PBXResourcesBuildPhase;
      buildActionMask = 2147483647;
      files = (
        56D70DE71D90E5C800DA1812 /* LaunchScreen.storyboard in Resources */,
        56D70DE41D90E5C800DA1812 /* Assets.xcassets in Resources */,
        56D70DEF1D90E8B900DA1812 /* Website in Resources */,
        56D70DE21D90E5C800DA1812 /* Main.storyboard in Resources */,
      );
      runOnlyForDeploymentPostprocessing = 0;
    };
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
    56D70DD51D90E5C800DA1812 /* Sources */ = {
      isa = PBXSourcesBuildPhase;
      buildActionMask = 2147483647;
      files = (
        56D70DDF1D90E5C800DA1812 /* ViewController.swift in Sources */,
        56D70DDD1D90E5C800DA1812 /* AppDelegate.swift in Sources */,
      );
      runOnlyForDeploymentPostprocessing = 0;
    };
/* End PBXSourcesBuildPhase section */

/* Begin PBXVariantGroup section */
    56D70DE01D90E5C800DA1812 /* Main.storyboard */ = {
      isa = PBXVariantGroup;
      children = (
        56D70DE11D90E5C800DA1812 /* Base */,
      );
      name = Main.storyboard;
      sourceTree = "<group>";
    };
    56D70DE51D90E5C800DA1812 /* LaunchScreen.storyboard */ = {
      isa = PBXVariantGroup;
      children = (
        56D70DE61D90E5C800DA1812 /* Base */,
      );
      name = LaunchScreen.storyboard;
      sourceTree = "<group>";
    };
/* End PBXVariantGroup section */

/* Begin XCBuildConfiguration section */
    56D70DE91D90E5C800DA1812 /* Debug */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        ALWAYS_SEARCH_USER_PATHS = NO;
        CLANG_ANALYZER_NONNULL = YES;
        CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
        CLANG_CXX_LIBRARY = "libc++";
        CLANG_ENABLE_MODULES = YES;
        CLANG_ENABLE_OBJC_ARC = YES;
        CLANG_WARN_BOOL_CONVERSION = YES;
        CLANG_WARN_CONSTANT_CONVERSION = YES;
        CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
        CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
        CLANG_WARN_EMPTY_BODY = YES;
        CLANG_WARN_ENUM_CONVERSION = YES;
        CLANG_WARN_INFINITE_RECURSION = YES;
        CLANG_WARN_INT_CONVERSION = YES;
        CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
        CLANG_WARN_SUSPICIOUS_MOVE = YES;
        CLANG_WARN_SUSPICIOUS_MOVES = YES;
        CLANG_WARN_UNREACHABLE_CODE = YES;
        CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
        "CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
        COPY_PHASE_STRIP = NO;
        DEBUG_INFORMATION_FORMAT = dwarf;
        ENABLE_STRICT_OBJC_MSGSEND = YES;
        ENABLE_TESTABILITY = YES;
        GCC_C_LANGUAGE_STANDARD = gnu99;
        GCC_DYNAMIC_NO_PIC = NO;
        GCC_NO_COMMON_BLOCKS = YES;
        GCC_OPTIMIZATION_LEVEL = 0;
        GCC_PREPROCESSOR_DEFINITIONS = (
          "DEBUG=1",
          "$(inherited)",
        );
        GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
        GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
        GCC_WARN_UNDECLARED_SELECTOR = YES;
        GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
        GCC_WARN_UNUSED_FUNCTION = YES;
        GCC_WARN_UNUSED_VARIABLE = YES;
        IPHONEOS_DEPLOYMENT_TARGET = 8.3;
        MTL_ENABLE_DEBUG_INFO = YES;
        ONLY_ACTIVE_ARCH = YES;
        SDKROOT = iphoneos;
        SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
        SWIFT_OPTIMIZATION_LEVEL = "-Onone";
        TARGETED_DEVICE_FAMILY = "1,2";
      };
      name = Debug;
    };
    56D70DEA1D90E5C800DA1812 /* Release */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        ALWAYS_SEARCH_USER_PATHS = NO;
        CLANG_ANALYZER_NONNULL = YES;
        CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
        CLANG_CXX_LIBRARY = "libc++";
        CLANG_ENABLE_MODULES = YES;
        CLANG_ENABLE_OBJC_ARC = YES;
        CLANG_WARN_BOOL_CONVERSION = YES;
        CLANG_WARN_CONSTANT_CONVERSION = YES;
        CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
        CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
        CLANG_WARN_EMPTY_BODY = YES;
        CLANG_WARN_ENUM_CONVERSION = YES;
        CLANG_WARN_INFINITE_RECURSION = YES;
        CLANG_WARN_INT_CONVERSION = YES;
        CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
        CLANG_WARN_SUSPICIOUS_MOVE = YES;
        CLANG_WARN_SUSPICIOUS_MOVES = YES;
        CLANG_WARN_UNREACHABLE_CODE = YES;
        CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
        "CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
        COPY_PHASE_STRIP = NO;
        DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
        ENABLE_NS_ASSERTIONS = NO;
        ENABLE_STRICT_OBJC_MSGSEND = YES;
        GCC_C_LANGUAGE_STANDARD = gnu99;
        GCC_NO_COMMON_BLOCKS = YES;
        GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
        GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
        GCC_WARN_UNDECLARED_SELECTOR = YES;
        GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
        GCC_WARN_UNUSED_FUNCTION = YES;
        GCC_WARN_UNUSED_VARIABLE = YES;
        IPHONEOS_DEPLOYMENT_TARGET = 8.3;
        MTL_ENABLE_DEBUG_INFO = NO;
        SDKROOT = iphoneos;
        SWIFT_OPTIMIZATION_LEVEL = "-Owholemodule";
        TARGETED_DEVICE_FAMILY = "1,2";
        VALIDATE_PRODUCT = YES;
      };
      name = Release;
    };
    56D70DEC1D90E5C800DA1812 /* Debug */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
        INFOPLIST_FILE = ${ name }/Info.plist;
        IPHONEOS_DEPLOYMENT_TARGET = 8.4;
        LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/Frameworks";
        PRODUCT_BUNDLE_IDENTIFIER = asd.${ name };
        PRODUCT_NAME = "$(TARGET_NAME)";
        SWIFT_VERSION = 3.0;
      };
      name = Debug;
    };
    56D70DED1D90E5C800DA1812 /* Release */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
        INFOPLIST_FILE = ${ name }/Info.plist;
        IPHONEOS_DEPLOYMENT_TARGET = 8.4;
        LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/Frameworks";
        PRODUCT_BUNDLE_IDENTIFIER = asd.${ name };
        PRODUCT_NAME = "$(TARGET_NAME)";
        SWIFT_VERSION = 3.0;
      };
      name = Release;
    };
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
    56D70DD41D90E5C800DA1812 /* Build configuration list for PBXProject "${ name }" */ = {
      isa = XCConfigurationList;
      buildConfigurations = (
        56D70DE91D90E5C800DA1812 /* Debug */,
        56D70DEA1D90E5C800DA1812 /* Release */,
      );
      defaultConfigurationIsVisible = 0;
      defaultConfigurationName = Release;
    };
    56D70DEB1D90E5C800DA1812 /* Build configuration list for PBXNativeTarget "${ name }" */ = {
      isa = XCConfigurationList;
      buildConfigurations = (
        56D70DEC1D90E5C800DA1812 /* Debug */,
        56D70DED1D90E5C800DA1812 /* Release */,
      );
      defaultConfigurationIsVisible = 0;
      defaultConfigurationName = Release;
    };
/* End XCConfigurationList section */
  };
  rootObject = 56D70DD11D90E5C800DA1812 /* Project object */;
}`;

exports.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="msapplication-tap-highlight" content="no">
  <title>ChocolateChip-UI</title>
  <style>
    html, body {
      padding: 0;
      margin: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
    }
    body {
      font: normal 11pt/1.345 Sans-serif;
      background-color: #efeff4;
      -webkit-font-smoothing: antialiased;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      font-size: 1em;
      line-height: 1.5;
    }
    article {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      -webkit-transition: all 0.15s;
      transition: all 0.15s;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    article > section {
      padding: 20px 0 10px;
      padding-bottom: 100px;
      flex: 1;
      width: 100%;
      background-color: #fff;
    }
    nav {
      background-color: #f7f7f7;
      border-bottom: solid 1px #a7a7aa;
      height: 45px;
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      padding: 0 15px;
      vertical-align: middle;
    }
    nav > h1 {
      text-align: center;
      font: normal 12pt/14pt HelveticaNeue, Sans-serif;
      color: #000000;
      flex: 1;
    }
    h2 {
      font-size: 11pt;
      font-weight: normal;
      padding-left: 10px;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      border-top: solid 1px #ccc;
    }
    li {
      padding: 10px;
      border-bottom: solid 1px #ccc;
    }

  </style>
</head>
<body>
    <article>
        <nav>
            <h1>bingo</h1>
        </nav>
    <section>
      <h2>Replace the contents of this folder with the assets of your Web app.</h2>
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </section>
  </article>
</body>
</html>
`;

exports.testsPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>en</string>
  <key>CFBundleExecutable</key>
  <string>$(EXECUTABLE_NAME)</string>
  <key>CFBundleIdentifier</key>
  <string>${ name }.$(PRODUCT_NAME:rfc1034identifier)</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>$(PRODUCT_NAME)</string>
  <key>CFBundlePackageType</key>
  <string>BNDL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0</string>
  <key>CFBundleSignature</key>
  <string>????</string>
  <key>CFBundleVersion</key>
  <string>1</string>
</dict>
</plist>`;

exports.testsSwift = `//
//  ${ name.toLowerCase() }Tests.swift
//  ${ name.toLowerCase() }Tests
//
//  Created by ${ user } on 2/15/16.
//  Copyright (c) 2017 ${ user }. All rights reserved.
//

import UIKit
import XCTest

class ${ name }Tests: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
  
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // This is an example of a functional test case.
        XCTAssert(true, "Pass")
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measureBlock() {
            // Put the code you want to measure the time of here.
        }
    }
    
}`;