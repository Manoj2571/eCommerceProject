const mongoose = require("mongoose")
const {initializeDatabase} = require("./db/db.connect")
const express = require("express")
const User = require("./models/eCommerce/users.model")
const Product = require("./models/eCommerce/products.models")
const Address = require("./models/eCommerce/address.models")
const Category = require('./models/eCommerce/categories.models')
const Order = require("./models/eCommerce/order.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const cors = require("cors")
const cookieParser = require("cookie-parser")

const port = process.env.PORT

const app = express()

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

initializeDatabase()

app.listen(port, () => {
    console.log("Server is up and running on", port)
})

async function getAllCategories() {
  try {
    const allCategories = await Category.find()
    return allCategories
  } catch (error) {
    console.log(error)
  }
}

const updateWishlist = async (req, res) => {
    try {
        const {product} = req.body
        const user = await User.findById(req.params.userId)

        const productIndex =  user.wishlist.findIndex(existingProduct => existingProduct == product)

        if(productIndex == -1) {
            user.wishlist = [...user.wishlist, product]
        } else {
            user.wishlist = user.wishlist.filter(existingProduct => existingProduct != product)
        }

        await user.save()

        return res.status(201).json({message: "User updated successfully.", wishlist: user.wishlist})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error occured while updating wishlist."})
    }
}


const updateLoggedInUserData = async (req,res) => {

    try {
    const user = await User.findById(req.userId)

   
    req.body.cart.forEach( (product) => {
        const productIndex =  user.cart.findIndex(existingProduct => existingProduct.product == product.product && existingProduct.size == product.size)

        if(productIndex == -1) {
            user.cart = [...user.cart, product]
        } else {
            user.cart[productIndex].quantity += product.quantity
        }
    })

    req.body.wishlist.forEach( (product) => {
        const productIndex =  user.wishlist.findIndex(existingProduct => existingProduct == product)

        if(productIndex == -1) {
            user.wishlist = [...user.wishlist, product]
        }
    })

    await user.save()

    return res.status(201).json({message: "User updated successfully.", user})

    
} catch (error) {
    console.log(error)
    return res.status(500).json({message: "Error occured while updating user."})
}

}

const addToCart = async (req, res) => {
    try {
    const {product, quantity, size} = req.body
    const user = await User.findById(req.params.userId)

    const productIndex =  user.cart.findIndex(existingProduct => existingProduct.product == product && existingProduct.size == size)

        if(productIndex == -1) {
            user.cart = [...user.cart, req.body]
        } else {
            user.cart[productIndex].quantity += quantity
        }

    await user.save()

    return res.status(201).json({message: "User updated successfully.", cart: user.cart})

    } catch (error) {
        console.log(error)
       return res.status(500).json({message: "Error occured while adding product to cart."})
    }
    
    

}

const removeFromCart = async (req, res) => {

    try { 
    const {product, size} = req.body

    const user = await User.findById(req.params.userId)
    user.cart =  user.cart.filter(cartItem => !(cartItem.product == product && cartItem.size == size))

    await user.save()

    return res.status(201).json({message: "Product removed from Cart", cart: user.cart})

    }catch (error) {
        console.log(error)
       return res.status(500).json({message: "Error occured while removing product from cart."})
    }
}

const quantityIncrement = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId)

        const itemIndex = user.cart.findIndex(
            (item) =>
              item.product == req.body.product &&
              item.size == req.body.size
          );

        user.cart[itemIndex].quantity += 1  

        await user.save()

        return res.status(201).json({message: "Quantity Incremented Successfully.", cart: user.cart})


    } catch (error) {
        return res.status(500).json({message: "Error occured while incrementing quantity."})
    }
}

const quantityDecrement = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId)

        const itemIndex = user.cart.findIndex(
            (item) =>
              item.product == req.body.product &&
              item.size == req.body.size
          );

          if (user.cart[itemIndex].quantity != 1) {
            user.cart[itemIndex].quantity -= 1;
          }

        await user.save()

        return res.status(201).json({message: "Quantity Decremented Successfully.", cart: user.cart})


    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error occured while incrementing quantity."})
    }
}

const moveToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    const productIndex = user.wishlist.findIndex(product => product == req.body.product)

    if(productIndex == -1) {
      user.wishlist = [...user.wishlist, req.body.product]
    }

    user.cart = await user.cart.filter(cartItem => !(cartItem.product == req.body.product && cartItem.size == req.body.size))

    await user.save()

    return res.status(201).json({message: "Product moved to wishlist", wishlist: user.wishlist})

  } catch (error) {
    return res.status(500).json({message: "Error occured while moving product to wishlist."})
  }
}

