const p = require("path");
const chocolatechipui_path = p.join(__dirname, 'node_modules', 'chocolatechipui');
const warnNoArgs = require('./warnNoArgs');
const createJSProject = (...args) => {
  const results = {};

  /**
   * Check if a name, type or os were passed
   */
  for (value of args) {
    if (/name/img.test(value)) {
      results.name = value.split('=')[1];
    } else if (/type/img.test(value)) {
      results.type = value.split('=')[1];
    } else if (/^o=|^os=/img.test(value)) {
      results.os = value.split('=')[1];
    }
  }

  /**
   * Test for project types
   */
  if (results.type === 'navigation') {
    results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'for-desktop', 'chui-navigation', 'index.html').split('chui/test/stubs/')[1];
    // console.log(results.navigationPath);
    
  } else if (results.type === 'slideout') {
    results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'for-desktop', 'chui-slideout', 'index.html').split('chui/test/stubs/')[1];
  } else if (results.type === 'tabbar') {
    results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'for-desktop', 'chui-tabbar', 'index.html').split('chui/test/stubs/')[1];
  } else {
    results.type = 'basic'
    results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'for-desktop', 'chui-basic', 'index.html').split('chui/test/stubs/')[1];
  }

  /**
   * Test for OS type
   */
   if (results.os === 'android') {
      results.theme = 'android';
      results.themePath = p.join(chocolatechipui_path, 'dist', 'css', 'chui-android.min.css').split('chui/test/stubs/')[1];
   } else {
    results.os = 'ios';
    results.themePath = p.join(chocolatechipui_path, 'dist', 'css', 'chui-ios.min.css').split('chui/test/stubs/')[1];
   }

  /**
   * Test for project name
   */
   if (!results.name) {
    results.name = false;
    results.warning = warnNoArgs();
   }

  /**
   * Test for types
   */
  if (args.indexOf('typings') > -1) {
    results.typings = true;
    results.typingsPath = p.join(chocolatechipui_path, 'typings').split('chui/test/stubs/')[1];
  } else {
    results.typings = false;
  }

  /**
   * Test for JSPM
   */
  if (args.indexOf('jspm') > -1) {
    results.jspm = true;
    results.jspmConfigPath = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'config.js').split('chui/test/stubs/')[1];
    results.jspmGulpfilePath = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'gulpfile.js').split('chui/test/stubs/')[1];
    results.jspmPackagePath = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'package.json').split('chui/test/stubs/')[1];

    /**
     * Test for project types
     */

    if (results.type === 'navigation') {
      results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'navigation', 'index.html').split('chui/test/stubs/')[1];
    } else if (results.type === 'slideout') {
      results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'slideout', 'index.html').split('chui/test/stubs/')[1];
    } else if (results.type === 'tabbar') {
      results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'tabbar', 'index.html').split('chui/test/stubs/')[1];
    } else {
      results.type = 'basic'
      results.htmlPath = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'basic', 'index.html').split('chui/test/stubs/')[1];
    }

    /**
     * Test for custom project
     */
    if (args.indexOf('custom') > -1) {
      results.minChui = p.join(chocolatechipui_path, 'cli-resources', 'jspm', 'dist').split('chui/test/stubs/')[1];
      results.importableModules = p.join(chocolatechipui_path, 'cli-resources', 'src').split('chui/test/stubs/')[1];
    }
    
  } else {
    results.jspm = false;
  }


  return results;
};

module.exports = createJSProject;