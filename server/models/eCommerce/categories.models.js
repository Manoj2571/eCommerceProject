const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    subCategory: [{
      type: String,
      required: true
    }]
  }, {timeStamps: true}
)

const Category = mongoose.model("Category", categorySchema)

module.exports = Category