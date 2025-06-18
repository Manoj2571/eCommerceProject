import { useState } from "react";
import { updateWishlistAsync, addToCartAsync } from "../users/usersSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlertMessage } from "./productsSlice";

const Product = ({ productData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const { pathname } = location;
  const { loggedInUser, isUserLoggedIn } = useSelector((state) => state.users);

  const productIndex = loggedInUser.wishlist.findIndex(
    (product) => product == productData._id
  );

  const color = productIndex != -1 ? "#FF0000" : "#FFFFFF";

  const [displaySizeSelect, setDisplaySizeSelect] = useState(false);
  const [colorCode, setColorCode] = useState(color);

  const addItemToWishlist = async () => {
    try {
      if (isUserLoggedIn) {

        dispatch(updateWishlistAsync({ product: productData._id }));
      if (colorCode === "#FFFFFF") {
        setColorCode("#FF0000");
        dispatch(setAlertMessage("Item added to wishlist!"));
      } else {
        setColorCode("#FFFFFF");
        dispatch(setAlertMessage("Item removed from wishlist!"));
}
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCart = async () => {
    try {
      if (isUserLoggedIn) {
        setDisplaySizeSelect(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSizeSelect = (e) => {
    try {
      setDisplaySizeSelect(false);
      dispatch(
        addToCartAsync({
          product: productData._id,
          quantity: 1,
          size: e.target.value,
        })
      );
      dispatch(setAlertMessage("Item added to your cart!"))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-3">
      <div className="card border border-0">
        <Link
          style={{ textDecoration: "none" }}
          to={`/productDetail/${productData._id}`}
          state={productData}
        >
          <img
            src={productData.imageUrl}
            alt={productData.name}
            className="img-fluid"
            style={{ width: "100%" }}
          />
        </Link>
        {pathname.includes("wishlist") ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="position-absolute top-0 end-0 me-2 mt-2"
            viewBox="0 0 24 24"
            onClick={() => addItemToWishlist()}
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        ) : (
          <svg
            className="position-absolute top-0 end-0 me-2 mt-2"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            stroke="black"
            viewBox="0 0 24 24"
            onClick={() => addItemToWishlist()}
          >
            <path
              fill={colorCode}
              d="M12 5.881A5.39 5.39 0 0116.05 4C18.822 4 21 6.178 21 8.95c0 3.4-3.055 6.17-7.684 10.367l-.011.01L12 20.515l-1.305-1.179-.036-.032C6.044 15.11 3 12.344 3 8.95 3 6.178 5.178 4 7.95 4A5.39 5.39 0 0112 5.881z"
            ></path>
          </svg>
        )}
        <div className="position-absolute top-0 start-0  px-2  ms-2 mt-2 bg-white rounded">
          {productData.rating}{" "}
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
        </div>
        <small
          className="mt-0 card-text text-center fw-medium"
          style={{ fontSize: "95%", textWrap: "nowrap" }}
        >
          {productData.name}
        </small>
        <div className="card-text text-center">₹ {productData.price}</div>

        {displaySizeSelect ? (
          <div
            className="p-2 mt-1 border rounded d-flex flex-wrap justify-content-evenly gap-2 align-items-center"
            // style={{ maxWidth: "100%" }}
          >
            {productData.sizeAvailability.map((size, index) => (
              <button
                key={index}
                className="px-1 size position-relative text-nowrap"
                value={size.size}
                onClick={handleSizeSelect}
                disabled={size.quantity == 0}
              >
                {size.size}
                {size.quantity == 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240%"
                    height="240%"
                    // fill="currentColor"
                    className="bi bi-slash position-absolute top-50 start-50 translate-middle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0" />
                  </svg>
                )}
              </button>
            ))}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-x "
                viewBox="0 0 16 16"
                onClick={() => setDisplaySizeSelect(false)}
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </span>
          </div>
        ) : (
          <button
            className="btn text-white mt-1 py-2 text-center"
            style={{ backgroundColor: "#13294b", maxWidth: "100%" }}
            onClick={() => addItemToCart(productData)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
