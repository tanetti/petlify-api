const express = require('express');
const schema = require('../schemas/notices');
const authHeaderValidation = require('../middlewares/authHeaderValidation');

const {
  noticeIdValidation,
  validation,
  upload,
} = require('../middlewares/notices');
const {
  getCategory,
  getById,
  getOwn,
  addNotice,
  deleteNotice,
} = require('../controllers/notices');

const router = express.Router();

router.get('/:categoryName', getCategory);
router.get('/:noticeId', noticeIdValidation, getById);
router.post(
  '/',
  authHeaderValidation,
  validation(schema.addSchema),
  upload.single('avatar'),
  addNotice
);
router.get('/', authHeaderValidation, getOwn);
router.delete(
  '/:noticeId',
  authHeaderValidation,
  noticeIdValidation,
  deleteNotice
); //

module.exports = router;