// models/demo.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String },
  // Add other properties as needed
});

const demoSchema = new mongoose.Schema({
  demoname: { type: String, required: true, unique: true },
  description: { type: String},
  questions: [questionSchema],
});

const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
