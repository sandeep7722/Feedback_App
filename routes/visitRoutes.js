// routes/visitRoutes.js
//Completed
const express = require('express');
const router = express.Router();
const Visit = require('../models/visit');

// Create visit
router.post('/createVisit', async (req, res) => {
  try {
    const { visit_date, client_name } = req.body;

    // Check if a visit with the same visit_date and client_name already exists
    const existingVisit = await Visit.findOne({ visit_date, client_name });

    if (existingVisit) {
      // If a visit with the same visit_date and client_name exists, return an error response
      return res.status(409).json({ message: 'Visit with the same date and client name already exists' });
    }

    // If no existing visit is found, proceed to create a new one
    const visit = new Visit(req.body);
    const savedVisit = await visit.save();

    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Read all visits
router.get('/visitList', async (req, res) => {
  try {
    const visits = await Visit.find();
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read one visit
router.get('/:id', getVisit, (req, res) => {
  res.json(res.visit);
});

// Update visit
router.put('/:id', getVisit, async (req, res) => {
  try {
    Object.assign(res.visit, req.body);
    const updatedVisit = await res.visit.save();
    res.json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete visit
router.delete('/:id', getVisit, async (req, res) => {
  try {
    await res.visit.deleteOne();
    res.json({ message: 'Visit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getVisit(req, res, next) {
  let visit;
  try {
    visit = await Visit.findById(req.params.id);
    if (visit == null) {
      return res.status(404).json({ message: 'Visit not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.visit = visit;
  next();
}

module.exports = router;
