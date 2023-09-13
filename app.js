require('dotenv').config()
const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const twilio = require('twilio');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/tokens', async (req, res, next) => {
  const accessToken = new twilio.jwt.AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    {
      identity: Math.random().toString(36).substring(2)
    }
  );

  grant = new twilio.jwt.AccessToken.SyncGrant({
    serviceSid: process.env.TWILIO_SYNC_SERVICE_SID
  });
  accessToken.addGrant(grant);
  res.send({
    token: accessToken.toJwt()
  });
});

app.get('/', (req, res) => res.json({ success: true}))

const port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('web server listening on port', port)
})