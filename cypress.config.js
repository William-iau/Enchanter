const { defineConfig } = require('cypress');
const mochawesomeReportGenerator = require('mochawesome-report-generator');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Handle Mochawesome report generation after tests are run
      on('after:run', () => {
        const reportJson = path.join('cypress/reports/mochawesome-report', 'report.json');
        if (fs.existsSync(reportJson)) {
          mochawesomeReportGenerator.create(reportJson, {
            reportDir: 'cypress/reports/mochawesome-report',
            reportFilename: 'report'
          });
        }
      });
    },
    baseUrl: 'https://mydev.igenchat.co',
    experimentalSessionAndOrigin: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      reportFilename: 'report',
      overwrite: false,
      html: true,
      json: true
    },
    browser: 'chrome',
    // Use headless mode
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720
  },
});
