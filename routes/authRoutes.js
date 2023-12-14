//completed
const express = require('express');
const router = express.Router();
 // For password hashing

const Admin = require('../models/admin');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username: username });
    // console.log(req.body.username);
    // console.log(req.body.password);
    // console.log(admin.username);
    // console.log(admin.password);

    // Check if admin exists and password is correct
    if (admin ) {
      // Check if the provided password matches the stored password (without encryption)
      if (password === admin.password) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
