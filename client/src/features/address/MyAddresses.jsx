import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteAddressAsync, setDeliveryAddress } from "./addressesSlice";

const MyAddresses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.addresses);
  const { loggedInUser } = useSelector((state) => state.users);

  const userAddresses = addresses.filter(
    (address) => address.user == loggedInUser._id
  );

  return (
    <>
      <div className="container pt-3 pb-2 px-4 border">
        <h4>Manage Addresses</h4>
        <div className="row mt-3">
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
                </div>
              </div>
            </div>
          ))}
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
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
                <div>Add New</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-md-4 mt-4">
            {addAddressClick && <AddressForm />}
          </div> */}
    </>
  );
};

export default MyAddresses;
