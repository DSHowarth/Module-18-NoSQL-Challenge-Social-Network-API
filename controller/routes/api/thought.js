const router = require('express').Router();
const { ObjectId } = require('mongoose');
const User = require('../../../models/User')
const Thought = require('../../../models/Thought')

// get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find().select('-__v');
        res.status(200).json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get a specific thought
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.find({ _id: {$eq: req.params.id}}).select('-__v');
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err)
    }
})

// create new thought
router.post('/', async (req, res) => {
    try {
        const thoughtUser = await User.findOne({_id: {$eq: req.body.userId}})
        const newThought = await Thought.create(req.body)

        // add new thought's id to associated user
        thoughtUser.thoughts.push(newThought._id)
        // saving modifies the database to reflect the push we made above
        thoughtUser.save();

        res.status(200).json(newThought)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update thought
router.put('/:id', async (req, res) => {
    try {
        const thoughtUpdate = await Thought.findOneAndUpdate(
            {
                _id: {$eq: req.params.id}
            },
            req.body,
            {
                // send back the updated version to requester
                new: true
            }
        )
        res.status(200).json(thoughtUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete thought
router.delete('/:id', async (req, res) => {
    try {

        const thoughtDelete = await Thought.findOneAndDelete(
            {
                _id: {$eq: req.params.id}
            },
        )
        // find deleted thought's associated user
        const thoughtUser = await User.findOne({username: {$eq: thoughtDelete.username}});
        // remove thought id from the user's document
        thoughtUser.thoughts.splice(thoughtUser.thoughts.indexOf(req.params.id), 1);
        thoughtUser.save();
        res.status(200).json(thoughtDelete)
    } catch (err) {
        res.status(500).json(err)
    }
})

// create reaction to thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // find the associated thought
        const thought = await Thought.findOne({_id: {$eq: req.params.thoughtId}})
        // add entire reaction as subdoc
        thought.reactions.push(req.body)
        thought.save();

        res.status(200).json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
})


// delete reaction
router.delete('/:thoughtId/reactions', async (req, res) => {
    try {
        // find associated thought
        const thought = await Thought.findOne({_id: {$eq: req.params.thoughtId}})
        // remove reaction subdoc
        const reactionDelete = thought.reactions.pull({reactionId: req.body.reactionId});
        thought.save();
        res.status(200).json(reactionDelete)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})




module.exports = router