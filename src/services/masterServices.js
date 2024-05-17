// eslint-disable-next-line import/no-extraneous-dependencies
const { DateTime } = require('luxon');

const DBconfig = require('../config/config');

const { collection } = DBconfig;
const {
  get, save, update, purge, repoFile,
} = require('../repositories/masterRepository');

const getAllData = async () => {
  const params = {
    collectionName: collection.master,
    projection: { divisi: 1, updatedby: 1, updated_at: 1 },
  };
  const filter = {};
  const data = await get(params, filter);
  const totalRows = data.length;
  return { rowData: data, totalRows };
};

const getDataByDivisi = async (divisi) => {
  const params = {
    collectionName: collection.master,
    projection: {},
  };
  const filter = { divisi };
  const data = await get(params, filter);
  const totalRows = data.length;
  return { rowData: data, totalRows };
};

const saveData = async (data) => {
  const Files = data.File.split(';');
  const params = {
    collectionName: collection.master,
  };
  const { divisi, createdby, updatedby } = data;
  const currentDate = DateTime.now();
  const document = {
    divisi, createdby, updatedby, created_at: currentDate, updated_at: currentDate, File: Files,
  };
  const result = await save(params, document);
  // console.log(result);
  // if (typeof (result) !== 'InsertOneResult') throw new Error(result.message);
  return result;
};

const updateData = async (data) => {
  const Files = data.File.split(';');
  const params = {
    collectionName: collection.master,
    id: data.id,
  };
  const { divisi, updatedby } = data;
  const currentDate = DateTime.now();
  const document = {
    divisi, updatedby, updated_at: currentDate, File: Files,
  };
  const result = await update(params, document);
  return result;
};

const deleteData = async (id) => {
  const params = {
    collectionName: collection.master,
    id,
  };
  const result = await purge(params);
  return result;
};

const getFile = async () => {
  const params = {
    collectionName: collection.trans,
  };
  const result = await repoFile(params);
  return result;
};

module.exports = {
  getAllData,
  getDataByDivisi,
  saveData,
  updateData,
  deleteData,
  getFile,
};
