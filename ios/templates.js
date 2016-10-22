
var argv = require('yargs').argv;
var user = (process.platform === "win32") ? process.env.USERNAME : process.env.USER;
var name = argv.name || argv.n;
if (!name) return;
var icons = argv.icons;

exports.appDelegate = "//\n\
//  AppDelegate.swift\n\
//  " + name + "\n\
//\n\
//  Created by " + user + " on 2/15/16.\n\
//  Copyright (c) 2016 " + user + ". All rights reserved.\n\
//\n\
\n\
import UIKit\n\
\n\
@UIApplicationMain\n\
class AppDelegate: UIResponder, UIApplicationDelegate {\n\
\n\
  var window: UIWindow?\n\
\n\
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {\n\
      // Override point for customization after application launch.\n\
      return true\n\
  }\n\
\n\
  func applicationWillResignActive(_ application: UIApplication) {\n\
      // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.\n\
      // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.\n\
  }\n\
\n\
  func applicationDidEnterBackground(_ application: UIApplication) {\n\
      // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.\n\
      // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.\n\
  }\n\
\n\
  func applicationWillEnterForeground(_ application: UIApplication) {\n\
      // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.\n\
  }\n\
\n\
  func applicationDidBecomeActive(_ application: UIApplication) {\n\
      // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.\n\
  }\n\
\n\
  func applicationWillTerminate(_ application: UIApplication) {\n\
      // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.\n\
  }\n\
}";

exports.viewController = '//\n\
//  ViewController.swift\n\
//  ' + name + '\n\
//\n\
//  Created by ' + name + ' on 2/15/16.\n\
//  Copyright (c) 2016 ' + user + '. All rights reserved.\n\
//\n\
\n\
import UIKit\n\
import WebKit\n\
\n\
class ViewController: UIViewController {\n\
\n\
  //Hide the status bar\n\
  override var prefersStatusBarHidden: Bool {\n\
    get {\n\
      return true\n\
    }\n\
  }\n\
  \n\
  @IBOutlet var webView: UIWebView!\n\
  override func viewDidLoad() {\n\
      \n\
    // Define location of local HTML file:\n\
    let html = Bundle.main.path(forResource: "index.html", ofType: "", inDirectory: "Website")\n\
    \n\
    // Create an URL object with the above path:\n\
    let url = URL.init(fileURLWithPath: html!)\n\
    \n\
    // Create a request object with the url object:\n\
    let request = URLRequest(url: url)\n\
    \n\
    // Tell the Web view to load the url request object:\n\
    self.webView.loadRequest(request as URLRequest)\n\
  }\n\
}';

exports.infoPlist = '<?xml version="1.0" encoding="UTF-8"?>\n\
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n\
<plist version="1.0">\n\
<dict>\n\
  <key>CFBundleDevelopmentRegion</key>\n\
  <string>en</string>\n\
  <key>CFBundleExecutable</key>\n\
  <string>$(EXECUTABLE_NAME)</string>\n\
  <key>CFBundleIdentifier</key>\n\
  <string>' + name + '.$(PRODUCT_BUNDLE_IDENTIFIER)</string>\n\
  <key>CFBundleInfoDictionaryVersion</key>\n\
  <string>6.0</string>\n\
  <key>CFBundleName</key>\n\
  <string>$(PRODUCT_NAME)</string>\n\
  <key>CFBundlePackageType</key>\n\
  <string>APPL</string>\n\
  <key>CFBundleShortVersionString</key>\n\
  <string>1.0</string>\n\
  <key>CFBundleVersion</key>\n\
  <string>1</string>\n\
  <key>LSRequiresIPhoneOS</key>\n\
  <true/>\n\
  <key>UILaunchStoryboardName</key>\n\
  <string>LaunchScreen</string>\n\
  <key>UIMainStoryboardFile</key>\n\
  <string>Main</string>\n\
  <key>UIRequiredDeviceCapabilities</key>\n\
  <array>\n\
    <string>armv7</string>\n\
  </array>\n\
  <key>UIRequiresFullScreen</key>\n\
  <true/>\n\
  <key>UISupportedInterfaceOrientations</key>\n\
  <array>\n\
    <string>UIInterfaceOrientationPortrait</string>\n\
    <string>UIInterfaceOrientationLandscapeLeft</string>\n\
    <string>UIInterfaceOrientationLandscapeRight</string>\n\
  </array>\n\
  <key>UISupportedInterfaceOrientations~ipad</key>\n\
  <array>\n\
    <string>UIInterfaceOrientationPortrait</string>\n\
    <string>UIInterfaceOrientationPortraitUpsideDown</string>\n\
    <string>UIInterfaceOrientationLandscapeLeft</string>\n\
    <string>UIInterfaceOrientationLandscapeRight</string>\n\
  </array>\n\
</dict>\n\
</plist>\n\
';

exports.launchScreenStoryboard = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n\
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="11134" systemVersion="15F34" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" colorMatched="YES" initialViewController="01J-lp-oVM">\n\
    <dependencies>\n\
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="11106"/>\n\
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>\n\
    </dependencies>\n\
    <scenes>\n\
        <!--View Controller-->\n\
        <scene sceneID="EHf-IW-A2E">\n\
            <objects>\n\
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">\n\
                    <layoutGuides>\n\
                        <viewControllerLayoutGuide type="top" id="Llm-lL-Icb"/>\n\
                        <viewControllerLayoutGuide type="bottom" id="xb3-aO-Qok"/>\n\
                    </layoutGuides>\n\
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">\n\
                        <rect key="frame" x="0.0" y="0.0" width="375" height="667"/>\n\
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>\n\
                        <color key="backgroundColor" red="1" green="1" blue="1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>\n\
                    </view>\n\
                </viewController>\n\
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>\n\
            </objects>\n\
            <point key="canvasLocation" x="53" y="375"/>\n\
        </scene>\n\
    </scenes>\n\
