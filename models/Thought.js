const mongoose = require('mongoose');
const dayjs = require('dayjs');

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