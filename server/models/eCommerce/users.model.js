const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Email already exists!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        addresses: [{
            name: {
                type: String,
                required: true
            },
            mobile: {
                type: Number,
                required: true
            },
            landmark: {
                type: String
            }
        }],
        phone: {
            type: Number,
            required: true,
            validate: {
                validator: (num) => {
                    return num.toString().length === 10
                },
                message: num => `${num.value} must be exactly 10 digits`
            }
        },
        additionalInfo: {
            type: String
        },
        cart: [
          {
            product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            size: {
                type: String,
                required: true,
                enum: ["S", "M", "L", "XL"]
            }
          }
        ],
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }, {timeStamps: true}
)

const User = mongoose.model("User", userSchema)

module.exports = User

