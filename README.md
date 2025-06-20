
# E-Commerce Store
A full-featured eCommerce web application to browse products, manage cart and wishlist, place orders, and handle addresses for a seamless shopping experience.  Built with a React frontend, Express/Node backend, MongoDB database, and JWT-based authentication.

---

## Demo Link

[Live Demo](https://e-commerce-project-fawn-sigma.vercel.app/)  

---

## Login

> **Guest**  
> Username: `testUser@gmail.com`  
> Password: `Nan@dec01`

---
## Quick Start

```
# Clone the repository
git clone https://github.com/Manoj2571/eCommerceProject.git
cd eCommerceProject

# Install server and client dependencies
cd server && npm install
cd ../client && npm install

# Start the server
cd ../server && node index.js

# Start the client
cd ../client && npm start

```


## Technologies
- React JS
- React Router
- Node.js
- Express
- MongoDB
- JWT

## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app :
[Demo Video Link](https://youtu.be/B7x6Z6JMlmk)

## Features
**Product Listing**
- Clean, user-friendly interface for browsing products
- Filter by category, rating
- Sort products by price (Low to High / High to Low)
- Each product shown as a card displaying:
  - Product image, name, price, and rating
  - Options to add to wishlist and add to cart

**Search**
- Search products in real-time using the input 
box in the navbar.  

**Product Detail Page**  
- View detailed product information  
- Buttons to Add to Cart, Buy Now, and Add to Wishlist  
- Quantity increment and decrement controls for cart addition 

**Wishlist Management**
- Accessible via the navbar
- View all liked products for future purchases
- Remove items directly from the wishlist
- Move items to the cart

**Cart Management**  
- Navigate to your cart from the navbar  
- Increase or decrease product quantity  
- Remove items from the cart  
- Move items to the wishlist  
- View price breakdown with a checkout button

**Address Management**  
- Add, update, or delete multiple addresses  
- Select a delivery address during checkout

**User Profile**  
- View user information including name, email, phone number, address, and orders  
- Edit user information and change password  
- Logout functionality

**Alerts & Feedback**  
- Loading indicators when fetching data  
- Acknowledgement alerts for add/remove from cart or wishlist  
- Acknowledgement alerts for increase/decrease quantity  
- Acknowledgement alerts for moving items between cart and wishlist
### API Reference
### POST /users/:userId/wishlist
Update user's wishlist.

**Sample Response:**

```
{
  "message": "User updated successfully.",
  "wishlist": ["PRODUCT_ID_1", "PRODUCT_ID_2", ...]
}
```

### POST /users/:userId/cart
Add a product to the user's cart or increase quantity if it already exists with the same size.

**Sample Response:**
```
{
  "message": "User updated successfully.",
  "cart": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2,
      "size": "M"
    },
    ...
  ]
}
```
### DELETE /users/:userId/cart
Remove a specific product from the user's cart.

**Sample Response:**
```
{
  "message": "Product removed from Cart",
  "cart": [
    ...
  ]
}
```
### POST /users/:userId/cart/increment
Increment quantity of a cart item.

**Sample Response:**
```
{
  "message": "Quantity Incremented Successfully.",
  "cart": [
    ...
  ]
}
```
### POST /users/:userId/cart/decrement
Decrement quantity of a cart item

**Sample Response:**
```
{
  "message": "Quantity Decremented Successfully.",
  "cart": [
    ...
  ]
}
```
### POST /users/:userId/wishlist
Move an item from cart to wishlist
**Sample Response:**
```
{
  "message": "Product moved to wishlist",
  "wishlist": [
    ...
  ]
}
```
### POST /addresses
Add a new address.

**Sample Response:**
```
{ 
  "message": "Address added successfully",              
  "address": { ... } 
}
```
### GET /addresses
Get all addresses

**Sample Response:**
```
[
  {
    "_id": "6489f1c3a1b2c3d4e5f67890",
    "user": "645d2f6a2f4e7b8c9d0a1234",
    "name": "John Doe",
    "mobile": 1234567890,
    "pincode": 62704,
    "city": "Springfield",
    "state": "IL",
    "address": "123 Maple Street, Apt 4B",
    "createdAt": "2025-06-15T12:34:56.789Z",
    "updatedAt": "2025-06-15T12:34:56.789Z"
  }, 
  ...
]

```
### GET /addresses/:userId
Get addresses for a specific user.

**Sample Response:**
```
[
  { "_id": "...", "user": "USER_ID", "street": "...", ... },
  ...
]
```
### DELETE /addresses/:addressId
Delete a specific address.

**Sample Response:**
```
{
  "message": "Address deleted successfully.",
  "deletedAddress": { ... }
}
```
### POST /addresses/:addressId
Update an address by ID
**Sample Response:**
```
{
  "message": "Address updated successfully.",
  "address": { ... }
}
```
### GET /orders
Get all orders.

**Sample Response:**
```
[
 {
  "_id": "6490a123b4c5d6789ef01234",
  "user": "645d2f6a2f4e7b8c9d0a1234",
  "cart": [
    {
      "product": "646f3d2a9a1e2b3456c78901",
      "quantity": 2,
      "size": "M"
    },
    {
      "product": "646f3d2a9a1e2b3456c78902",
      "quantity": 1,
      "size": "L"
    }
  ],
  "totalAmount": 149.99,
  "deliveryAddress": "6489f1c3a1b2c3d4e5f67890",
  "orderStatus": "Pending",
  "createdAt": "2025-06-17T10:45:00.000Z",
  "updatedAt": "2025-06-17T10:45:00.000Z"
 },
 ...
]
```
### POST /orders
Create a new order.

**Sample Response:**
```
{
  "message": "Order added successfully",
  "order": { ... }
}
```
### POST /users
Register a new user.

**Sample Response:**
```
{
  "message": "User added successfully",
  "user": { ... }
}
```

### POST /login
User login and token generation.

**Sample Response:**
```
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```
### POST /users/loggedIn
Fetch user data (requires token).

**Sample Response:**
```
{
  "message": "User updated successfully.",
  "user": { ... }
}
```

### POST /users/:userId
Update user data.

**Sample Response:**
```
{
  "message": "User updated successfully",
  "user": { ... }
}
```

### POST /users/:userId/cart/clear
Clear the user's cart.

**Sample Response:**
```
{ "message": "Cart updated successfully" }
```

## Contact
For bugs or feature requests, please reach out to manojreddy2571@gmail.com