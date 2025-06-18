import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrders } from "./orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orders);

  const { loggedInUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const userOrders = orders.filter((order) => order.user == loggedInUser._id);

  return (
    <div className="pt-2 px-4 border">
      <h4 className="mt-2">My Orders</h4>

      {status == "success" &&
        userOrders?.map((currentOrder) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            key={currentOrder._id}
          >
            <div className="border p-3 mt-3">
              <div className="d-flex justify-content-between">
                <span>
                  <strong>Order Id:</strong>
                  <div>{currentOrder._id}</div>
                </span>
                <span>
                  <strong>Placed on:</strong>
                  <div>
                    {new Date(currentOrder.createdAt).toLocaleDateString()}
                  </div>
                </span>
              </div>
              <h5 className="mt-3">
                Current Status: {currentOrder.orderStatus}
              </h5>
              {currentOrder.cart.map((cartItem, index) => (
                <div
                  className="d-flex justify-content-between mt-3 px-3"
                  key={index}
                >
                  <img
                    src={cartItem.product.imageUrl}
                    height="55px"
                    width="45px"
                  />
                  <span>
                    <h6>{cartItem.product.name} </h6>
                    <h6>
                      Quantity: {cartItem.quantity} size: {cartItem.size}
                    </h6>
                  </span>
                  <h6>
                    &#8377;
                    {cartItem.quantity * cartItem.product.price}
                  </h6>
                </div>
              ))}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MyOrders;
