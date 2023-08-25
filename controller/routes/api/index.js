const router = require('express').Router();
const thoughtRoute = require('./thought.js');
const userRoute = require('./user.js');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

module.exports = router