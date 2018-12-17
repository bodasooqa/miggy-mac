const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(morgan('dev'));

app.use('/api/records', require('./routes/records'));

app.use(express.static(path.join(__dirname, '../src')));

// Routes
app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, 'views/index.html'));
});
app.get('/thanks', (req, res) => {
    res.sendfile(path.join(__dirname, 'views/thanks.html'));
});

app.use(function(req, res, next) {
    res.status(404).sendfile(path.join(__dirname, 'views/404.html'));
});

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});