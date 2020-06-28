const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const publicPath = path.resolve(__dirname, 'client', 'build');


const ticTac = require('./routes/ticTacToe');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(publicPath));


app.get('/', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));
app.use('/api/v1', ticTac);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;