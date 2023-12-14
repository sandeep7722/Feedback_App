// models/visit.js
//completed
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  // Add other properties as needed
});

const visitorDetailsSchema = new mongoose.Schema({
  visitor_name: { type: String, required: true },
  visitor_designation: { type: String},
});

const demoDetailsSchema = new mongoose.Schema({
  demo_name: { type: String, required: true },
  demo_description: { type: String},
  demo_questions: [questionSchema],
});

const visitSchema = new mongoose.Schema({
  visit_date: { type: Date, required: true },
  client_name: { type: String, required: true },
  visitors_details: [visitorDetailsSchema],
  demo_details: [demoDetailsSchema],
});



const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
