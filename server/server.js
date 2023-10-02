const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL client
const multer = require('multer'); // Import multer for file uploads
const path = require('path'); // Node.js path module
const cors = require('cors');


const pool = new Pool({
  connectionString: 'postgres://judeohiani:80piHgOFthEd@ep-mute-mountain-00610853.us-east-2.aws.neon.tech/uploaded_books',
  ssl: {
        rejectUnauthorized: false,
      },
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
});


const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']

}));

const port = process.env.PORT || 3000;  

// Define your PostgreSQL database connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name strategy
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: './uploads/' })

// Define a route to upload a book
app.post('/api/upload-book', upload.fields([{ name: 'file' }, { name: 'bookCover' }]), async (req, res) => {
  const { bookTitle, authorName, bookOverview } = req.body;
  const file = req.files.file[0]; // express-fileupload middleware
  const bookCover = req.files.bookCover[0]; // express-fileupload middleware
  console.log("I am a warrior")

  console.log(file);
  console.log(bookCover);
  console.log(bookTitle);
  try {
    // Construct file paths
    const file_path = path.join(__dirname, '..', 'uploads', file.filename);
    const cover_path = path.join(__dirname, '..', 'uploads', bookCover.filename); // Use __dirname to get the correct path
    console.log(file_path);
    console.log(cover_path);
    // Insert book data into your PostgreSQL database with the file paths
    const query = `
      INSERT INTO books (title, author, overview, file_path, cover_path)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [bookTitle, authorName, bookOverview, file_path, cover_path];

    await pool.query(query, values);

    res.status(201).send('Book uploaded successfully');
  } catch (error) {
    console.error('Error uploading book:', error);
    res.status(500).send('Error uploading book');
  }
});


// Define a route to fetch uploaded books
app.get('/api/my-books', async (req, res) => {
  try {
    const query = 'SELECT * FROM books';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Error fetching books');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