</document>';

exports.mainStoryboard = '<?xml version="1.0" encoding="UTF-8"?>\n\
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="11521.1" systemVersion="16A323" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" colorMatched="YES" initialViewController="BYZ-38-t0r">\n\
    <dependencies>\n\
        <deployment identifier="iOS"/>\n\
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="11517.1"/>\n\
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>\n\
    </dependencies>\n\
    <scenes>\n\
        <!--View Controller-->\n\
        <scene sceneID="tne-QT-ifu">\n\
            <objects>\n\
                <viewController id="BYZ-38-t0r" customClass="ViewController" customModule="Dingie" customModuleProvider="target" sceneMemberID="viewController">\n\
                    <layoutGuides>\n\
                        <viewControllerLayoutGuide type="top" id="y3c-jy-aDJ"/>\n\
                        <viewControllerLayoutGuide type="bottom" id="wfy-db-euE"/>\n\
                    </layoutGuides>\n\
                    <view key="view" contentMode="scaleToFill" id="8bC-Xf-vdC">\n\
                        <rect key="frame" x="0.0" y="0.0" width="768" height="1024"/>\n\
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>\n\
                        <subviews>\n\
                            <webView contentMode="scaleToFill" preservesSuperviewLayoutMargins="YES" translatesAutoresizingMaskIntoConstraints="NO" id="1sT-6d-39b">\n\
                                <color key="backgroundColor" red="0.36078431370000003" green="0.38823529410000002" blue="0.4039215686" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>\n\
                            </webView>\n\
                        </subviews>\n\
                        <color key="backgroundColor" red="1" green="1" blue="1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>\n\
                        <constraints>\n\
                            <constraint firstItem="1sT-6d-39b" firstAttribute="top" secondItem="8bC-Xf-vdC" secondAttribute="top" id="P9H-l2-aEG"/>\n\
                            <constraint firstItem="1sT-6d-39b" firstAttribute="leading" secondItem="8bC-Xf-vdC" secondAttribute="leading" id="TFq-ns-Bp9"/>\n\
                            <constraint firstItem="1sT-6d-39b" firstAttribute="bottom" secondItem="wfy-db-euE" secondAttribute="top" id="Xlp-sW-vA3"/>\n\
                            <constraint firstAttribute="trailing" secondItem="1sT-6d-39b" secondAttribute="trailing" id="eQ2-Qz-7RY"/>\n\
                        </constraints>\n\
                    </view>\n\
                    <connections>\n\
                        <outlet property="webView" destination="1sT-6d-39b" id="XYq-tZ-H2i"/>\n\
                    </connections>\n\
                </viewController>\n\
                <placeholder placeholderIdentifier="IBFirstResponder" id="dkx-z0-nzr" sceneMemberID="firstResponder"/>\n\
            </objects>\n\
            <point key="canvasLocation" x="136.80000000000001" y="137.18140929535232"/>\n\
        </scene>\n\
    </scenes>\n\
</document>';


exports.appiconsetWithout = '{\n\
  "images" : [\n\
    {\n\
      "idiom" : "iphone",\n\
      "size" : "29x29",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "idiom" : "iphone",\n\
      "size" : "29x29",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "idiom" : "iphone",\n\
      "size" : "40x40",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "size" : "40x40",\n\
      "idiom" : "iphone",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "size" : "60x60",\n\
      "idiom" : "iphone",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "size" : "60x60",\n\
      "idiom" : "iphone",\n\
      "scale" : "3x"\n\
    },\n\
  ],\n\
  "info" : {\n\
    "version" : 1,\n\
    "author" : "xcode"\n\
  }\n\
}';

exports.appiconset = '{\n\
  "images" : [\n\
    {\n\
      "size" : "20x20",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-41.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "size" : "20x20",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-61.png",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "size" : "29x29",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-29@2x.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "size" : "29x29",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-29@3x.png",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "size" : "40x40",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-40@2x.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "size" : "40x40",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-40@3x.png",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "size" : "60x60",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-60@2x.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "size" : "60x60",\n\
      "idiom" : "iphone",\n\
      "filename" : "AppIcon-60@3x.png",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "20x20",\n\
      "filename" : "AppIcon-20.png",\n\
      "scale" : "1x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "20x20",\n\
      "filename" : "AppIcon-20@2x.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "29x29",\n\
      "filename" : "AppIcon-29.png",\n\
      "scale" : "1x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "29x29",\n\
      "filename" : "AppIcon-29@2x.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "40x40",\n\
      "filename" : "AppIcon-40.png",\n\
      "scale" : "1x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "40x40",\n\
      "filename" : "AppIcon-40@2x.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "size" : "76x76",\n\
      "idiom" : "ipad",\n\
      "filename" : "AppIcon-76.png",\n\
      "scale" : "1x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "76x76",\n\
      "filename" : "AppIcon-76@2x.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "idiom" : "ipad",\n\
      "size" : "83.5x83.5",\n\
      "filename" : "AppIcon-83.5@2x.png",\n\
      "scale" : "2x"\n\
    }\n\
  ],\n\
  "info" : {\n\
    "version" : 1,\n\
    "author" : "xcode"\n\
  }\n\
}';

