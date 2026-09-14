const Student = require('../models/student');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('school', 'name establishedYear');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('school');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID format' });
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
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student removed' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};