const productDecrement = async (productData) => {
    const product = await Product.findById(productData.product)

    const sizeIndex = product.sizeAvailability.findIndex((size) => size.size == productData.size)

    product.sizeAvailability[sizeIndex].quantity -= productData.quantity

    await product.save()

}

const bulkUpdateProducts = async (req, res) => {

    const {cart} = req.body
    
    try {
        await Promise.all(cart.map(cartProduct => productDecrement(cartProduct)))
        res.status(200).json({ message: 'All products decremented successfully!' });
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

     jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId
        
        next();
    });
};

app.get("/", async (req, res) => {
    res.send("Hello!")
})

app.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password")

        res.send(users)

    } catch (error) {
        console.log(error)
        res.status(501).json({message: "Internal server error"})
    }
})

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find()

        res.send(products)

    } catch (error) {
        console.log(error)
        res.status(501).json({message: "Internal server error"})
    }
})

app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories()
    if(categories.length !== 0){
      res.send(categories)
    } else {
      res.status(404).json("Categories not found.")
	}
 } catch (error) {
    res.status(500).json("Failed to fetch Categories.")
  }
})

app.post("/users/:userId/wishlist", updateWishlist)

app.post("/users/:userId/cart", addToCart)

app.delete("/users/:userId/cart", removeFromCart)

app.post("/users/:userId/cart/increment", quantityIncrement)

app.post("/users/:userId/cart/decrement", quantityDecrement)

app.post("/users/:userId/wishlist", moveToWishlist)

app.post("/addresses", async (req, res) => {
    try {
        const newAddress = new Address(req.body)
        const savedAddress = await newAddress.save()
        res.status(201).json({message: "Address added successfully", address: savedAddress})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Adding address failed.", error: error})
    }
})

app.get("/addresses", async (req, res) => {
    try {
        const addresses = await Address.find()
            res.send(addresses)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "fetching addresses failed.", error: error})
    }
})

app.get("/addresses/:userId", async (req, res) => {
    try {
        const addresses = await Address.find({user: req.params.userId})
            res.send(addresses)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "fetching addresses failed.", error: error})
    }
})

app.delete("/addresses/:addressId", async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.addressId)

        if(!deletedAddress) {
            return res.status(404).json({error: "Address not found."})
        }

        res.status(200).json({
            message: "Address deleted successfully.",
            deletedAddress: deletedAddress
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error", error: error})
    }
})

app.post("/addresses/:addressId", async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params.addressId, req.body, {new: true})
        
        res.status(200).json({message: "Address updated successfully.", address: updatedAddress})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error", error: error})
    }
})

app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().populate({path: 'cart', populate: {path: 'product', select: 'name price imageUrl'}})
        res.send(orders)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "fetching orders failed.", error: error})
    }
})

app.post("/orders", async (req, res) => {
    try {
        const newOrder = new Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(201).json({message: "Order added successfully", order: savedOrder})
    } catch(error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

app.post("/products/productStockDecrement", bulkUpdateProducts)


app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body)
        const savedUser = await newUser.save()

        res.status(201).json({message: "User added successfully", user: savedUser})

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

app.post('/login', async (req, res) => {

    const {email, password, rememberMe} = req.body


    const user = await User.findOne({email})

    if (!user) {
        return res.status(400).json({ message: "Account Doesn't exits" });
    }


    const isMatch = user.password === password
    if (!isMatch) {
        return res.status(400).json({ message: 'Wrong Password' });
    }


    const payload = {userId: user._id}

    const tokenOptions = rememberMe ? {expiresIn: '7d'} : {expiresIn: '15m'}

    const token = jwt.sign(payload, SECRET_KEY, tokenOptions)

    return res.status(200).json({ message: 'Login successful', token });
}) 

app.post("/users/loggedIn", verifyToken, updateLoggedInUserData)

app.post("/users/:userId", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})

        res.status(201).json({message: "User updated successfully", user:updatedUser})
    } catch (error) {
        res.status(500).json({message: "Internal server Error"})
    }
})

app.post("/users/:userId/cart/clear", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        user.cart = []
        await user.save()
        res.status(201).json({message: "Cart updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error."})
    }
})




