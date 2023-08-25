const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Invalid email address submitted']
        },
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        virtuals: {
            friendCount: {
                get() {
                    return this.friends.length;
                }
            }
        },
        id: false
    })

const User = mongoose.model('User', userSchema);

module.exports = User