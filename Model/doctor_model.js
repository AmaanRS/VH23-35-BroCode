const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        aadhar_card_number: {
            type: Number,
            required: true,
        },
        aadhar_card_photo: {
            type: String,
            required: true,
        },
        pan_card_number: {
            type: Number,
            required: false,
        },
        pan_card_photo: {
            type: String,
            required: false,
        }, self_photo: {
            type: String,
            required: true
        }
        , department: {
            type: String,
            required: true
        },
        expertise: {
            type: String,
            required: true
        },
        practice: {
            type: String,
            required: true
        },
        languages: {
            type: String,
            required: true
        },
        education: {
            type: String,
            required: true
        },
        contact_number: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }

);

module.exports = mongoose.model("doctor_model", userSchema)