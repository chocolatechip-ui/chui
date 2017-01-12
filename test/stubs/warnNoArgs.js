const warnNoArgs = (...args) => {
  if (!args || !args.length) {
    const warning = `
ATTENTION: Arguments missing.
To output the examples, use: chui -e.
To output the reference apps, use: chui -r.
To create a project for an app, use: chui -n myApp.
(Replace myApp with the name for your app.)';
To create a project with JSPM, use: chui -n myApp -j.
To create a project with Box, use: chui -n myApp -b.
To create a project with Box and JSPM, use: chui -n myApp -j -b.
To create a project type, use the flag -t: chui -n myApp -t navigation or chui -n myApp -t slideout or chui -n myApp -t tabbar.
To create a project for a specific os, use the -o flag: chui -n myApp -o android or chui -n myApp -o ios or chui -n myApp -o windows.`;
    return warning;

  } else {
    return args;
  }
};

module.exports = warnNoArgs;