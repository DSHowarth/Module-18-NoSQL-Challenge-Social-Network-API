const router = require('express').Router();
const User = require('../../../models/User')
const Thought = require('../../../models/Thought')

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch {
        res.status(500).json(err)
    }
})

module.exports = router