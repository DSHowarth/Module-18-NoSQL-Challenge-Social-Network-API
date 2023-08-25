const router = require('express').Router();
const { ObjectId } = require('mongoose');
const User = require('../../../models/User')
const Thought = require('../../../models/Thought')

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.find({ _id: {$eq: req.params.id}});
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/', async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router