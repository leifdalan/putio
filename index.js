const express = require('express');
const nodemailer = require('nodemailer');
const config = process.env.NODE_ENV === 'production'
  ? process.env
  : require('./local');
const app = express();

const {MAILGUN_USER }= config;
const {MAILGUN_PASS} = config;

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.post('/complete', function (req, res) {
  // console.error('req', req);
  var transporter
    , message;

  transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: MAILGUN_USER,
      pass: MAILGUN_PASS
    }
  });
  message = {
    from: 'YourServer ',
    to: 'leifdalan@gmail.com', // comma separated list
    subject: 'Subject Line',
    text: 'Text contents.',
    html: '<b>html contents.</b>'
  };
  transporter.sendMail(message, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.send('cool.')
      console.log('Sent: ' + info.response);
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
