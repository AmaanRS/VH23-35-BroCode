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
        contact_number: {
            type: Number,
            required: true
        },
        center_guide_name: {
            type: String,
            required: true
        }
    },
    { timestamps: true }

);

module.exports = mongoose.model("center_model", userSchema)