const { defineConfig } = require('cypress');
const mochawesomeReportGenerator = require('mochawesome-report-generator');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on('after:run', (results) => {
        // Define the report directory and file paths
        const reportDir = path.join(__dirname, 'cypress', 'reports', 'mochawesome-report');
        const reportJson = path.join(reportDir, 'report.json');

        if (fs.existsSync(reportJson)) {
          mochawesomeReportGenerator.create(reportJson, { reportDir });
        } else {
          console.error('Mochawesome JSON report not found.');
        }
      });
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      reportFilename: 'report',
      overwrite: false,
      html: true,
      json: true
    },
    browser: 'chrome'
  },
});