exports.itunesartworkWithout = '{\n\
  "images" : [\n\
    {\n\
      "idiom" : "iphone",\n\
      "scale" : "1x",\n\
    },\n\
    {\n\
      "idiom" : "iphone",\n\
      "scale" : "2x",\n\
    },\n\
    {\n\
      "idiom" : "iphone",\n\
      "scale" : "3x",\n\
    }\n\
  ],\n\
  "info" : {\n\
    "version" : 1,\n\
    "author" : "xcode"\n\
  }\n\
}';

exports.itunesartwork = '{\n\
  "images" : [\n\
    {\n\
      "idiom" : "iphone",\n\
      "scale" : "1x",\n\
      "filename" : "iTunesArtwork.png"\n\
    },\n\
    {\n\
      "idiom" : "iphone",\n\
      "scale" : "2x",\n\
      "filename" : "iTunesArtwork@2x.png"\n\
    },\n\
    {\n\
      "idiom" : "iphone",\n\
      "scale" : "3x",\n\
      "filename" : "iTunesArtwork@3x.png"\n\
    }\n\
  ],\n\
  "info" : {\n\
    "version" : 1,\n\
    "author" : "xcode"\n\
  }\n\
}';

exports.launchimagesWithout = '{\n\
  "images" : [\n\
    {\n\
      "extent" : "full-screen",\n\
      "idiom" : "iphone",\n\
      "subtype" : "736h",\n\
      "minimum-system-version" : "8.0",\n\
      "orientation" : "portrait",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "extent" : "full-screen",\n\
      "idiom" : "iphone",\n\
      "subtype" : "667h",\n\
      "minimum-system-version" : "8.0",\n\
      "orientation" : "portrait",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "minimum-system-version" : "7.0",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "extent" : "full-screen",\n\
      "idiom" : "iphone",\n\
      "subtype" : "retina4",\n\
      "minimum-system-version" : "7.0",\n\
      "orientation" : "portrait",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "scale" : "1x"\n\
    },\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "subtype" : "retina4",\n\
      "scale" : "2x"\n\
    }\n\
  ],\n\
  "info" : {\n\
    "version" : 1,\n\
    "author" : "xcode"\n\
  }\n\
}';

exports.launchimages = '{\n\
  "images" : [\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "filename" : "LaunchImage~iphone.png",\n\
      "scale" : "1x"\n\
    },\n\
    {\n\
      "extent" : "full-screen",\n\
      "idiom" : "iphone",\n\
      "subtype" : "736h",\n\
      "filename" : "LaunchImage-736h@3x~iphone.png",\n\
      "minimum-system-version" : "8.0",\n\
      "orientation" : "portrait",\n\
      "scale" : "3x"\n\
    },\n\
    {\n\
      "extent" : "full-screen",\n\
      "idiom" : "iphone",\n\
      "subtype" : "667h",\n\
      "filename" : "LaunchImage-667h@2x~iphone.png",\n\
      "minimum-system-version" : "8.0",\n\
      "orientation" : "portrait",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "minimum-system-version" : "7.0",\n\
      "filename" : "LaunchImage@2x~iphone.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "extent" : "full-screen",\n\
      "idiom" : "iphone",\n\
      "subtype" : "retina4",\n\
      "filename" : "LaunchImage-568h@2x~iphone.png",\n\
      "minimum-system-version" : "7.0",\n\
      "orientation" : "portrait",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "filename" : "LaunchImage@2x~iphone.png",\n\
      "scale" : "2x"\n\
    },\n\
    {\n\
      "orientation" : "portrait",\n\
      "idiom" : "iphone",\n\
      "extent" : "full-screen",\n\
      "filename" : "LaunchImage-568h@2x~iphone.png",\n\
      "subtype" : "retina4",\n\
      "scale" : "2x"\n\
    }\n\
  ],\n\
  "info" : {\n\
    "version" : 1,\n\
    "author" : "xcode"\n\
  }\n\
}';

exports.debugger = '<?xml version="1.0" encoding="UTF-8"?>\n\
<Bucket\n\
   type = "1"\n\
   version = "2.0">\n\
</Bucket>';

