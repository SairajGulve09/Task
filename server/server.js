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
const fs = require('fs');

// const {verifyToken} = require("./verifyToken")
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



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Static folder for uploaded files
app.use('/uploads', express.static(uploadsDir));





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
  const authHeader = req.headers.authorization;
  console.log("Header: ",req.headers.authorization);
  if (!authHeader) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ error: 'Token is invalid' });
    }
    console.log('Decoded token:', decoded);
    req.userId = decoded.id;
    next();
  });
}

// Route to fetch user data
app.get('/user',verifyToken, (req, res) => {
  const id = req.userId;
  console.log("heyyyy userId: ",id);
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, id, (err, results) => {
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

// Search profile
app.get("/search/:key", (req, res) => {
  const key = req.params.key;
  const searchPattern = `%${key}%`;
  const sql = `
    SELECT 
      p.*,
      bp.businessLocation, bp.businessType, bp.businessCategory,
      ip.contentType, ip.platforms, ip.followers
    FROM 
      profile p
      LEFT JOIN business_profile bp ON p.profileId = bp.profileId
      LEFT JOIN influencer_profile ip ON p.profileId = ip.profileId
    WHERE 
      p.username LIKE ? OR 
      p.firstName LIKE ? OR 
      p.lastName LIKE ? OR 
      p.email LIKE ? OR 
      p.location LIKE ? OR 
      p.socialMediaIds LIKE ? OR 
      p.shortDescription LIKE ? OR 
      p.oneLineDescription LIKE ? OR
      p.category LIKE ? OR
      bp.businessType LIKE ? OR
      bp.businessCategory LIKE ? OR
      bp.businessSubCategory LIKE ? OR
      ip.contentType LIKE ? OR
      ip.influencerCategory LIKE ? OR
      ip.influencerSubCategory LIKE ? 
  `;
  const searchArr = Array(15).fill(searchPattern);

  db.query(sql, searchArr, (err, results) => {
    if (err) {
      console.error('Error searching profile data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(results);
  });
});




// Route to handle signup
app.post('/signup', (req, res) => {
  const { fullname, email, password, confirm_password } = req.body;
  const sql = 'INSERT INTO users (fullname, email, password, confirm_password) VALUES (?, ?, ?, ?)';
  const values = [fullname, email, password,confirm_password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Signup failed:', err);
      return res.status(500).send('Signup failed');
    }

    console.log('User registered successfully');
    console.log(results);
    console.log("Payload id",results.insertId);
    const userData = {
      id: results.insertId
    };
    const options = { expiresIn: '1h' };
    const token = jwt.sign(userData, secretKey, options);

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

      console.log("Payload id",results[0].id);
      // Extract user data from database results
      const userData = {
        id: results[0].id
      };

      // Generate JWT token using user data as payload
      const options = { expiresIn: '1h' };
      const token = jwt.sign(userData, secretKey, options);

      // Send token in response
      return res.status(200).json({ message: 'Login successful', token });
    } else {
      console.error('Login failed: Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('profilePhoto');

// Save profile data endpoint
app.post('/create-profile', verifyToken, upload, (req, res) => {
  const {
    firstName, lastName, email, location, category,
    otherCategory, businessLocation, businessType, businessCategory,
    businessSubcategory, influencerCategory, influencerSubcategory,
    contentType, platforms, followers, socialMediaIds,
    oneLineDescription, shortDescription
  } = req.body;

  console.log(req.file);

  const profilePhoto = req.file ? req.file.path : null;

  console.log("Id is: ", req.userId);

  // Insert into profile table
  const profileSql = `
    INSERT INTO profile (userId, profilePhoto, username, firstName, lastName, email, location, category, otherCategory, socialMediaIds, oneLineDescription, shortDescription)
    VALUES (?, ?, CONCAT(?, '_', LOWER(?)), ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const profileValues = [
    req.userId, profilePhoto, req.userId, firstName, firstName, lastName, email, location, category, otherCategory, JSON.stringify(socialMediaIds), oneLineDescription, shortDescription
  ];

  db.query(profileSql, profileValues, (err, result) => {
    if (err) {
      console.error('Error creating profile:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const profileId = result.insertId;

    if (category === 'businessman') {
      const businessSql = `
        INSERT INTO business_profile (profileId, businessLocation, businessType, businessCategory, businessSubcategory)
        VALUES (?, ?, ?, ?, ?)
      `;
      const businessValues = [profileId, businessLocation, businessType, businessCategory, businessSubcategory];

      db.query(businessSql, businessValues, (err, result) => {
        if (err) {
          console.error('Error creating business profile:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Profile created successfully' });
      });
    } else if (category === 'influencer') {
      const influencerSql = `
        INSERT INTO influencer_profile (profileId, contentType, platforms, followers, influencerCategory, influencerSubcategory)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const influencerValues = [profileId, contentType, platforms.join(','), followers, influencerCategory, influencerSubcategory];

      db.query(influencerSql, influencerValues, (err, result) => {
        if (err) {
          console.error('Error creating influencer profile:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Profile created successfully' });
      });
    } else {
      return res.status(400).json({ error: 'Invalid category' });
    }
  });
});


// Route to get all profiles with complete data
app.get('/profiles', (req, res) => {
  const sql = `
    SELECT 
      p.*,
      b.businessLocation, b.businessType, b.businessCategory,
      i.contentType, i.platforms, i.followers
    FROM 
      profile p
      LEFT JOIN business_profile b ON p.profileId = b.profileId
      LEFT JOIN influencer_profile i ON p.profileId = i.profileId
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching profiles:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No profiles found' });
    }

    // Map results to format response
    const profiles = results.map(profile => ({
      profileId: profile.profileId,
      userId: profile.userId,
      profilePhoto: profile.profilePhoto,
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      location: profile.location,
      category: profile.category,
      otherCategory: profile.otherCategory,
      socialMediaIds: typeof profile.socialMediaIds === 'string' ? JSON.parse(profile.socialMediaIds) : profile.socialMediaIds,
      oneLineDescription: profile.oneLineDescription,
      shortDescription: profile.shortDescription,
      businessLocation: profile.businessLocation,
      businessType: profile.businessType,
      businessCategory: profile.businessCategory,
      contentType: profile.contentType,
      platforms: profile.platforms ? profile.platforms.split(',') : [],
      followers: profile.followers
    }));

    res.status(200).json(profiles);
  });
});


// Route to get all profiles with complete data
app.get('/home-profiles', (req, res) => {
  const sql = `
    SELECT 
      p.*,
      b.businessLocation, b.businessType, b.businessCategory,
      i.contentType, i.platforms, i.followers
    FROM 
      profile p
      LEFT JOIN business_profile b ON p.profileId = b.profileId
      LEFT JOIN influencer_profile i ON p.profileId = i.profileId
    LIMIT 8
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching profiles:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No profiles found' });
    }

    // Map results to format response
    const profiles = results.map(profile => ({
      profileId: profile.profileId,
      userId: profile.userId,
      profilePhoto: profile.profilePhoto,
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      location: profile.location,
      category: profile.category,
      otherCategory: profile.otherCategory,
      socialMediaIds: typeof profile.socialMediaIds === 'string' ? JSON.parse(profile.socialMediaIds) : profile.socialMediaIds,
      oneLineDescription: profile.oneLineDescription,
      shortDescription: profile.shortDescription,
      businessLocation: profile.businessLocation,
      businessType: profile.businessType,
      businessCategory: profile.businessCategory,
      contentType: profile.contentType,
      platforms: profile.platforms ? profile.platforms.split(',') : [],
      followers: profile.followers
    }));

    res.status(200).json(profiles);
  });
});



// filter the profiles based on parameters

app.get('/filter-profiles', verifyToken, (req, res) => {
  const {
    category,
    businessCategory,
    businessSubcategory,
    influencerCategory,
    influencerSubcategory
  } = req.query;

  let sql = `
    SELECT p.*, 
           bp.businessLocation, bp.businessType, bp.businessCategory, bp.businessSubcategory,
           ip.contentType, ip.platforms, ip.followers, ip.influencerCategory, ip.influencerSubcategory
    FROM profile p
    LEFT JOIN business_profile bp ON p.profileId = bp.profileId
    LEFT JOIN influencer_profile ip ON p.profileId = ip.profileId
    WHERE 1=1
  `;

  let filters = [];
  
  if (category) {
    sql += ' AND p.category = ?';
    filters.push(category);
  }
  if (businessCategory) {
    sql += ' AND bp.businessCategory = ?';
    filters.push(businessCategory);
  }
  if (businessSubcategory) {
    sql += ' AND bp.businessSubcategory = ?';
    filters.push(businessSubcategory);
  }
  if (influencerCategory) {
    sql += ' AND ip.influencerCategory = ?';
    filters.push(influencerCategory);
  }
  if (influencerSubcategory) {
    sql += ' AND ip.influencerSubcategory = ?';
    filters.push(influencerSubcategory);
  }

  db.query(sql, filters, (err, results) => {
    if (err) {
      console.error('Error fetching profiles:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});




// Route to fetch profile data based on userId
app.get('/profiles/:userId',verifyToken, (req, res) => {
  const userId = req.params.userId;

  // Query the database to fetch the profile data for the provided userId
  const sql = 'SELECT * FROM profile WHERE userId = ?';
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

// Route to fetch profile data based on profileId
app.get('/profile/:profileId',verifyToken, (req, res) => {
  const profileId = req.params.profileId;

  // Query the database to fetch the profile data for the provided userId
  const sql = 'SELECT * FROM profile WHERE profileId = ?';
  db.query(sql, profileId, (err, results) => {
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



// Route to fetch highlighted profiles
app.get('/highlighted-profiles', (req, res) => {
  // Modify the SQL query to fetch highlighted profiles based on specific criteria
  const sql = `
  SELECT p.*
  FROM profile p
  LEFT JOIN influencer_profile i ON p.profileId = i.profileId
  LEFT JOIN business_profile b ON p.profileId = b.profileId
  WHERE 
    (p.category = 'influencer' AND i.followers = '1M+') 
    OR
    (p.category = 'businessman' AND b.businessType = 'Retail' AND b.businessCategory = 'Retail Trade') 
  LIMIT 3  
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching highlighted profiles:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

// Route to fetch recently joined profiles
app.get('/recently-joined', (req, res) => {
  // Modify the SQL query to fetch recently joined profiles based on specific criteria
  const sql = `
  SELECT *
  FROM profile
  ORDER BY profileId DESC
  LIMIT 3  
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching recently joined profiles:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

// Route to fetch users with collaborations (limited to three)
// app.get('/collaborations', (req, res) => {
//   const sql = 'SELECT * FROM profiles WHERE collaboration IS NOT NULL AND collaboration != "" LIMIT 3';
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error fetching users with collaborations:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//     res.status(200).json(results);
//   });
// }); 




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

