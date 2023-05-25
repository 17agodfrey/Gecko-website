if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

// const multer = require('multer');
// const { storage } = require('cloudinary');
// const upload = multer({ storage });

// const flash = require('connect-flash'); // you need express-session for flash to work

const geckoRoutes = require('./routes/geckos')

mongoose.connect('mongodb://localhost:27017/geckos', {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// app.use(upload.array('image'));

//----------------routes-----------------//


// app.use('/', userRoutes);
app.use('/geckos', geckoRoutes)
// app.use('/geckos/:id/reviews', reviewRoutes)

app.get('/', (req, res) => {
    res.render('home')
});


// listen on port 3001
app.listen(3001, () => {
    console.log('Serving on port 3001')
})