exports.xcscheme = '<?xml version="1.0" encoding="UTF-8"?>\n\
<Scheme\n\
   LastUpgradeVersion = "0610"\n\
   version = "1.3">\n\
   <BuildAction\n\
      parallelizeBuildables = "YES"\n\
      buildImplicitDependencies = "YES">\n\
      <BuildActionEntries>\n\
         <BuildActionEntry\n\
            buildForTesting = "YES"\n\
            buildForRunning = "YES"\n\
            buildForProfiling = "YES"\n\
            buildForArchiving = "YES"\n\
            buildForAnalyzing = "YES">\n\
            <BuildableReference\n\
               BuildableIdentifier = "primary"\n\
               BlueprintIdentifier = "53AD62B81A91208300115D9B"\n\
               BuildableName = "' + name + '.app"\n\
               BlueprintName = "' + name + '"\n\
               ReferencedContainer = "container:' + name + '.xcodeproj">\n\
            </BuildableReference>\n\
         </BuildActionEntry>\n\
         <BuildActionEntry\n\
            buildForTesting = "YES"\n\
            buildForRunning = "YES"\n\
            buildForProfiling = "NO"\n\
            buildForArchiving = "NO"\n\
            buildForAnalyzing = "YES">\n\
            <BuildableReference\n\
               BuildableIdentifier = "primary"\n\
               BlueprintIdentifier = "53AD62CD1A91208300115D9B"\n\
               BuildableName = "' + name + 'Tests.xctest"\n\
               BlueprintName = "' + name + 'Tests"\n\
               ReferencedContainer = "container:' + name + '.xcodeproj">\n\
            </BuildableReference>\n\
         </BuildActionEntry>\n\
      </BuildActionEntries>\n\
   </BuildAction>\n\
   <TestAction\n\
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"\n\
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"\n\
      shouldUseLaunchSchemeArgsEnv = "YES"\n\
      buildConfiguration = "Debug">\n\
      <Testables>\n\
         <TestableReference\n\
            skipped = "NO">\n\
            <BuildableReference\n\
               BuildableIdentifier = "primary"\n\
               BlueprintIdentifier = "53AD62CD1A91208300115D9B"\n\
               BuildableName = "' + name + 'Tests.xctest"\n\
               BlueprintName = "' + name + 'Tests"\n\
               ReferencedContainer = "container:' + name + '.xcodeproj">\n\
            </BuildableReference>\n\
         </TestableReference>\n\
      </Testables>\n\
      <MacroExpansion>\n\
         <BuildableReference\n\
            BuildableIdentifier = "primary"\n\
            BlueprintIdentifier = "53AD62B81A91208300115D9B"\n\
            BuildableName = "' + name + '.app"\n\
            BlueprintName = "' + name + '"\n\
            ReferencedContainer = "container:' + name + '.xcodeproj">\n\
         </BuildableReference>\n\
      </MacroExpansion>\n\
   </TestAction>\n\
   <LaunchAction\n\
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"\n\
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"\n\
      launchStyle = "0"\n\
      useCustomWorkingDirectory = "NO"\n\
      buildConfiguration = "Debug"\n\
      ignoresPersistentStateOnLaunch = "NO"\n\
      debugDocumentVersioning = "YES"\n\
      allowLocationSimulation = "YES">\n\
      <BuildableProductRunnable>\n\
         <BuildableReference\n\
            BuildableIdentifier = "primary"\n\
            BlueprintIdentifier = "53AD62B81A91208300115D9B"\n\
            BuildableName = "' + name + '.app"\n\
            BlueprintName = "' + name + '"\n\
            ReferencedContainer = "container:' + name + '.xcodeproj">\n\
         </BuildableReference>\n\
      </BuildableProductRunnable>\n\
      <AdditionalOptions>\n\
      </AdditionalOptions>\n\
   </LaunchAction>\n\
   <ProfileAction\n\
      shouldUseLaunchSchemeArgsEnv = "YES"\n\
      savedToolIdentifier = ""\n\
      useCustomWorkingDirectory = "NO"\n\
      buildConfiguration = "Release"\n\
      debugDocumentVersioning = "YES">\n\
      <BuildableProductRunnable>\n\
         <BuildableReference\n\
            BuildableIdentifier = "primary"\n\
            BlueprintIdentifier = "53AD62B81A91208300115D9B"\n\
            BuildableName = "' + name + '.app"\n\
            BlueprintName = "' + name + '"\n\
            ReferencedContainer = "container:' + name + '.xcodeproj">\n\
         </BuildableReference>\n\
      </BuildableProductRunnable>\n\
   </ProfileAction>\n\
   <AnalyzeAction\n\
      buildConfiguration = "Debug">\n\
   </AnalyzeAction>\n\
   <ArchiveAction\n\
      buildConfiguration = "Release"\n\
      revealArchiveInOrganizer = "YES">\n\
   </ArchiveAction>\n\
</Scheme>';

exports.xcschememanagement = '<?xml version="1.0" encoding="UTF-8"?>\n\
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n\
<plist version="1.0">\n\
<dict>\n\
  <key>SchemeUserState</key>\n\
  <dict>\n\
    <key>' + name + '.xcscheme</key>\n\
    <dict>\n\
      <key>orderHint</key>\n\
      <integer>0</integer>\n\
    </dict>\n\
  </dict>\n\
  <key>SuppressBuildableAutocreation</key>\n\
  <dict>\n\
    <key>53AD62B81A91208300115D9B</key>\n\
    <dict>\n\
      <key>primary</key>\n\
      <true/>\n\
    </dict>\n\
    <key>53AD62CD1A91208300115D9B</key>\n\
    <dict>\n\
      <key>primary</key>\n\
      <true/>\n\
    </dict>\n\
  </dict>\n\
</dict>\n\
</plist>';

