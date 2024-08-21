// plugins/index.js

module.exports = (on, config) => {
  // Implement any custom tasks or plugins here
  
  // Example of handling Mochawesome report generation
  on('after:run', (results) => {
    const mochawesomeReportGenerator = require('mochawesome-report-generator');
    const fs = require('fs');
    const path = require('path');

    // Path to the Mochawesome JSON report
    const reportDir = path.join(config.reporterOptions.reportDir);
    const reportJson = path.join(reportDir, 'report.json');

    if (fs.existsSync(reportJson)) {
      mochawesomeReportGenerator.create(reportJson, { reportDir });
    } else {
      console.error('Mochawesome JSON report not found.');
    }
  });
};
