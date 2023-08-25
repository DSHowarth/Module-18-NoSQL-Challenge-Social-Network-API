const mongoose = require('mongoose');
const dayjs = require('dayjs');

// function for displaying formatted dates when queried
const formatDate = function (createdDate) {
    return dayjs(createdDate).format('dddd MMMM D, YYYY')
}

const reactionSchema = new mongoose.Schema({
        // generating a unique object id
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: dayjs(),
            // formatdate, created above, is used as a callback function
            // to automatically format dates when queried
            get: formatDate
        }
    },
    {
        toJSON: {
            // flag to make sure our get: statement is included in json queries
            getters: true
        },
        // remove unnecessary stringified _id field
        id: false
    }
)

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: dayjs(),
            // another use of the callback function
            get: formatDate

        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        virtuals: {
            // virtual to include the number of reactions a thought has when queried
            reactionCount: {
                get () {
                    return this.reactions.length
                }
            }
        },
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    })

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought