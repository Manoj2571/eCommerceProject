import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAlertMessage } from "../features/products/productsSlice";
import { pushLoggedInUserDataAsync } from "../features/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loggedInUser, users } = useSelector((state) => state.users);

  console.log(users);

  const { cart, wishlist } = loggedInUser;

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(
        "https://major-project-1-phi.vercel.app/login",
        {
          email,
          password,
          rememberMe,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const token = response.data.token;
        Cookies.set("Jtoken", token, {
          secure: true,
          expires: rememberMe ? 7 : 1 / 96,
        });
      })
      .then(() => {
        const token = Cookies.get("Jtoken");
        dispatch(pushLoggedInUserDataAsync({ cart, wishlist, token }));
        navigate("/", { replace: true });
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setAlertMessage(error.response.data.message));
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <main>
      <div className="container align-items-center col-12 col-md-7 col-lg-4 mt-5">
        <div className="border bg-white mb-4" style={{ borderRadius: "5px" }}>
          <h2 className="text-center fw-bold pt-2 mt-3">Login</h2>
          <form className="pt-3 px-5" onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              className="form-control mb-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="d-flex flex-wrap justify-content-between my-4">
              <label>
                <input
                  type="checkbox"
                  onChange={() => setRememberMe(!rememberMe)}
                />{" "}
                Remember Me
              </label>
              <label className="text-end">Forgot your password?</label>
            </div>
            <button
              className="border-0 text-white py-2"
              type="submit"
              style={{ width: "100%", backgroundColor: "#13294b" }}
              disabled={loading}
            >
              Login
            </button>
          </form>
          <Link
            className="text-dark pb-3"
            to="/registerUser"
            style={{ textDecoration: "none" }}
          >
            <p className="text-center mt-3">New Here? Create an account</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
