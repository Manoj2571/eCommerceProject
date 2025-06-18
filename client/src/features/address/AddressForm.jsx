import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addAddressAsync, updateAddressAsync } from "./addressesSlice";
import { useNavigate, useLocation } from "react-router-dom";

const AddressForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const existing = location.state;

  const navigate = useNavigate();

  const { loggedInUser } = useSelector((state) => state.users);

  const [newAddress, setNewAddress] = useState({
    user: loggedInUser._id,
    name: existing ? existing.name : "",
    pincode: existing ? existing.pincode : null,
    city: existing ? existing.city : "",
    state: existing ? existing.state : "",
    address: existing ? existing.address : "",
    mobile: existing ? existing.mobile : null,
  });

  const addEditAddressHandler = (e) => {
    e.preventDefault();
    existing
      ? dispatch(
          updateAddressAsync({ address: newAddress, addressId: existing._id })
        )
      : dispatch(addAddressAsync(newAddress));
    navigate(-1, { replace: true });
  };

  const navigateBackHandler = () => {
    navigate(-1, { replace: true });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-9 col-lg-8 addAddress23"></div>
        <div className="p-3 rounded addAddress_form col-12 col-lg-4 col-md-5">
          <div className="d-flex justify-content-between">
            <h3>Add Address</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg mt-3"
              viewBox="0 0 16 16"
              onClick={navigateBackHandler}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <hr />
          <h5>Address</h5>
          <form onSubmit={addEditAddressHandler}>
            <label>
              Pincode<span className="mandatory">*</span>
            </label>
            <input
              className="form-control mb-2"
              value={newAddress.pincode}
              type="tel"
              minLength={6}
              maxLength={6}
              onChange={(e) => {
                setNewAddress({ ...newAddress, pincode: e.target.value });
              }}
              required
            />
            <div className="d-flex justify-content-between mb-3">
              <label>
                City<span className="mandatory">*</span>
                <input
                  className="form-control"
                  value={newAddress.city}
                  onChange={(e) => {
                    setNewAddress({ ...newAddress, city: e.target.value });
                  }}
                  required
                />
              </label>
              <span>&nbsp;</span>
              <label>
                State<span className="mandatory">*</span>
                <input
                  className="form-control"
                  value={newAddress.state}
                  onChange={(e) => {
                    setNewAddress({ ...newAddress, state: e.target.value });
                  }}
                  required
                />
              </label>
            </div>
            <label>
              Road Name/Area/Colony<span className="mandatory">*</span>
            </label>
            <textarea
              className="form-control"
              value={newAddress.address}
              style={{ resize: "none" }}
              onChange={(e) => {
                setNewAddress({ ...newAddress, address: e.target.value });
              }}
              required
            ></textarea>
            <h5 className="mt-3">Contact</h5>
            <label>
              Name<span className="mandatory">*</span>
            </label>
            <input
              className="form-control"
              value={newAddress.name}
              onChange={(e) => {
                setNewAddress({ ...newAddress, name: e.target.value });
              }}
              required
            />
            <label>
              Phone<span className="mandatory">*</span>
            </label>
            <input
              type="tel"
              className="form-control"
              minLength={10}
              maxLength={10}
              value={newAddress.mobile}
              onChange={(e) => {
                setNewAddress({ ...newAddress, mobile: e.target.value });
              }}
              required
            />
            <button
              type="submit"
              className="btn my-3 form-control text-white"
              style={{ backgroundColor: "#13294b" }}
            >
              {existing ? "Edit Address" : "Add Address"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
