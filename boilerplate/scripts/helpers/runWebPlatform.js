const runSequence = require('run-sequence');
const shell = require('shelljs');

function runWebPlatform(callback) {
  function startServer() {
    shell.exec(global.settings.production
      ? `npm run start:production:${global.settings.platform}`
      : `npm run start:packager:${global.settings.platform}`,
      {
        async: true, // async this so it doesn't block task completion
      }
    );
    callback();
  }
  if (global.settings.production) {
    runSequence('build', startServer);
  }
  else {
    startServer();
  }
}

module.exports = runWebPlatform;
