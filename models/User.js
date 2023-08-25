const mongoose = require('mongoose');

// schema for Users
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
            // match runs a validation test on any new email addresses
            // ensure they're valid email formats. Takes in a regex string
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Invalid email address submitted']
        },
        // One user can have many thoughts. Association, not subdoc
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // One user can have many friends. Association, not subdoc
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // adds the number of friends to queries of this model
        virtuals: {
            friendCount: {
                get() {
                    return this.friends.length;
                }
            }
        },
        toJSON: {
            // making sure the virtual above is included even when exporting as json
            // which we do with express
            virtuals: true
        },
        // remove stringified version of _id from model, as it is unnecessary
        id: false
    })

const User = mongoose.model('User', userSchema);

module.exports = User