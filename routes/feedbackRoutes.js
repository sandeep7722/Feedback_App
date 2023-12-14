// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Create feedback(done)
router.post('/createFeedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const savedFeedback = await feedback.save();
    res.json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all feedback(done)
router.get('/feedbackList', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Read feedback for a specific demo name
// router.get('/demo/:demoName', async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find({ 'demo_feedback.demo_name': req.params.demoName });
//     res.json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// Read demo feedback using visit id and demo id(done)
router.get('/visit/:visitId/demo/:demoId', async (req, res) => {
    try {
      const feedback = await Feedback.findOne({
        _id: req.params.visitId,
        'demo_feedback._id': req.params.demoId
      });
      
      if (!feedback) {
        return res.status(404).json({ message: 'Demo not found in the visit' });
      }
      
      // Extract the specific demo from the feedback
      const specificDemo = feedback.demo_feedback.find(demo => demo._id.toString() === req.params.demoId);
      
      if (!specificDemo) {
        return res.status(404).json({ message: 'Specific demo not found in the visit' });
      }
  
      res.json(specificDemo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  

// Read one feedback(done)
router.get('/:id', getFeedback, (req, res) => {
  res.json(res.feedback);
});

// Update feedback
// router.put('/:id', getFeedback, async (req, res) => {
//   try {
//     Object.assign(res.feedback, req.body);
//     const updatedFeedback = await res.feedback.save();
//     res.json(updatedFeedback);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Delete feedback(done)
router.delete('/:id', getFeedback, async (req, res) => {
  try {
    await res.feedback.deleteOne();
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getFeedback(req, res, next) {
  let feedback;
  try {
    feedback = await Feedback.findById(req.params.id);
    if (feedback == null) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.feedback = feedback;
  next();
}

module.exports = router;