exports.pbxproj = '// !$*UTF8*$!\n\
{\n\
  archiveVersion = 1;\n\
  classes = {\n\
  };\n\
  objectVersion = 46;\n\
  objects = {\n\
\n\
/* Begin PBXBuildFile section */\n\
    56D70DDD1D90E5C800DA1812 /* AppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 56D70DDC1D90E5C800DA1812 /* AppDelegate.swift */; };\n\
    56D70DDF1D90E5C800DA1812 /* ViewController.swift in Sources */ = {isa = PBXBuildFile; fileRef = 56D70DDE1D90E5C800DA1812 /* ViewController.swift */; };\n\
    56D70DE21D90E5C800DA1812 /* Main.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DE01D90E5C800DA1812 /* Main.storyboard */; };\n\
    56D70DE41D90E5C800DA1812 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DE31D90E5C800DA1812 /* Assets.xcassets */; };\n\
    56D70DE71D90E5C800DA1812 /* LaunchScreen.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DE51D90E5C800DA1812 /* LaunchScreen.storyboard */; };\n\
    56D70DEF1D90E8B900DA1812 /* Website in Resources */ = {isa = PBXBuildFile; fileRef = 56D70DEE1D90E8B900DA1812 /* Website */; };\n\
/* End PBXBuildFile section */\n\
\n\
/* Begin PBXFileReference section */\n\
    56D70DD91D90E5C800DA1812 /* ' + name + '.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = ' + name + '.app; sourceTree = BUILT_PRODUCTS_DIR; };\n\
    56D70DDC1D90E5C800DA1812 /* AppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AppDelegate.swift; sourceTree = "<group>"; };\n\
    56D70DDE1D90E5C800DA1812 /* ViewController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ViewController.swift; sourceTree = "<group>"; };\n\
    56D70DE11D90E5C800DA1812 /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = Base.lproj/Main.storyboard; sourceTree = "<group>"; };\n\
    56D70DE31D90E5C800DA1812 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };\n\
    56D70DE61D90E5C800DA1812 /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = Base.lproj/LaunchScreen.storyboard; sourceTree = "<group>"; };\n\
    56D70DE81D90E5C800DA1812 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };\n\
    56D70DEE1D90E8B900DA1812 /* Website */ = {isa = PBXFileReference; lastKnownFileType = folder; path = Website; sourceTree = "<group>"; };\n\
/* End PBXFileReference section */\n\
\n\
/* Begin PBXFrameworksBuildPhase section */\n\
    56D70DD61D90E5C800DA1812 /* Frameworks */ = {\n\
      isa = PBXFrameworksBuildPhase;\n\
      buildActionMask = 2147483647;\n\
      files = (\n\
      );\n\
      runOnlyForDeploymentPostprocessing = 0;\n\
    };\n\
/* End PBXFrameworksBuildPhase section */\n\
\n\
/* Begin PBXGroup section */\n\
    56D70DD01D90E5C800DA1812 = {\n\
      isa = PBXGroup;\n\
      children = (\n\
        56D70DDB1D90E5C800DA1812 /* ' + name + ' */,\n\
        56D70DDA1D90E5C800DA1812 /* Products */,\n\
        56D70DEE1D90E8B900DA1812 /* Website */,\n\
      );\n\
      sourceTree = "<group>";\n\
    };\n\
    56D70DDA1D90E5C800DA1812 /* Products */ = {\n\
      isa = PBXGroup;\n\
      children = (\n\
        56D70DD91D90E5C800DA1812 /* ' + name + '.app */,\n\
      );\n\
      name = Products;\n\
      sourceTree = "<group>";\n\
    };\n\
    56D70DDB1D90E5C800DA1812 /* ' + name + ' */ = {\n\
      isa = PBXGroup;\n\
      children = (\n\
        56D70DDC1D90E5C800DA1812 /* AppDelegate.swift */,\n\
        56D70DDE1D90E5C800DA1812 /* ViewController.swift */,\n\
        56D70DE01D90E5C800DA1812 /* Main.storyboard */,\n\
        56D70DE31D90E5C800DA1812 /* Assets.xcassets */,\n\
        56D70DE51D90E5C800DA1812 /* LaunchScreen.storyboard */,\n\
        56D70DE81D90E5C800DA1812 /* Info.plist */,\n\
      );\n\
      path = ' + name + ';\n\
      sourceTree = "<group>";\n\
    };\n\
/* End PBXGroup section */\n\
\n\
/* Begin PBXNativeTarget section */\n\
    56D70DD81D90E5C800DA1812 /* ' + name + ' */ = {\n\
      isa = PBXNativeTarget;\n\
      buildConfigurationList = 56D70DEB1D90E5C800DA1812 /* Build configuration list for PBXNativeTarget "' + name + '" */;\n\
      buildPhases = (\n\
        56D70DD51D90E5C800DA1812 /* Sources */,\n\
        56D70DD61D90E5C800DA1812 /* Frameworks */,\n\
        56D70DD71D90E5C800DA1812 /* Resources */,\n\
      );\n\
      buildRules = (\n\
      );\n\
      dependencies = (\n\
      );\n\
      name = ' + name + ';\n\
      productName = ' + name + ';\n\
      productReference = 56D70DD91D90E5C800DA1812 /* ' + name + '.app */;\n\
      productType = "com.apple.product-type.application";\n\
    };\n\
/* End PBXNativeTarget section */\n\
\n\
/* Begin PBXProject section */\n\
    56D70DD11D90E5C800DA1812 /* Project object */ = {\n\
      isa = PBXProject;\n\
      attributes = {\n\
        LastSwiftUpdateCheck = 0800;\n\
        LastUpgradeCheck = 0810;\n\
        ORGANIZATIONNAME = "Robert Biggs";\n\
        TargetAttributes = {\n\
          56D70DD81D90E5C800DA1812 = {\n\
            CreatedOnToolsVersion = 8.0;\n\
            LastSwiftMigration = 0800;\n\
            ProvisioningStyle = Automatic;\n\
          };\n\
        };\n\
      };\n\
      buildConfigurationList = 56D70DD41D90E5C800DA1812 /* Build configuration list for PBXProject "' + name + '" */;\n\
      compatibilityVersion = "Xcode 3.2";\n\
      developmentRegion = English;\n\
      hasScannedForEncodings = 0;\n\
      knownRegions = (\n\
        en,\n\
        Base,\n\
      );\n\
      mainGroup = 56D70DD01D90E5C800DA1812;\n\
      productRefGroup = 56D70DDA1D90E5C800DA1812 /* Products */;\n\
      projectDirPath = "";\n\
      projectRoot = "";\n\
      targets = (\n\
        56D70DD81D90E5C800DA1812 /* ' + name + ' */,\n\
      );\n\
    };\n\
/* End PBXProject section */\n\
\n\
/* Begin PBXResourcesBuildPhase section */\n\
    56D70DD71D90E5C800DA1812 /* Resources */ = {\n\
      isa = PBXResourcesBuildPhase;\n\
      buildActionMask = 2147483647;\n\
      files = (\n\
        56D70DE71D90E5C800DA1812 /* LaunchScreen.storyboard in Resources */,\n\
        56D70DE41D90E5C800DA1812 /* Assets.xcassets in Resources */,\n\
        56D70DEF1D90E8B900DA1812 /* Website in Resources */,\n\
        56D70DE21D90E5C800DA1812 /* Main.storyboard in Resources */,\n\
      );\n\
      runOnlyForDeploymentPostprocessing = 0;\n\
    };\n\
/* End PBXResourcesBuildPhase section */\n\
\n\
/* Begin PBXSourcesBuildPhase section */\n\
    56D70DD51D90E5C800DA1812 /* Sources */ = {\n\
      isa = PBXSourcesBuildPhase;\n\
      buildActionMask = 2147483647;\n\
      files = (\n\
        56D70DDF1D90E5C800DA1812 /* ViewController.swift in Sources */,\n\
        56D70DDD1D90E5C800DA1812 /* AppDelegate.swift in Sources */,\n\
      );\n\
      runOnlyForDeploymentPostprocessing = 0;\n\
    };\n\
/* End PBXSourcesBuildPhase section */\n\
\n\
/* Begin PBXVariantGroup section */\n\
    56D70DE01D90E5C800DA1812 /* Main.storyboard */ = {\n\
      isa = PBXVariantGroup;\n\
      children = (\n\
        56D70DE11D90E5C800DA1812 /* Base */,\n\
      );\n\
      name = Main.storyboard;\n\
      sourceTree = "<group>";\n\
    };\n\
    56D70DE51D90E5C800DA1812 /* LaunchScreen.storyboard */ = {\n\
      isa = PBXVariantGroup;\n\
      children = (\n\
        56D70DE61D90E5C800DA1812 /* Base */,\n\
      );\n\
      name = LaunchScreen.storyboard;\n\
      sourceTree = "<group>";\n\
    };\n\
/* End PBXVariantGroup section */\n\
\n\
/* Begin XCBuildConfiguration section */\n\
    56D70DE91D90E5C800DA1812 /* Debug */ = {\n\
      isa = XCBuildConfiguration;\n\
      buildSettings = {\n\
        ALWAYS_SEARCH_USER_PATHS = NO;\n\
        CLANG_ANALYZER_NONNULL = YES;\n\
        CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";\n\
        CLANG_CXX_LIBRARY = "libc++";\n\
        CLANG_ENABLE_MODULES = YES;\n\
        CLANG_ENABLE_OBJC_ARC = YES;\n\
        CLANG_WARN_BOOL_CONVERSION = YES;\n\
        CLANG_WARN_CONSTANT_CONVERSION = YES;\n\
        CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;\n\
        CLANG_WARN_DOCUMENTATION_COMMENTS = YES;\n\
        CLANG_WARN_EMPTY_BODY = YES;\n\
        CLANG_WARN_ENUM_CONVERSION = YES;\n\
        CLANG_WARN_INFINITE_RECURSION = YES;\n\
        CLANG_WARN_INT_CONVERSION = YES;\n\
        CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;\n\
        CLANG_WARN_SUSPICIOUS_MOVE = YES;\n\
        CLANG_WARN_SUSPICIOUS_MOVES = YES;\n\
        CLANG_WARN_UNREACHABLE_CODE = YES;\n\
        CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;\n\
        "CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";\n\
        COPY_PHASE_STRIP = NO;\n\
        DEBUG_INFORMATION_FORMAT = dwarf;\n\
        ENABLE_STRICT_OBJC_MSGSEND = YES;\n\
        ENABLE_TESTABILITY = YES;\n\
        GCC_C_LANGUAGE_STANDARD = gnu99;\n\
        GCC_DYNAMIC_NO_PIC = NO;\n\
        GCC_NO_COMMON_BLOCKS = YES;\n\
        GCC_OPTIMIZATION_LEVEL = 0;\n\
        GCC_PREPROCESSOR_DEFINITIONS = (\n\
          "DEBUG=1",\n\
          "$(inherited)",\n\
        );\n\
        GCC_WARN_64_TO_32_BIT_CONVERSION = YES;\n\
        GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;\n\
        GCC_WARN_UNDECLARED_SELECTOR = YES;\n\
        GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;\n\
        GCC_WARN_UNUSED_FUNCTION = YES;\n\
        GCC_WARN_UNUSED_VARIABLE = YES;\n\
        IPHONEOS_DEPLOYMENT_TARGET = 8.3;\n\
        MTL_ENABLE_DEBUG_INFO = YES;\n\
        ONLY_ACTIVE_ARCH = YES;\n\
        SDKROOT = iphoneos;\n\
        SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;\n\
        SWIFT_OPTIMIZATION_LEVEL = "-Onone";\n\
        TARGETED_DEVICE_FAMILY = "1,2";\n\
      };\n\
      name = Debug;\n\
    };\n\
    56D70DEA1D90E5C800DA1812 /* Release */ = {\n\
      isa = XCBuildConfiguration;\n\
      buildSettings = {\n\
        ALWAYS_SEARCH_USER_PATHS = NO;\n\
        CLANG_ANALYZER_NONNULL = YES;\n\
        CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";\n\
        CLANG_CXX_LIBRARY = "libc++";\n\
        CLANG_ENABLE_MODULES = YES;\n\
        CLANG_ENABLE_OBJC_ARC = YES;\n\
        CLANG_WARN_BOOL_CONVERSION = YES;\n\
        CLANG_WARN_CONSTANT_CONVERSION = YES;\n\
        CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;\n\
        CLANG_WARN_DOCUMENTATION_COMMENTS = YES;\n\
        CLANG_WARN_EMPTY_BODY = YES;\n\
        CLANG_WARN_ENUM_CONVERSION = YES;\n\
        CLANG_WARN_INFINITE_RECURSION = YES;\n\
        CLANG_WARN_INT_CONVERSION = YES;\n\
        CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;\n\
        CLANG_WARN_SUSPICIOUS_MOVE = YES;\n\
        CLANG_WARN_SUSPICIOUS_MOVES = YES;\n\
        CLANG_WARN_UNREACHABLE_CODE = YES;\n\
        CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;\n\
        "CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";\n\
        COPY_PHASE_STRIP = NO;\n\
        DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";\n\
        ENABLE_NS_ASSERTIONS = NO;\n\
        ENABLE_STRICT_OBJC_MSGSEND = YES;\n\
        GCC_C_LANGUAGE_STANDARD = gnu99;\n\
        GCC_NO_COMMON_BLOCKS = YES;\n\
        GCC_WARN_64_TO_32_BIT_CONVERSION = YES;\n\
        GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;\n\
        GCC_WARN_UNDECLARED_SELECTOR = YES;\n\
        GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;\n\
        GCC_WARN_UNUSED_FUNCTION = YES;\n\
        GCC_WARN_UNUSED_VARIABLE = YES;\n\
        IPHONEOS_DEPLOYMENT_TARGET = 8.3;\n\
        MTL_ENABLE_DEBUG_INFO = NO;\n\
        SDKROOT = iphoneos;\n\
        SWIFT_OPTIMIZATION_LEVEL = "-Owholemodule";\n\
        TARGETED_DEVICE_FAMILY = "1,2";\n\
        VALIDATE_PRODUCT = YES;\n\
      };\n\
      name = Release;\n\
    };\n\
    56D70DEC1D90E5C800DA1812 /* Debug */ = {\n\
      isa = XCBuildConfiguration;\n\
      buildSettings = {\n\
        ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;\n\
        INFOPLIST_FILE = ' + name + '/Info.plist;\n\
        IPHONEOS_DEPLOYMENT_TARGET = 8.4;\n\
        LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/Frameworks";\n\
        PRODUCT_BUNDLE_IDENTIFIER = asd.' + name + ';\n\
        PRODUCT_NAME = "$(TARGET_NAME)";\n\
        SWIFT_VERSION = 3.0;\n\
      };\n\
      name = Debug;\n\
    };\n\
    56D70DED1D90E5C800DA1812 /* Release */ = {\n\
      isa = XCBuildConfiguration;\n\
      buildSettings = {\n\
        ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;\n\
        INFOPLIST_FILE = ' + name + '/Info.plist;\n\
        IPHONEOS_DEPLOYMENT_TARGET = 8.4;\n\
        LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/Frameworks";\n\
        PRODUCT_BUNDLE_IDENTIFIER = asd.' + name + ';\n\
        PRODUCT_NAME = "$(TARGET_NAME)";\n\
        SWIFT_VERSION = 3.0;\n\
      };\n\
      name = Release;\n\
    };\n\
/* End XCBuildConfiguration section */\n\
\n\
/* Begin XCConfigurationList section */\n\
    56D70DD41D90E5C800DA1812 /* Build configuration list for PBXProject "' + name + '" */ = {\n\
      isa = XCConfigurationList;\n\
      buildConfigurations = (\n\
        56D70DE91D90E5C800DA1812 /* Debug */,\n\
        56D70DEA1D90E5C800DA1812 /* Release */,\n\
      );\n\
      defaultConfigurationIsVisible = 0;\n\
      defaultConfigurationName = Release;\n\
    };\n\
    56D70DEB1D90E5C800DA1812 /* Build configuration list for PBXNativeTarget "' + name + '" */ = {\n\
      isa = XCConfigurationList;\n\
      buildConfigurations = (\n\
        56D70DEC1D90E5C800DA1812 /* Debug */,\n\
        56D70DED1D90E5C800DA1812 /* Release */,\n\
      );\n\
      defaultConfigurationIsVisible = 0;\n\
      defaultConfigurationName = Release;\n\
    };\n\
/* End XCConfigurationList section */\n\
  };\n\
  rootObject = 56D70DD11D90E5C800DA1812 /* Project object */;\n\
}';

