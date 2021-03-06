const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const route = require('./routes/index')
const cors = require('cors');
const cookieSession = require('cookie-session')
const twilioRoutes = require("./routes/twilioRoutes");
const app = express();
const port = process.env.PORT || 8080;
const twilioSubscribe = require("./apis/twilioSubscribe")
const twilioCreate = require("./apis/twilioCreate")

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true}));
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Set-Cookie, Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))


app.use('/', route)
app.use('/twilio',twilioRoutes())


app.listen(port, () => console.log(`Listening on port ${port}`));
