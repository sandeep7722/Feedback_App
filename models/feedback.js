// models/feedback.js
//completed
const mongoose = require('mongoose');

const questionRatingSchema = new mongoose.Schema({
    question: { type: String, required: true},
    question_rating: { type: Number, required: true}, 

});

const demoRatingSchema = new mongoose.Schema({
  demo_name: { type: String, required: true},
  demo_rating: { type: Number, required: true },
  question_feedback: [questionRatingSchema],
  // Add other properties as needed
});

const feedbackSchema = new mongoose.Schema({
  visit_date: { type: Date, required: true },
  client_name: { type: String, required: true},
  overall_rating: { type: Number, required: true },
  demo_feedback: [demoRatingSchema],
  visit_comment: { type: String}
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
