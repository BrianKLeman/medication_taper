module.exports = function (config) {
  config.set({
    // ... existing config ...
    reporters: ['progress', 'junit'],  // 👈 add junit
    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },
    browsers: ['ChromeHeadless'],  // 👈 make sure this is set for CI
    singleRun: true                // 👈 exit after tests finish
  });
};