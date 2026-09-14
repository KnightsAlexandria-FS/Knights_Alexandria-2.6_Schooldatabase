const School = require('../models/school');

exports.getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

exports.createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.status(200).json({ message: 'School removed' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};
const createStudent = async (req, res) => {
  try {
    const { fullName, age, gpa, school } = req.body;
    const newStudent = await Student.create({ fullName, age, gpa, school });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};