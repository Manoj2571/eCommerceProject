const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0
    },
    category: {
      type: String,
      required: true
    },
    sizeAvailability: [
      {
        size: {
          type: String,
          enum: ["S", "M", "L", "XL"],
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 0
        },
        isAvailable: {
          type: Boolean,
          default: true
        }
      }
    ],
    tags: [{
      type: String
    }]
  }, {timeStamps: true}
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product
