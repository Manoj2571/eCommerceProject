const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [
        {
          product: {
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
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timeStamps: true})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order