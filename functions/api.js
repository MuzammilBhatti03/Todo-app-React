const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
const connectToDatabase = require('./mssqlDB');
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());

let pool;

connectToDatabase().then(db => {
  pool = db;
  console.log("Database connection established.");
}).catch(error => {
  console.error("Failed to connect to the database", error);
});

// Sign-up route
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    pool=await connectToDatabase();
    
    const request = pool.request();
    request.input('email', email);
    const result = await request.query('SELECT * FROM users WHERE email = @email');

    if (result.recordset.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    request.input('password', password);
    request.input('name', name);
    await request.query('INSERT INTO users (email, password, name) VALUES (@email, @password, @name)');
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error("Error during sign-up", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/gg',(req,res)=>{
  res.send("hello bhai");
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    pool=await connectToDatabase();
    const request = pool.request();
    request.input('email', email);
    request.input('password', password);
    const result = await request.query('SELECT * FROM users WHERE email = @email AND password = @password');
    
    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: result.recordset[0] });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/a', async (req, res) => {
  const { email } =await req.query;
  console.log("entereing api a");
  try {
    pool=await connectToDatabase();
    console.log("entereing api a pool", pool);
    const request = pool.request();
    console.log("entereing api after", request);
    if(!request){
      console.log("requeest khali ha");
      pool=connectToDatabase();
      request=pool.request();
      if(!request){
        console.log("Acha ma phir khali hoo");
        
      }
    }
    request.input('email', "1@gmail.com");
    const result = await request.query('SELECT * FROM task WHERE userid = @email');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving tasksABC:', error);
    res.status(500).json({ message: 'this internal server error' });
  }
});

// Endpoint to get tasks for a specific user
router.get('/tasks', async (req, res) => {
  const { email } = req.query;
  try {
    pool=await connectToDatabase();
    console.log("entering to get all task of the user")
    const request =await pool.request();
    request.input('email', email);
    const result = await request.query('SELECT * FROM task WHERE userid = @email');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to add a new task
router.post('/api/tasks', async (req, res) => {
  try {
    const { name, complete, favourite, dueDate, userid } = req.body;
    const request = pool.request();
    console.log("task to be entered ", name, complete, favourite, dueDate, userid);

    // Check if the user exists
    request.input('userid', userid);
    const userResult = await request.query('SELECT * FROM users WHERE email = @userid');
    if (userResult.recordset.length === 0) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Insert the task
    request.input('name', name);
    request.input('complete', complete ? 1 : 0);
    request.input('favourite', favourite ? 1 : 0);
    request.input('dueDate', dueDate);
    await request.query(
      `INSERT INTO task (userid, name, complete, favourite, dueDate) 
       VALUES (@userid, @name, @complete, @favourite, @dueDate)`
    );
    res.status(201).send('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to edit an existing task
router.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, complete, favourite, dueDate } = req.body;
    const request = pool.request();

    request.input('id', id);
    request.input('name', name);
    request.input('complete', complete ? 1 : 0);
    request.input('favourite', favourite ? 1 : 0);
    request.input('dueDate', dueDate);

    await request.query(
      `UPDATE task 
       SET name = @name, complete = @complete, favourite = @favourite, dueDate = @dueDate 
       WHERE id = @id`
    );
    res.send('Task updated successfully');
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to mark task as favorite
router.put('/api/tasks/:id/favorite', async (req, res) => {
  try {
    const { id } = req.params;
    const request = pool.request();

    request.input('id', id);
    await request.query('UPDATE task SET favourite = 1 WHERE id = @id');
    res.send('Task marked as favorite successfully');
  } catch (error) {
    console.error('Error marking task as favorite:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to mark task as complete
router.put('/api/tasks/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const request = pool.request();

    request.input('id', id);
    await request.query('UPDATE task SET complete = 1 WHERE id = @id');
    res.send('Task marked as complete successfully');
  } catch (error) {
    console.error('Error marking task as complete:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/', (req, res) => {
  res.send('App is running..');
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);