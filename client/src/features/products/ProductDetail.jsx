import { addToCartAsync, updateWishlistAsync } from "../users/usersSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlertMessage } from "./productsSlice";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { productId } = useParams();

  const productData = products.find((product) => product._id == productId);

  const { loggedInUser, isUserLoggedIn } = useSelector((state) => state.users);

  const productIndex = loggedInUser.wishlist.findIndex(
    (product) => product == productData._id
  );

  const color = productIndex != -1 ? "#FF0000" : "#FFFFFF";

  const [colorCode, setColorCode] = useState(color);
  const [isSizeSelected, setIsSizeSelected] = useState({
    size: "",
    sizeSelected: false,
  });
  const [quantity, setQuantity] = useState(1);

  const quantityIncrementHandler = (product) => {
    setQuantity(quantity + 1);

  };

  const quantityDecrementHandler = (product) => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const addItemToCartHandler = () => {
  if (isUserLoggedIn) {
    if (isSizeSelected.sizeSelected) {
      try {
        dispatch(
          addToCartAsync({
            product: productData._id,
            quantity: quantity,
            size: isSizeSelected.size,
          })
        );
        dispatch(setAlertMessage("Item added to cart!"));
        setIsSizeSelected({ size: "", sizeSelected: false });
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        dispatch(setAlertMessage("Failed to add item to cart. Please try again."));
      }
    } else {
      dispatch(setAlertMessage("Please select a size before adding to cart."));
    }
  } else {
    navigate("/login");
  }
};


  const buyNowHandler = async () => {
  if (isUserLoggedIn) {
    if (isSizeSelected.sizeSelected) {
      try {
         dispatch(
          addToCartAsync({
            product: productData._id,
            quantity: quantity,
            size: isSizeSelected.size,
          })
        );

        dispatch(setAlertMessage("Item added to cart!"));
        navigate("/cart");
      } catch (error) {
        console.error("Error adding item to cart:", error);
        dispatch(setAlertMessage("Failed to add item to cart. Please try again."));
      }
    } else {
      dispatch(setAlertMessage("Please select a size before continuing."));
    }
  } else {
    navigate("/login");
  }
};

  const addItemToWishlist = async () => {
  try {
    const isAdding = colorCode === "#FFFFFF";
    setColorCode(isAdding ? "#FF0000" : "#FFFFFF");

    dispatch(updateWishlistAsync({ product: productData._id }));
    
    dispatch(
      setAlertMessage(
        isAdding ? "Item added to wishlist!" : "Item removed from wishlist!"
      )
    );
  } catch (error) {
    console.error("Failed to update wishlist:", error);
    dispatch(setAlertMessage("Failed to update wishlist. Please try again."));
  }
};

  return (
    <div className="container">
      <div className="row d-flex justify-content-evenly">
        <div className="col-sm-3 mt-5">
          <div className="card border border-0">
            <img
              src={productData.imageUrl}
              alt={productData.name}
              style={{ width: "100%" }}
              className="img-fluid align-self-center position-relative"
            />
            <svg
              className="position-absolute top-0 end-0 me-2 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              stroke="black"
              viewBox="0 0 24 24"
              onClick={() => addItemToWishlist()}
            >
              <path
                fill={color}
                d="M12 5.881A5.39 5.39 0 0116.05 4C18.822 4 21 6.178 21 8.95c0 3.4-3.055 6.17-7.684 10.367l-.011.01L12 20.515l-1.305-1.179-.036-.032C6.044 15.11 3 12.344 3 8.95 3 6.178 5.178 4 7.95 4A5.39 5.39 0 0112 5.881z"
              ></path>
            </svg>
            <button
              className="btn text-white mt-2 text-center"
              style={{ backgroundColor: "#13294b" }}
              onClick={addItemToCartHandler}
            >
              Add to Cart
            </button>
            <div className="d-grid gap-2 mt-2">
              <button
                className="btn border btn-outline-dark"
                type="button"
                onClick={buyNowHandler}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <h5>{productData.name}</h5>
          <button type="button" className="btn btn-success px-2 py-0 mb-2">
            <small>{productData.rating}</small>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="mb-1 ms-1"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
            </svg>
          </button>
          <h5 className="">₹ {productData.price}</h5>
          <div className="fw-medium">
            Quantity:{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFF"
              className="mb-1"
              onClick={() => quantityDecrementHandler(productData)}
            >
              <path d="M288-444h384v-72H288v72ZM480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
            </svg>{" "}
            <span className="border px-2 border-dark">{quantity}</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFF"
              className="mb-1"
              onClick={() => quantityIncrementHandler(productData)}
            >
              <path d="M444-288h72v-156h156v-72H516v-156h-72v156H288v72h156v156Zm36.28 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
            </svg>
          </div>
          <div className="mt-2 fw-medium">
            Size:
            {productData.sizeAvailability.map((size, index) => (
              <button
                key={index}
                className={
                  isSizeSelected.size == size.size
                    ? "px-1 mx-2 size_selected position-relative"
                    : "border px-1 border-dark mx-2 bg-white position-relative"
                }
                value={size.size}
                onClick={(e) =>
                  setIsSizeSelected({
                    size: e.target.value,
                    sizeSelected: true,
                  })
                }
              >
                {size.size}
                {size.quantity == 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="255%"
                    height="255%"
                    // fill="currentColor"
                    className="bi bi-slash position-absolute top-50 start-50 translate-middle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <hr />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#5f6368"
              className="ms-4"
            >
              <path d="M240-192q-50 0-85-35t-35-85H48v-408q0-29.7 21.15-50.85Q90.3-792 120-792h552v144h120l120 168v168h-72q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-72q20.4 0 34.2-13.8Q288-291.6 288-312q0-20.4-13.8-34.2Q260.4-360 240-360q-20.4 0-34.2 13.8Q192-332.4 192-312q0 20.4 13.8 34.2Q219.6-264 240-264ZM120-384h24q17-23 42-35.5t54-12.5q29 0 54 12.5t41.53 35.5H600v-336H120v336Zm600 120q20.4 0 34.2-13.8Q768-291.6 768-312q0-20.4-13.8-34.2Q740.4-360 720-360q-20.4 0-34.2 13.8Q672-332.4 672-312q0 20.4 13.8 34.2Q699.6-264 720-264Zm-48-192 168-1-85-119h-83v120Zm-310-93Z" />
            </svg>
            <br />
            <span>Free Delivery</span>
          </span>
          <hr />
          <div>
            <div className="fw-medium">Description:</div>
            <p>{productData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
