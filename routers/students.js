const express = require('express');
const studentsController = require('../controllers/students');
const schemas = require('../schemas');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', validate(schemas.students.createStudentSchema), studentsController.createStudent);
router.get('/', validate(schemas.students.getAllStudentsSchema), studentsController.getAllStudents);
router.get('/stats', studentsController.getStats);
router.get('/courses', studentsController.getCourses);
router.get('/:id', studentsController.getStudentById);
router.put('/:id', validate(schemas.students.updateStudentSchema), studentsController.updateStudentById);
router.delete('/:id', studentsController.deleteStudentById);

module.exports = router;