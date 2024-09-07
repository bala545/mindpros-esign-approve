const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection pool 
const JWT_SECRET = crypto.randomBytes(64).toString('hex');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mindprosesign',
  password: 'Balu@1234',
  port: 5432,
});


//login

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the user by email
    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userQuery.rows.length === 0) {
      // If user not found, return an error
      return res.status(400).json({ message: 'Incorrect credentials.' });
    }

    const user = userQuery.rows[0];

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the client
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



app.post('/register', async (req, res) => {
  const { username, full_name, password } = req.body;

  try {
    // Check if the username already exists
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (username, full_name, password) VALUES ($1, $2, $3) RETURNING *',
      [username, full_name, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the client
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (id,username, email,password,created_at) VALUES ($1, $2) RETURNING *', [name, email]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Save Test Details

//save Approval Queue

app.post('/saveapprovalqueue', async (req, res) => {
    req.body = {Record_ID:"0553b4af-aebb-45cf-9b34-2beaf9fc9ee3",Record_Type:"MindPros_esign",Record_Name:'Test1',Approval_Task:"minf",Status:'Completed',Reviewer:'Bala', Updated_Date: new Date()};
    const { Record_ID, Record_Type,Record_Name,Approval_Task,Status,Reviewer,Updated_Date} = req.body;
    try {
        const result = await pool.query('INSERT INTO "Approval_Route" ("Record_ID", "Record_Type", "Record_Name", "Approval_Task", "Status", "Reviewer", "Updated_Date") values ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [Record_ID, Record_Type, Record_Name, Approval_Task, Status, Reviewer, Updated_Date]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get categories
app.get('/getcategories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Categories');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// get  records
app.get('/getrecords', async (req, res) => {
  try {
      const result = await pool.query('SELECT "Record_ID", "Record_Type", "Record_Name", "Approval_Status", "Author", "Revision", "Project", "System" FROM "Record"');
      res.status(200).json(result.rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// get Test_Case
app.get('/gettestcase', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Test_Case');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

//get Test_Run
app.get('/gettestrun', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Test_Run');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 


// Read all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
