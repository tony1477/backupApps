const { MongoClient } = require('mongodb');

const DBconfig = require('./config/config');

const { dbURL: uri } = DBconfig;

const client = new MongoClient(uri);

module.exports = { client };
