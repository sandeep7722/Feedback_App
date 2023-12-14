// routes/demoRoutes.js
//completed
const express = require('express');
const router = express.Router();
const Demo = require('../models/demo');

// Create demo(done)
router.post('/createDemo', async (req, res) => {
  try {
    const demo = new Demo(req.body);
    const savedDemo = await demo.save();
    res.status(201).json(savedDemo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all demos(done)
router.get('/demoList', async (req, res) => {
  try {
    const demos = await Demo.find();
    res.json(demos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read one demo
// router.get('/:id', getDemo, (req, res) => {
//   res.json(res.demo);
// });
// Read one demo by demo name(done)
router.get('/:demoname', getDemo, (req, res) => {
  res.json(res.demo);
});

// Update demo by id
// router.put('/:id', getDemo, async (req, res) => {
//   try {
//     Object.assign(res.demo, req.body);
//     const updatedDemo = await res.demo.save();
//     res.json(updatedDemo);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
//update demo by demoname
router.put('/:demoname', getDemo, async (req, res) => {
  try {
    // Assuming req.body contains the updated details
    const updatedDemoDetails = req.body;

    // Update the demo details
    Object.assign(res.demo, updatedDemoDetails);

    // Save the updated demo to the database
    await res.demo.save();

    res.json({ message: 'Demo updated successfully', updatedDemo: res.demo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete demo 
// router.delete('/:id', getDemo, async (req, res) => {
//   try {
//     await res.demo.remove();
//     res.json({ message: 'Demo deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
//Delete demo by demo name(done)
router.delete('/:demoname', getDemo, async (req, res) => {
  try {
    await res.demo.deleteOne();
    res.json({ message: 'Demo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


async function getDemo(req, res, next) {
  let demo;
  try {
    const demoname = req.params.demoname;
    demo = await Demo.findOne({demoname: demoname});
    if (demo == null) {
      return res.status(404).json({ message: 'Demo not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.demo = demo;
  next();
}

module.exports = router;
