const studentService = require('../services/students');
const APIError = require('../utils/APIError');

const createStudent = async (req, res, next) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (error) {
        next(error);
    }
};

const getAllStudents = async (req, res, next) => {
    try {
        const result = await studentService.getAllStudents(req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getStudentById = async (req, res, next) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student) {
            throw new APIError('Student not found', 404);
        }
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

const updateStudentById = async (req, res, next) => {
    try {
        const student = await studentService.updateStudentById(req.params.id, req.body);
        if (!student) {
            throw new APIError('Student not found', 404);
        }
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

const deleteStudentById = async (req, res, next) => {
    try {
        const student = await studentService.deleteStudentById(req.params.id);
        if (!student) {
            throw new APIError('Student not found', 404);
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const getStats = async (req, res, next) => {
    try {
        const stats = await studentService.getStats();
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};

const getCourses = async (req, res, next) => {
    try {
        const courses = await studentService.getCourses();
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    getStats,
    getCourses
};