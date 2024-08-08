const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDatabase = require('./db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

let database;

connectToDatabase().then(db => {
  database = db;
}).catch(error => {
  console.error("Failed to connect to the database", error);
});
// Sign-up route


app.post('/signup',async (req,res)=>{
  const { email, password, name } = req.body;
  try{
    const collection=database.collection('users');
    const userexist=collection.findOne(email);
    if(userexist){
      return res.status(400).json({message: 'user already exist'})
    }
    await collection.insertOne({name,email,password});
    res.status(201).json({message: 'Signup succesfull'});
  }catch(error){
    console.error("Error in signup",error);
    res.status(500).json({message: 'error in signup'})
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const collection = database.collection('users');
    const user = await collection.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
