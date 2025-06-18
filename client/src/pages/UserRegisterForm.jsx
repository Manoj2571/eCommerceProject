import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAlertMessage } from "../features/products/productsSlice";
import { addNewUserAsync } from "../features/users/usersSlice";

const UserRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: null,
  });

  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isExistingEmail, setIsExistingEmail] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();
    if (
      isPasswordStrong &&
      !isExistingEmail &&
      newUser.email.length > 0 &&
      newUser.password.length > 0
    ) {
      dispatch(addNewUserAsync(newUser))
        .then((result) => {
          navigate("/login");
        })
        .then((res) =>
          dispatch(setAlertMessage("Account created, Please Login."))
        )
        .catch((error) => {
          dispatch(setAlertMessage("An Error Occured, please try again."));
        });
    } else {
      dispatch(setAlertMessage("Please check Email and Password."));
    }
  };

  const passwordHandler = (e) => {
    const password = e.target.value;
    setNewUser({ ...newUser, password });
    if (
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      /\d/.test(password) &&
      password.length >= 8
    ) {
      setIsPasswordStrong(true);
    } else {
      setIsPasswordStrong(false);
    }
  };

  const emailHandler = (e) => {
    const userIndex = users.findIndex((user) => user.email == e.target.value);
    setNewUser({ ...newUser, email: e.target.value });
    if (userIndex == -1) {
      setIsExistingEmail(false);
    } else {
      setIsExistingEmail(true);
    }
  };

  return (
    <main>
      <div className="container col-12 col-sm-8 col-md-8 col-lg-4 mt-3">
        <div
          className="border bg-white mb-4 px-4"
          style={{ borderRadius: "5px" }}
        >
          <h2 className="text-center fw-bold pt-2 my-3">Register</h2>
          <form onSubmit={registerHandler}>
            <div className="d-flex justify-content-between mb-3">
              <label>
                First Name<span className="mandatory">*</span>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  required
                />
              </label>
              <span>&nbsp;&nbsp;</span>
              <label>
                Last Name<span className="mandatory">*</span>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <label htmlFor="emailInput">
              Email<span className="mandatory">*</span>
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="example@domain.com"
              id="emailInput"
              onChange={emailHandler}
              required
            />
            {newUser.email.length > 0 && isExistingEmail && (
              <>
                <small className="text-danger mt-0">
                  Email already exists!
                </small>
                <br />
              </>
            )}
            <label htmlFor="passwordInput" className="mt-3">
              Password<span className="mandatory">*</span>
            </label>
            <input
              className="form-control"
              type="password"
              id="passwordInput"
              // onChange={(e) =>
              //   setNewUser({ ...newUser, password: e.target.value })
              // }
              onChange={passwordHandler}
              required
            />
            {newUser.password.length > 0 && !isPasswordStrong && (
              <>
                <small className="text-danger mt-0">
                  Password must include atleast 1 lowercase, 1 uppercase, 1
                  number, 1 special Character and Min. 8 characters.
                </small>
                <br />
              </>
            )}
            {/* {newUser.password.length > 0 && isPasswordStrong && (
              <>
                <small className="text-success mt-0">Strong password</small>
                <br />
              </>
            )} */}
            <label htmlFor="numberInput" className="mt-3">
              Phone Number<span className="mandatory">*</span>
            </label>
            <input
              className="form-control mb-3"
              type="tel"
              maxLength="10"
              minLength="10"
              id="numberInput"
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              required
            />
            <button
              className="w-100 border-0 p-2 text-white"
              style={{ backgroundColor: "#13294b" }}
              type="submit"
            >
              Register
            </button>
          </form>
          <Link
            className="text-dark pb-3"
            to="/login"
            style={{ textDecoration: "none" }}
          >
            <p className="text-center mt-3">Existing User? Login</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UserRegisterForm;
