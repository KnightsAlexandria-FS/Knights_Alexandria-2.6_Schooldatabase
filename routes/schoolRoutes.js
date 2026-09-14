const express = require('express');
const router = express.Router();
const {
  getSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool
} = require('../controllers/schoolController');

router.route('/')
  .get(getSchools)
  .post(createSchool);

router.route('/:id')
  .get(getSchoolById)
  .put(updateSchool)
  .delete(deleteSchool);

module.exports = router;