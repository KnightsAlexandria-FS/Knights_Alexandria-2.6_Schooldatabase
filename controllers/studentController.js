const messages = require('../utils/messages');
const Student = require('../models/student');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select('-__v')
      .populate('school');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select('-__v')
      .populate('school');

    if (!student) {
      return res.status(404).json({ message: messages.studentNotFound });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { fullName, age, gpa, school } = req.body;
    const newStudent = await Student.create({ fullName, age, gpa, school });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {

    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      return res.status(404).json({ message: messages.studentNotFound });
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .select('-__v')
      .populate('school');

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 exports.deleteStudent = async (req, res) => {
  try { 
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      return res.status(404).json({ message: messages.studentNotFound });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: messages.studentRemoved });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};