exports.html = '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
  <meta charset="utf-8">\n\
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n\
  <meta name="apple-mobile-web-app-capable" content="yes">\n\
  <meta name="mobile-web-app-capable" content="yes">\n\
  <meta name="msapplication-tap-highlight" content="no">\n\
  <title>ChocolateChip-UI</title>\n\
  <style>\n\
    html, body {\n\
      padding: 0;\n\
      margin: 0;\n\
      position: absolute;\n\
      top: 0;\n\
      right: 0;\n\
      bottom: 0;\n\
      left: 0;\n\
      overflow: hidden;\n\
    }\n\
    body {\n\
      background-color: #efeff4;\n\
      -webkit-font-smoothing: antialiased;\n\
      -webkit-user-select: none;\n\
      -webkit-tap-highlight-color: transparent;\n\
      font-size: 1em;\n\
      line-height: 1.5;\n\
    }\n\
    article {\n\
      position: absolute;\n\
      top: 0;\n\
      right: 0;\n\
      bottom: 0;\n\
      left: 0;\n\
      -webkit-transition: all 0.15s;\n\
      transition: all 0.15s;\n\
      overflow-x: hidden;\n\
      overflow-y: auto;\n\
      -webkit-overflow-scrolling: touch;\n\
      display: flex;\n\
      display: -webkit-flex;\n\
      display: -webkit-box;\n\
      -webkit-box-orient: vertical;\n\
      -webkit-flex-direction: column;\n\
      flex-direction: column;\n\
      -webkit-justify-content: center;\n\
      justify-content: center;\n\
      -webkit-box-align: start;\n\
      -webkit-align-items: flex-start;\n\
      align-items: flex-start;\n\
    }\n\
    article > section{\n\
      padding: 20px 10px 10px;\n\
      padding-bottom: 100px;\n\
      -webkit-box-flex: 1;\n\
      -webkit-flex: 1;\n\
      flex: 1;\n\
      position: absolute;\n\
      top: 45px;\n\
      left: 0;\n\
      width: 100%;\n\
      min-height: 100% !important;\n\
      background-color: #fff;\n\
    }\n\
    nav {\n\
      background-color: #f7f7f7;\n\
      border-bottom: solid 1px #a7a7aa;\n\
      height: 45px;\n\
      -webkit-box-sizing: border-box;\n\
      box-sizing: border-box;\n\
      text-align: center;\n\
      position: absolute;\n\
      z-index: 100000;\n\
      top: 0;\n\
      left: 0;\n\
      right: 0;\n\
      padding: 0 15px;\n\
      vertical-align: middle;\n\
    }\n\
    nav > h1 {\n\
      text-align: center;\n\
      font: normal 12pt/14pt HelveticaNeue, Sans-serif;\n\
      color: #000000;\n\
      -webkit-flex: 1;\n\
      flex: 1;\n\
    }\n\
  </style>\n\
