const DBconfig = {
  dbURL: 'mongodb://127.0.0.1:27017',
  dbNAME: 'backupSystem',
  collection: {
    master: 'masterFile',
    report: 'reportFIle',
    trans: 'trans_file',
  },
};

module.exports = DBconfig;
