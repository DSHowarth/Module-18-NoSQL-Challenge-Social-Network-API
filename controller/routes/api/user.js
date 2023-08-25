const router = require('express').Router();
const { ObjectId } = require('mongoose');
const User = require('../../../models/User')
const Thought = require('../../../models/Thought')

// get all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find().select('-__v');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})

// get specific user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({_id: {$eq: req.params.id}}).select('-__v')
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// create new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update user
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
        res.status(200).json(userUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    try {
        const userDelete = await User.findOneAndDelete(
            {
                _id: {$eq: req.params.id}
            }
        )
        res.status(200).json(userDelete)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add new friend to user
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        // find user
        const user = await User.findOne({_id: {$eq: req.params.userId}})

        // add friend id (the _id of the other user) to array
        user.friends.push(req.params.friendId)
        user.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// remove friend from user
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        // find user
        const user = await User.findOne({_id: {$eq: req.params.userId}})
        // remove ex-friend's _id value from array
        user.friends.splice(user.friends.indexOf(req.params.friendId), 1)
        user.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router