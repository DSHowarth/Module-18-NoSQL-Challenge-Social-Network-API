const router = require('express').Router();
const { ObjectId } = require('mongoose');
const User = require('../../../models/User')
const Thought = require('../../../models/Thought')


router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({_id: {$eq: new ObjectId(req.params.id)}})
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const userUpdate = await User.findOneAndUpdate(
            {
                _id: {$eq: req.params.id}
            },
            req.body,
            {
                new: true
            }
        )
    } catch (err) {

    }
})

module.exports = router