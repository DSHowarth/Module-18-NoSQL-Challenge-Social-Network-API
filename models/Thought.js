const mongoose = require('mongoose');
const dayjs = require('dayjs');

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
        //TODO: method
    }
})

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
            //TODO: method

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
        }
    })