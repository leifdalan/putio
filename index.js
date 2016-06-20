const express = require('express');
const nodemailer = require('nodemailer');
const config = process.env.NODE_ENV === 'production'
  ? process.env
  : require('./local');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const {
  MAILGUN_USER,
  MAILGUN_PASS,
  PORT,
} = config;

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.post('/complete', function (req, res) {
  console.error('req.body', req.body);
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
    subject: `${req.body.name} Completed!`,
    text: 'Text contents.',
    html: `
      <h1>${req.body.name} Completed!</h1>
      <p>It took this many seconds: ${req.body.seconds_seeding}</p>
    `
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

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
