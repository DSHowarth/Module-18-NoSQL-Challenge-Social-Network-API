const mongoose = require('mongoose');
const dayjs = require('dayjs');

const formatDate = function (createdDate) {
    return dayjs(createdDate).format('dddd MMMM D, YYYY')
}

const reactionSchema = new mongoose.Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
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
        }
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
        validators: {
            reactionCount: {
                get () {
                    return this.reactions.length
                }
            }
        },
        toJSON: {
            virtuals: true
        }
    })

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought