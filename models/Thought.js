const mongoose = require('mongoose');
const dayjs = require('dayjs');

const formatDate = function (createdDate) {
    return dayjs(createdDate).format('dddd MMMM D, YYYY')
}

const reactionSchema = new mongoose.Schema({
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
            get: formatDate
        }
    },
    {
        toJSON: {
            getters: true
        },
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