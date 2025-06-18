import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDataAsync } from "./usersSlice";
import { setAlertMessage } from "../products/productsSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.users);

  const [userData, setUserData] = useState({
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    email: loggedInUser.email,
    phone: loggedInUser.phone,
  });

  const [password, setPassword] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);

  const confirmPasswordHandler = (e) => {
    e.target.value == password && e.target.value.length >= 8
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  };

  const passwordHandler = (e) => {
    const password = e.target.value;
    if (
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      /\d/.test(password) &&
      password.length >= 8
    ) {
      setIsPasswordSecure(true);
    } else {
      setIsPasswordSecure(false);
    }

    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(updateUserDataAsync(userData))
      .then((response) => {
        dispatch(setAlertMessage("User Data updated Successfully."));
        setEditDetails(!editDetails);
      })
      .catch((error) =>
        dispatch(
          setAlertMessage("Error occured while updating data, Please try Again")
        )
      );
  };

  const updatePassword = () => {
    if (isPasswordSecure && passwordMatch) {
      dispatch(updateUserDataAsync(userData)).then((response) => {
        dispatch(setAlertMessage("Password Changed Successfully."));
        setChangePassword(!changePassword);
      });
    } else {
      dispatch(setAlertMessage("Check Password."));
    }
  };

  return (
    <main className="pt-2 pb-3  px-4 border">
      <div className="pb-4 border-bottom">
        <div className="d-flex justify-content-between my-2">
          <h4>Profile Information</h4>
          <button
            className="border-0 bg-white"
            onClick={() => setEditDetails(!editDetails)}
          >
            <h6>Edit</h6>
          </button>
        </div>
        <div className="d-flex flex-wrap">
          <div className="col-lg-5 mb-3">
            <label className="border">
              <div className=" text-body-tertiary ms-2">First Name</div>
              <input
                className="profile_input"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                disabled={!editDetails}
              />
            </label>
          </div>
          <div className="col-lg-5 mb-3">
            <label className="border">
              <div className="text-body-tertiary ms-2">Last Name</div>
              <input
                className="profile_input"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                disabled={!editDetails}
              />
            </label>
          </div>
          <div className="col-lg-5 mb-3">
            <label className="border">
              <div className="text-body-tertiary ms-2">Email</div>
              <input
                className="profile_input "
                type="email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                value={userData.email}
                disabled={!editDetails}
              />
            </label>
          </div>
          <div className="col-lg-5 mb-3">
            <label className="border">
              <div className="text-body-tertiary ms-2">Mobile Number</div>
              <input
                className="profile_input "
                type="tel"
                maxLength="10"
                minLength="10"
                id="numberInput"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                disabled={!editDetails}
              />
            </label>
          </div>
        </div>
        {editDetails && (
          <div className="mt-3">
            <button
              className="text-white border-0 px-2 py-1"
              onClick={handleSubmit}
              style={{ backgroundColor: "#13294b" }}
            >
              Save
            </button>
            <button
              className="text-white border-0 px-2 py-1 ms-4"
              onClick={() => setEditDetails(!editDetails)}
              style={{ backgroundColor: "#13294b" }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <span
        className="bg-transparent btn border-0 mt-3 p-0 text-start"
        onClick={() => setChangePassword(!changePassword)}
      >
        <h5>Change Password ?</h5>
      </span>
      <br />
      {changePassword && (
        <div className="d-flex flex-wrap mt-2">
          <div className="col-lg-5 mb-3">
            <label className="border ">
              <div className="ms-2 text-body-tertiary">New Password</div>
              <input
                className="profile_input"
                type="password"
                disabled={!changePassword}
                onChange={passwordHandler}
              />
            </label>
          </div>
          <div className="col-lg-5">
            <label className="border ">
              <div className="ms-2 text-body-tertiary">Confirm Password</div>
              <input
                className="profile_input"
                type="password"
                onChange={confirmPasswordHandler}
                disabled={!changePassword}
              />
            </label>
          </div>
        </div>
      )}
      {changePassword && (
        <div className="mt-3">
          {!isPasswordSecure && password && (
            <small className="text-danger mt-0">
              Password must include atleast 1 lowercase, 1 uppercase, 1 number,
              1 special Character and Min. 8 characters.
            </small>
          )}
          {!passwordMatch && (
            <small className="text-danger mt-0">Passwords didn't match</small>
          )}
          <button
            className="text-white border-0 px-2 py-1"
            style={{ backgroundColor: "#13294b" }}
            onClick={updatePassword}
          >
            Save
          </button>
          <button
            className="text-white border-0 px-2 py-1 ms-4"
            style={{ backgroundColor: "#13294b" }}
            onClick={() => setChangePassword(!changePassword)}
          >
            Cancel
          </button>
        </div>
      )}
    </main>
  );
};

export default UserInfo;
