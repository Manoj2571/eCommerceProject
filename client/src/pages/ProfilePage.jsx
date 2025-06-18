import UserInfo from "../features/users/UserInfo";
import MyAddresses from "../features/address/MyAddresses";
import MyOrders from "../features/order/MyOrders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/users/usersSlice";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.users);
  const [currentView, setCurrentView] = useState("Profile");

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
    Cookies.remove("Jtoken");
  };

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-md-3">
          <div className="d-flex p-2 mb-3 flex-spread border">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
              height="50px"
              width="50px"
            />
            <h5 className="ms-3 align-self-center mt-1">
              Hello, {loggedInUser.firstName}
            </h5>
          </div>

          <div className="border border-bottom-0">
            <button
              className="bts fw-medium"
              style={{
                color: currentView == "Profile" ? "#13294b" : "#21252980",
              }}
              onClick={() => setCurrentView("Profile")}
            >
              PROFILE INFO
            </button>
            <button
              className="bts fw-medium"
              style={{
                color: currentView == "Orders" ? "#13294b" : "#21252980",
              }}
              onClick={() => setCurrentView("Orders")}
            >
              MY ORDERS
            </button>
            <button
              className="bts fw-medium"
              style={{
                color: currentView == "Addresses" ? "#13294b" : "#21252980",
              }}
              onClick={() => setCurrentView("Addresses")}
            >
              ADDRESS MANAGEMENT
            </button>
          </div>

          <div className="my-5 border border-bottom-0">
            <button
              className="bts fw-medium"
              style={{
                color: "#21252980",
              }}
              onClick={logoutHandler}
            >
              LOGOUT
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {currentView == "Profile" && <UserInfo />}
          {currentView == "Addresses" && <MyAddresses />}
          {currentView == "Orders" && <MyOrders />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
