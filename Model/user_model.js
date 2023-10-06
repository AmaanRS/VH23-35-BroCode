const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
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
        age: {
            type: Number,
            required: true,
        },
        date_of_birth: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        contact_number: {
            type: String,
            minLength: 10,
            required: true,
        },
        address: {
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
        },
        blood_group: {
            type: String,
            required: true,
        },
        medical_history: {
            type: String,
            required: false,
        },
        self_photo: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("user_model", userSchema)