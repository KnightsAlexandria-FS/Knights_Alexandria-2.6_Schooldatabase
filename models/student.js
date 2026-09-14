const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Student full name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: [5, 'Student age must be at least 5']
  },
  gpa: {
    type: Number,
    required: true,
    min: 0,
    max: 4.0
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: [true, 'Associated school ID is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);