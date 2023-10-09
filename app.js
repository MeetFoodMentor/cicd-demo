const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/production');
const { initAWSCognito } = require('./util/aws-cognito');
const expressValidator = require('express-validator');
const rateLimit = require('express-rate-limit');

mongoose.set('debug', true);

const app = express();
const tracer = require('dd-trace').init();
initAWSCognito();

const MAX_RATE = 2000;

app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour duration in milliseconds
    max: MAX_RATE,
    message: `You exceeded ${MAX_RATE} requests in per hour limit!`,
    headers: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Auth-Token'
  );
  res.setHeader('Access-Control-Allow-Max-Age', '86400');
  next();
});

//Product routes
const videoRoutes = require('./routes/videopost');
const userRoutes = require('./routes/user');

//Middleware
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

//Add routers
app.use('/api/v1/video', videoRoutes);
app.use('/api/v1/user', userRoutes);
app.get('/', function (req, res) {
  res.status(200).json({
    message: 'Successfully access MeetFood API.',
  });
});

//Database
const port = process.env.PORT || 3000;
mongoose
  .connect(config.mongodbConnectURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'seefood-database',
  })
  .then(() => {
    console.log('Database Connection is ready...');
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
exports.db = db;

module.exports = app;
