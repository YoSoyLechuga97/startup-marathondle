const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('marathondle');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// TTest connection and exit if there is a failure
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  function getUser(playerTag) {
    return userCollection.findOne({ playerTag: playerTag });
  }

  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }

  //Create a user
  async function createUser(playerTag, password) {
    //Hash password before putting it in the db
    const passwordHash = await bcrypt.hash(password, 10);

    //Create user json
    const user = {
        playerTag: playerTag,
        password: passwordHash,
        token: uuid.v4(),
    };
    //Place user json into db
    await userCollection.insertOne(user);

    return user;
  }

  function addScore(score) {
    scoreCollection.insertOne(score);
  }

  //Return highscores
  function getHighScores() {
    //Search scores and return all that are greater than 0
    const query = { score: { $gte: 0 } };

    const options = {
        sort: {score: -1}, //Descending order
        limit: 5, //Only the top 5 scores
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
  }

  module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addScore,
    getHighScores,
  };