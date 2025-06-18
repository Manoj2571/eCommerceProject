import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlertMessage, fetchProducts } from "../products/productsSlice";
import { setCartTotal } from "../order/orderSlice";
import { useEffect } from "react";

import {
  removeFromCartAsync,
  quantityDecrementAsync,
  quantityIncrementAsync,
  moveToWishlistAsync,
} from "../users/usersSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser, isUserLoggedIn } = useSelector((state) => state.users);

  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productsInCart = loggedInUser.cart.map((cartProduct) => {
    const productData = products.find(
      (product) => product._id == cartProduct.product
    );

    return { ...cartProduct, product: productData };
  });

  const cartTotal = productsInCart.reduce((acc, curr) => {
    acc += curr.quantity * curr.product.price;

    return acc;
  }, 0);

  const totalAmount = cartTotal > 1999 ? cartTotal : cartTotal + 99;

  const inStockCheck = productsInCart.reduce((acc, curr) => {
    const availableQuantity = curr.product.sizeAvailability.find(
      (currProduct) => currProduct.size === curr.size
    ).quantity;

    acc = curr.quantity <= availableQuantity ? [...acc, curr] : acc;

    return acc;
  }, []);


  const quantityIncrementHandler = async (productData) => {
    try {
      dispatch(quantityIncrementAsync(productData));
      dispatch(setAlertMessage("Quantity increased!"))
    } catch (error) {
      dispatch(setAlertMessage("Error occured while increment the quantity."))
    }
  };

  const quantityDecrementHandler = async (productData) => {
    try {
      dispatch(quantityDecrementAsync(productData));
      dispatch(setAlertMessage("Quantity decreased."))
    } catch (error) {
      dispatch(setAlertMessage("Error occured while decrementing the quantity."))
    }
  };

  const removefromCartHandler = (product) => {
    try {
      dispatch(removeFromCartAsync(product));
      dispatch(setAlertMessage("Item removed from your cart."))
    } catch (error) {
      dispatch(setAlertMessage("Unknown error occured,please try again."))
    }
  };

  const moveToWishlistHandler = (cartProduct) => {
    try {
      dispatch(
    moveToWishlistAsync({
      product: cartProduct.product._id,
      quantity: cartProduct.quantity,
      size: cartProduct.size,
    }))
    dispatch(setAlertMessage("Item moved to your wishlist!"))
    } catch (error) {

    }
};

  const checkoutHandler = () => {
    if (isUserLoggedIn) {
      if (inStockCheck.length == productsInCart.length) {
        navigate("/address");
        dispatch(setCartTotal(cartTotal));
      } else {
        dispatch(
          setAlertMessage("Few products are out of stock, Update cart.")
        );
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="container">
      <h2 className="text-center my-3">My Cart</h2>
      <div className="row">
        <div className="col-sm-9">
          <div className="row">
            {status == "success" &&
              productsInCart.map((cartProduct, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card mb-3 border border-0">
                    <div className="row">
                      <div className="col-sm-5">
                        <img
                          src={cartProduct.product.imageUrl}
                          className="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div className="col-sm-6">
                        <div>{cartProduct.product.name}</div>
                        <div className="my-1 fw-bold">
                          ₹ {cartProduct.product.price}
                        </div>
                        <div>
                          Quantity:{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#FFFFF"
                            className="mb-1"
                            onClick={() =>
                              quantityDecrementHandler({
                                product: cartProduct.product._id,
                                quantity: cartProduct.quantity,
                                size: cartProduct.size,
                              })
                            }
                          >
                            <path d="M288-444h384v-72H288v72ZM480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                          </svg>{" "}
                          <span className="border px-2 border-dark">
                            {cartProduct.quantity}
                          </span>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#FFFFF"
                            className="mb-1"
                            onClick={() =>
                              quantityIncrementHandler({
                                product: cartProduct.product._id,
                                quantity: cartProduct.quantity,
                                size: cartProduct.size,
                              })
                            }
                          >
                            <path d="M444-288h72v-156h156v-72H516v-156h-72v156H288v72h156v156Zm36.28 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                          </svg>
                        </div>
                        <div>
                          Size: {cartProduct.size}{" "}
                          <span
                            style={{
                              color:
                                cartProduct.product.sizeAvailability.find(
                                  (curr) => curr.size == cartProduct.size
                                ).quantity >= cartProduct.quantity
                                  ? "#008000"
                                  : "#FF0000",
                            }}
                          >
                            (
                            {cartProduct.product.sizeAvailability.find(
                              (curr) => curr.size == cartProduct.size
                            ).quantity >= cartProduct.quantity
                              ? "In Stock"
                              : "Out of Stock"}
                            )
                          </span>
                        </div>
                        <div className="d-flex gap-2 flex-column mt-2">
                          <button
                            className="btn btn-secondary rounded-0  px-3"
                            onClick={() => {
                              removefromCartHandler({
                                product: cartProduct.product._id,
                                quantity: cartProduct.quantity,
                                size: cartProduct.size,
                              });
                            }}
                          >
                            Remove From Cart
                          </button>
                          <button
                            className="btn border-dark rounded-0 px-4"
                            onClick={moveToWishlistHandler(cartProduct)}
                          >
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {loggedInUser.cart.length > 0 && (
          <div className="col-md-3">
            <h5 className="text-center">ORDER DETAILS</h5>
            <hr />
            <div className="d-flex">
              <span>Cart Total</span>
              <span className="ms-auto">₹{cartTotal}</span>
            </div>
            <div className="d-flex">
              <span>Delivery Charges</span>
              <span className="ms-auto">₹{cartTotal > 1999 ? 0 : 99}</span>
            </div>
            <hr />
            <div className="d-flex fw-bold">
              <span>Total Amount</span>
              <span className="ms-auto ">₹{totalAmount}</span>
            </div>
            <hr />
            <div className="d-grid gap-2">
              <button
                className="btn rounded-0 p-2 text-white"
                style={{ backgroundColor: "#13294b" }}
                onClick={checkoutHandler}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
