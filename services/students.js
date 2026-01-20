const Student = require('../models/students');

const createStudent = async (studentData) => {
    const student = new Student(studentData);
    return await student.save();
};

const getAllStudents = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const students = await Student.find().skip(skip).limit(limit);
    const total = await Student.countDocuments();

    return {
        students,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
};

const getStudentById = async (id) => {
    return await Student.findById(id);
};

const updateStudentById = async (id, studentData) => {
    return await Student.findByIdAndUpdate(id, studentData, { new: true });
};

const deleteStudentById = async (id) => {
    return await Student.findByIdAndDelete(id);
};

const getStats = async () => {
    const total = await Student.countDocuments();
    return { total };
};

const getCourses = async () => {
    const students = await Student.find();
    return students.map(s => s.course);
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