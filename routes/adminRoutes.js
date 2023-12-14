// routes/adminRoutes.js
//completed
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// Create admin(done)
router.post('/createAdmin', async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    // res.json(savedAdmin);
    // res.json(`${req.body.username} credential saved successfully.`);
    res.status(201).send('Admin created successfully')
  } catch (error) {
    // res.status(400).json({ message: error.message });
    if(error.name === 'ValidationError' && error.errors.username.kind === 'unique'){
      res.status(400).send('Username already exists');
    } else{
      res.status(500).send('Internal Server Error');
    }

  }
});

// Read all admins-send only usernames
router.get('/adminList', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Read one admin
// router.get('/:id', getAdmin, (req, res) => {
//   res.json(res.admin);
// });

// Read one admin by username(done)
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const admin = await Admin.findOne({ username: username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Update admin
// router.put('/:id', getAdmin, async (req, res) => {
//   try {
//     Object.assign(res.admin, req.body);
//     const updatedAdmin = await res.admin.save();
//     res.json(updatedAdmin);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// Update admin password by username(done)
router.put('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const newPassword = req.body.password;

    const admin = await Admin.findOne({ username: username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.password = newPassword;
    const updatedAdmin = await admin.save();

    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// // Delete admin
// router.delete('/:id', getAdmin, async (req, res) => {
//   try {
//     await res.admin.remove();
//     res.json({ message: 'Admin deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// Delete admin by username

router.delete('/:username', async (req, res) => {
  try {
    const username = req.params.username;

    const result = await Admin.deleteOne({ username: username });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// async function getAdmin(req, res, next) {
//   let admin;
//   try {
//     admin = await Admin.findById(req.params.id);
//     if (admin == null) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }

//   res.admin = admin;
//   next();
// }

module.exports = router;
