const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/content_db');

module.exports = mongoose.connection;