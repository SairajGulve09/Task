const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const http = require('http'); 
const nodemailer = require('nodemailer');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Load environment variables
const secretKey = process.env.JWT_SECRET;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from localhost:3000
  credentials: true, // Allow sending cookies with requests
}));

// Serve static files (photos) from the 'public/uploads' directory
app.use('/photos', express.static(path.join(__dirname, 'public', 'uploads')));

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'keymatrix', // Change this to your database name
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});

// Middleware to verify JWT token
// In the verifyToken middleware in the backend code
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  console.log('Token received:', token); // Add this line to check token received

  if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Token is invalid' });
      }
      req.userId = decoded.userId;
      next();
  });
}

// Route to fetch user data
app.get('/user', verifyToken, (req, res) => {
  const userId = req.userId;
  const sql = 'SELECT * FROM users WHERE userId = ?';
  db.query(sql, userId, (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = results[0];
    res.status(200).json(userData);
  });
});


// Route to handle signup
app.post('/signup', (req, res) => {
  const { fullname, email, password, confirm_password } = req.body;
  const sql = 'INSERT INTO users (fullname, email, password, confirm_password) VALUES (?, ?, ?, ?)';
  const values = [fullname, email, password,confirm_password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Signup failed:', err);
      return res.status(500).send('Signup failed');
    }

    console.log('User registered successfully');

    const payload = { /* Add user data to payload */ };
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);

    // Send token in response
    return res.status(200).json({ message: 'SignUp successful', token });
    // res.status(201).send('User registered successfully');

    
    
  });
});

// Route to handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Login failed:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 1) {
      console.log('Login successful');

      // Generate JWT token using the secret key from environment variable
      const payload = { /* Add user data to payload */ };
      const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, secretKey, options);

      // Send token in response
      return res.status(200).json({ message: 'Login successful', token });
    } else {
      console.error('Login failed: Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


// WebSocket event listeners
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);

  // Listen for incoming messages from clients
  socket.on("message", async (message) => {
    try {
      // Perform asynchronous operations here if needed
      // For example, you can save the message to the database before broadcasting
      // await saveMessageToDatabase(message);
      
      // Broadcast the message to all connected clients
      io.emit("message", message);
    } catch (error) {
      console.error("Error handling message:", error);
      // Handle errors gracefully
    }
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
});

// Example route for sending a message
app.post('/send-message', (req, res) => {
  const { senderId, recipientId, message } = req.body;

  // Check if senderId and recipientId are provided
  if (!senderId || !recipientId) {
    return res.status(400).json({ error: 'Sender ID and recipient ID are required' });
  }

  // Construct the SQL query string
  const sql = 'INSERT INTO messages (sender_id, recipient_id, message) VALUES (?, ?, ?)';
  const values = [senderId, recipientId, message];

  // Insert the message into the database
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error sending message:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Message sent successfully' });
  });
});


// Example route for fetching messages
app.get('/fetch-messages', (req, res) => {
  const { userId } = req.query;

  // Assuming you have a 'messages' table in your database
  // Fetch messages where the user is the sender or recipient
  const sql = 'SELECT * FROM messages WHERE sender_id = ? OR recipient_id = ?';
  const values = [userId, userId];

  // Query the database for messages
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results);
  });
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Save profile data endpoint
app.post('/profiles', (req, res) => {
  const { userId, socialMediaIds, ...profileData } = req.body; // Extract userId and socialMediaIds from req.body
  profileData.userId = userId; // Add userId to profileData
  profileData.socialMediaIds = JSON.stringify(socialMediaIds); // Convert socialMediaIds array to JSON string

  // Insert profile data into MySQL
  const sql = 'INSERT INTO profiles SET ?';
  db.query(sql, profileData, (err, result) => {
    if (err) {
      console.error('Error saving profile data:', err); // Log the error
      return res.status(500).send('Error saving profile data');
    }
    console.log('Profile data saved successfully');
    res.status(200).send('Profile data saved successfully');
  });
});

// Route to fetch all profiles (protected route)
app.get('/profiles', (req, res) => {
  const sql = 'SELECT * FROM profiles';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching profiles:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});







// Route to fetch profile data based on userId
app.get('/profiles/:userId', (req, res) => {
  const userId = req.params.userId;

  // Query the database to fetch the profile data for the provided userId
  const sql = 'SELECT * FROM profiles WHERE userId = ?';
  db.query(sql, userId, (err, results) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profileData = results[0]; // Assuming userId is unique, so there should be only one result
    res.status(200).json(profileData);
  });
});

// Example middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is invalid' });
    }
    req.userId = decoded.userId;
    next();
  });
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