</head>\n\
<body>\n\
  <nav>\n\
    <h1>' + name + '</h1>\n\
  </nav>\n\
  <article>\n\
    <section>\n\
      <h2>Replace the contents of this folder with the files and other assets for your ChocolateChip-UI Web app.</h2>\n\
    </section>\n\
  </article>\n\
</body>\n\
</html>';

exports.testsPlist = '<?xml version="1.0" encoding="UTF-8"?>\n\
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n\
<plist version="1.0">\n\
<dict>\n\
  <key>CFBundleDevelopmentRegion</key>\n\
  <string>en</string>\n\
  <key>CFBundleExecutable</key>\n\
  <string>$(EXECUTABLE_NAME)</string>\n\
  <key>CFBundleIdentifier</key>\n\
  <string>' + name + '.$(PRODUCT_NAME:rfc1034identifier)</string>\n\
  <key>CFBundleInfoDictionaryVersion</key>\n\
  <string>6.0</string>\n\
  <key>CFBundleName</key>\n\
  <string>$(PRODUCT_NAME)</string>\n\
  <key>CFBundlePackageType</key>\n\
  <string>BNDL</string>\n\
  <key>CFBundleShortVersionString</key>\n\
  <string>1.0</string>\n\
  <key>CFBundleSignature</key>\n\
  <string>????</string>\n\
  <key>CFBundleVersion</key>\n\
  <string>1</string>\n\
</dict>\n\
</plist>';

exports.testsSwift = '//\n\
//  ' + name.toLowerCase() + 'Tests.swift\n\
//  ' + name.toLowerCase() + 'Tests\n\
//\n\
//  Created by ' + user + ' on 2/15/16.\n\
//  Copyright (c) 2016 ' + user + '. All rights reserved.\n\
//\n\
\n\
import UIKit\n\
import XCTest\n\
\n\
class ' + name + 'Tests: XCTestCase {\n\
    \n\
    override func setUp() {\n\
        super.setUp()\n\
        // Put setup code here. This method is called before the invocation of each test method in the class.\n\
    }\n\
  \n\
    override func tearDown() {\n\
        // Put teardown code here. This method is called after the invocation of each test method in the class.\n\
        super.tearDown()\n\
    }\n\
    \n\
    func testExample() {\n\
        // This is an example of a functional test case.\n\
        XCTAssert(true, "Pass")\n\
    }\n\
    \n\
    func testPerformanceExample() {\n\
        // This is an example of a performance test case.\n\
        self.measureBlock() {\n\
            // Put the code you want to measure the time of here.\n\
        }\n\
    }\n\
    \n\
}';