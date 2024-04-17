const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

//Use cookie parser middleware for authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

//Trust headers forwarded from proxy to determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Create token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'This Username is Already Being Used' });
  } else {
    const user = await DB.createUser(req.body.playerTag, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

//Get token for user logging in
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.playerTag);
  if (user) { //If username is found
    if (await bcrypt.compare(req.body.password, user.password)) { //If password entered matches password in db
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Incorrect Password or Username' });
});

//Delete token if stored in cookie and user logs out
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//Return user information
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.playerTag);
  if (user) { //If the user is found
    const token = req?.cookies.token;
    res.send({ playerTag: user.playerTag, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'User Unknown' });
});

//Verify user is allowed to access endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {//user is found and allowed to continue
    next();
  } else {
    res.status(401).send({ msg: 'Please Login to Continue' });
  }
});

//Obtain scores
secureApiRouter.get('/scores', async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

//Submit new score
secureApiRouter.post('/score', async (req, res) => {
  const score = { ...req.body, ip: req.ip }; //Make it a json
  await DB.addScore(score); //Add score to db
  const scores = await DB.getHighScores(); //Return newest list of scores
  res.send(scores);
});

//Error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message : err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

//setAuthCookie in HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}
  
app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});