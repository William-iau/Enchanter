const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    service: 'outlook', // or any other email service
    auth: {
      user: 'william@iauconsultingservices.com',
      pass: 'Springboard88#'
    }
  });

  let info = await transporter.sendMail({
    from: '"Cypress Test Report" <william@iauconsultingservices.com>',
    to: 'william@iauconsultingservices.com,yoga@iauconsultingservices.com',
    subject: 'Cypress Test Report',
    text: 'Please find the attached test report.',
    attachments: [
      {
        filename: 'report.html',
        path: './cypress/reports/mochawesome-report/mochawesome.html'
      }
    ]
  });

  console.log('Message sent: %s', info.messageId);
}

sendEmail().catch(console.error);
