const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');

const app = express();
// const port = 3000;
const port = process.env.PORT || 8000;

// Middleware for parsing urlencoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Handlebars setup
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.get('/upload', (req, res) => {
    res.render('upload', { title: 'Upload File' });
});

app.post('/upload', upload.single('file'), (req, res) => {
    // Logic to handle file upload
    res.redirect('/');
});

// Additional routes for fetch and gallery pages should be defined here

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
