const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const user = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Set your email please"],
        min: 8,
        validate: {
            validator: function(value) {
                return value.includes('@')
            },
            message: `Your email should include "@" character`
        }
    },

    password: {
        type: String,
        required: [true, "You need password"],
        min: [6, 'At least 6 characters'],
        max: 32
    },
    /*
    avatar: {
        type: String,

    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    */
    createdAt: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        default: null,

    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    }

});

const userSchemaValid = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    location: Joi.string().min(6).required(),
    number: Joi.number().min(10).required()
})

user.pre('save', async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})



const User = mongoose.model("users", user)

module.exports = { User, userSchemaValid };