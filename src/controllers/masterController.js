const {
  getAllData, getDataByDivisi, saveData, updateData, deleteData, getFile,
} = require('../services/masterServices');
const Response = require('../services/responseService');

async function getMasterFile(req, h) {
  try {
    const divisi = req.params.divisi ?? 'all';
    const data = divisi === 'all' ? await getAllData() : await getDataByDivisi(divisi);
    return h.response(Response.dataTable({ data }))
      .code(Response.successCode);
  } catch (err) {
    const message = err;
    return h.response(Response.fail(message))
      .code(Response.failCode);
  }
}

async function saveMasterFile(req, h) {
  try {
    const data = req.payload;
    const saveToDb = saveData(data);
    const result = await saveToDb;
    if (result.message !== undefined) {
      return h.response(Response.fail(result.message)).code(Response.badRequestCode);
    }
    return h.response(Response.success(result.acknowledged)).code(Response.successCode);
  } catch (err) {
    const message = err;
    console.log(err);
    return h.response(Response.fail(message)).code(Response.failCode);
  }
}

async function updateMasterFile(req, h) {
  try {
    const data = req.payload;
    const updateToDb = updateData(data);
    const message = (await updateToDb).matchedCount;
    return h.response(Response.success(message)).code(Response.successCode);
  } catch (err) {
    const message = err;
    return h.response(Response.fail(message)).code(Response.failCode);
  }
}

async function deleteMasterFile(req, h) {
  try {
    const id = req.params;
    const deleteToDb = deleteData(id);
    const message = (await deleteToDb).deletedCount;
    return h.response(Response.success(message)).code(Response.successCode);
  } catch (err) {
    const message = err;
    return h.response(Response.fail(message)).code(Response.failCode);
  }
}

async function getDataFile(req, h) {
  try {
    const message = await getFile();
    // console.log(message);
    // return h.response(Response.success(message)).code(Response.successCode);
    const buff = message[0].fileData.buffer.toString('base64');
    const buf = Buffer.from(buff, 'base64');
    // console.log(buff);
    // return 1;
    return h.response(buf).type('application/pdf').bytes(buf.length).code(200);
  } catch (err) {
    const message = err;
    return h.response(Response.fail(message)).code(Response.failCode);
  }
}

module.exports = {
  getMasterFile,
  saveMasterFile,
  updateMasterFile,
  deleteMasterFile,
  getDataFile,
};
