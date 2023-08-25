const router = require('express').Router();
const { ObjectId } = require('mongoose');
const User = require('../../../models/User')
const Thought = require('../../../models/Thought')

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find().select('-__v');
        res.status(200).json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.find({ _id: {$eq: req.params.id}}).select('-__v');
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const thoughtUser = await User.findOne({_id: {$eq: req.body.userId}})
        const newThought = await Thought.create(req.body)

        thoughtUser.thoughts.push(newThought._id)
        thoughtUser.save();

        res.status(200).json(newThought)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        try {
            const thoughtUpdate = await Thought.findOneAndUpdate(
                {
                    _id: {$eq: req.params.id}
                },
                req.body,
                {
                    new: true
                }
            )
            res.status(200).json(thoughtUpdate)
        } catch (err) {
            res.status(500).json(err)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {

        const thoughtDelete = await Thought.findOneAndDelete(
            {
                _id: {$eq: req.params.id}
            },
        )
        const thoughtUser = await User.findOne({username: {$eq: thoughtDelete.username}});
        thoughtUser.thoughts.splice(thoughtUser.thoughts.indexOf(req.params.id), 1);
        console.log('spliced')
        thoughtUser.save();
        console.log('saved')
        res.status(200).json(thoughtDelete)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: {$eq: req.params.thoughtId}})

        thought.reactions.push(req.body)
        thought.save();

        res.status(200).json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: {$eq: req.params.thoughtId}})
        console.log(thought);
        const reactionDelete = thought.reactions.pull({reactionId: req.body.reactionId});
        thought.save();
        res.status(200).json(reactionDelete)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})




module.exports = router