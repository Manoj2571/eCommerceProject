import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteAddressAsync, setDeliveryAddress } from "./addressesSlice";
import { updateProductStockAsync } from "../products/productsSlice";
import { addOrderAsync } from "../order/orderSlice";
import { clearCartAsync } from "../users/usersSlice";

const AddressManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.users);
  const { addresses, deliveryAddress } = useSelector(
    (state) => state.addresses
  );
  const { cartTotal } = useSelector((state) => state.orders);

  const userAddresses = addresses.filter(
    (address) => address.user == loggedInUser._id
  );

  const deliveryHandler = async (address) => {
    dispatch(setDeliveryAddress(address));

    const order = {
      user: loggedInUser._id,
      cart: loggedInUser.cart,
      totalAmount: cartTotal,
      deliveryAddress,
    };

    const userCart = { cart: loggedInUser.cart };

    dispatch(updateProductStockAsync(userCart));
    dispatch(addOrderAsync(order));
    dispatch(clearCartAsync({ userId: loggedInUser._id }));
    navigate("/order");
  };

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <h1>Choose Address</h1>
          <p>
            Detailed address will help our delivery partner reach your doorstep
            quickly
          </p>
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-3">
              <div
                className="addAddress_card p-3"
                onClick={() => navigate("/addressForm")}
                style={{ height: "100%" }}
              >
                <div className="text-center fw-bold  p-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-plus-lg text-center"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                    />
                  </svg>
                  <div>Add New Address</div>
                </div>
              </div>
            </div>
            {userAddresses.map((address) => (
              <div className="col-md-6 col-lg-4 mb-3" key={address._id}>
                <div
                  className="card p-3"
                  style={{
                    height: "100%",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="fw-medium fs-5">{address.name}</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-x mt-1"
                      viewBox="0 0 16 16"
                      onClick={() => dispatch(deleteAddressAsync(address))}
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </div>

                  <div>{address.address}</div>
                  <div>
                    {address.city}, {address.state}-{address.pincode}
                  </div>
                  <div>mobile: {address.mobile}</div>
                  <div className="mt-3">
                    <Link
                      className="btn me-3 text-white"
                      style={{ backgroundColor: "#13294b" }}
                      to="/addressForm"
                      state={address}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn text-white"
                      style={{ backgroundColor: "#13294b" }}
                      onClick={() => deliveryHandler(address)}
                    >
                      Deliver Here
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="col-md-4 mt-4">
            {addAddressClick && <AddressForm />}
          </div> */}
      </div>
    </>
  );
};

export default AddressManagement;
