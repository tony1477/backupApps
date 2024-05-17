const {
  getMasterFile, saveMasterFile, updateMasterFile, deleteMasterFile, getDataFile,
} = require('../controllers/masterController');

const routes = [
  /**
   * Routes Master File
   */
  {
    method: 'GET',
    path: '/files',
    handler: async () => 'files',
  },
  {
    method: 'GET',
    path: '/',
    handler: async () => 'Hii. I see you!',
  },
  {
    method: 'GET',
    path: '/master_file/{divisi?}',
    handler: getMasterFile,
  },
  {
    method: 'POST',
    path: '/master_file',
    handler: saveMasterFile,
  },
  {
    method: 'PATCH',
    path: '/master_file',
    handler: updateMasterFile,
  },
  {
    method: 'DELETE',
    path: '/master_file/{id}',
    handler: deleteMasterFile,
  },
  /**
   * Routes Trans File
   */
  {
    method: 'GET',
    path: '/trans_files/show/{filename}',
    handler: (req, h) => {
      const { filename } = req.params;
      return h.file(`uploads/${filename}`, {
        filename: 'test-file.pdf',
        mode: 'inline',
      });
    },
  },
  {
    method: 'GET',
    path: '/trans_files/show',
    handler: getDataFile,
  },
];

module.exports = routes;
