const { ObjectId } = require('mongodb');
const { client } = require('../db');

const DBconfig = require('../config/config');
const { fail } = require('../services/responseService');

const { dbNAME } = DBconfig;

async function get(params, filter) {
  let connect;
  try {
    const { collectionName, projection } = params;

    connect = await client.connect();
    const db = client.db(dbNAME);
    const collection = db.collection(collectionName);
    const data = await collection
      .find(filter)
      .project(projection)
      .collation({ locale: 'en', strength: 2 })
      .toArray();

    return data;
  } catch (err) {
    throw new Error(`Error While get Data :${err}`);
  } finally {
    if (connect) connect.close();
  }
}

async function save(params, data) {
  let connect;
  try {
    const { collectionName } = params;
    connect = await client.connect();
    const db = client.db(dbNAME);
    const collection = db.collection(collectionName);
    const insert = await collection.insertOne(data);
    return insert;
  } catch (err) {
    if (err.code === 11000) {
      return fail('Duplicate Data');
    }
    throw new Error(`Error while save data : ${err}`);
  } finally {
    if (connect) connect.close();
  }
}

async function update(params, data) {
  let connect;
  try {
    const { collectionName, id } = params;
    connect = await client.connect();
    const db = client.db(dbNAME);
    const collection = db.collection(collectionName);
    const updated = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    return updated;
  } catch (err) {
    throw new Error(`Error while update data : ${err}`);
  } finally {
    if (connect) connect.close();
  }
}

async function purge(params) {
  let connect;
  try {
    const { collectionName, id } = params;
    connect = await client.connect();
    const db = client.db(dbNAME);
    const collection = db.collection(collectionName);
    const isdelete = await collection.deleteOne({ _id: new ObjectId(id) });
    return isdelete;
  } catch (err) {
    throw new Error(`Errow while delete data : ${err}`);
  } finally {
    if (connect) connect.close();
  }
}

async function repoFile(params) {
  let connect;
  try {
    const { collectionName } = params;
    connect = await client.connect();
    const db = client.db(dbNAME);
    const collection = db.collection(collectionName);
    const getfile = await collection.find({}).toArray();
    return getfile;
  } catch (err) {
    throw new Error(`Error while get File : ${err}`);
  } finally {
    if (connect) connect.close();
  }
}

module.exports = {
  get,
  save,
  update,
  purge,
  repoFile,
};
