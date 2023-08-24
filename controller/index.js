const router = require('express').Router();
const routes = require('./routes/index.js');

router.use('/', routes);

module.exports = router;