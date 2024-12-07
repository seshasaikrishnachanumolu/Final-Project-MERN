const express = require('express');
const router = express.Router();
const Land = require('../models/Land'); // Import the Land model

// Add Land Route
router.post('/addLand', async (req, res) => {
  try {
    const { name, area, location, price, description } = req.body;

    // Create a new land entry
    const newLand = new Land({
      name,
      area,
      location,
      price,
      description,
    });

    // Save the land to the database
    await newLand.save();

    // Send success response
    res.status(201).json({ message: 'Land added successfully!', newLand });
  } catch (error) {
    console.error('Error adding land:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
