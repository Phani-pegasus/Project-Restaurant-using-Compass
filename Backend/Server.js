const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000; // Change as needed
const path = require('path');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = new mongoose.Schema({
  Name:String,
  Email:String,
  Password:String,
  ConfirmPassword:String,
  Mobile:String
  // Add more fields as needed
});

const User = mongoose.model('Restaurant', Schema, 'User');

app.post('/User', async (req, res) => {
  const { Name, Email, Password, ConfirmPassword, Mobile } = req.body;
  console.log(req.body);
  // Validate data (you can add more validation as needed)

  // Create a new user document
  const newUser = new User({
    Name,
    Email,
    Password,
    ConfirmPassword,
    Mobile,
  });

  try {
    // Save the user to the MongoDB collection
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/User', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Define schema for BVRM collection
const recipieSchema = new mongoose.Schema({
  Recipie: String,
  Restaurant: String,
  Address: String,
});

const Recipie = mongoose.model('Recipie', recipieSchema,'BVRM');

// API endpoint to search for recipie
app.post('/search', async (req, res) => {
  try {
    const { recipie } = req.body;
    console.log(recipie)
    const searchResults = await Recipie.find({ Recipies: recipie });
    console.log(searchResults)
    res.json(searchResults);
  } catch (error) {
    console.error('Error searching for recipie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


