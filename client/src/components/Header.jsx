import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchInput,
  clearSearch,
} from "../features/products/productsSlice";
import Cookies from "js-cookie";
import { pushLoggedInUserDataAsync } from "../features/users/usersSlice";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const searchPlaceholder = pathname.includes("/categories")
    ? `Search ${pathname.substring(12)}`
    : "Search";

  const { loggedInUser, isUserLoggedIn } = useSelector((state) => state.users);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const token = Cookies.get("Jtoken");
    const { cart, wishlist } = loggedInUser;
    if (token) {
      dispatch(pushLoggedInUserDataAsync({ cart, wishlist, token }));
    }
  }, []);

  const searchInputHandler = (value) => {
    setSearchInput(value);
    dispatch(updateSearchInput(value));
  };

  const clearSearchHandler = () => {
    setSearchInput("");
    dispatch(clearSearch());
  };

  return (
    <header className="">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="col-12 col-lg-6 col-sm-6 col-md-6 d-flex jusity-content-between">
            <NavLink to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="50"
                aria-hidden="true"
                className="iconify iconify--noto mt-3"
                transform="scale(-1 1)"
                viewBox="-12.8 -12.8 153.6 153.6"
                onClick={() => clearSearchHandler()}
              >
                <rect
                  width="153.6"
                  height="153.6"
                  x="-12.8"
                  y="-12.8"
                  fill="#b83143"
                  strokeWidth="0"
                  rx="76.8"
                ></rect>
                <g>
                  <path
                    fill="none"
                    stroke="#fef3ea"
                    strokeMiterlimit="10"
                    strokeWidth="1.792"
                    d="M26.96 39.45c-.75-5.68-2.02-15.69-1.18-21.2s3.04-10.59 7.63-12.6c3.97-1.73 8.92.1 11.78 4.38 1.63 2.44 2.56 5.45 3.35 8.43 1.35 5.12 2.64 12.12 3.29 17.39"
                  ></path>
                  <path
                    fill="#fef3ea"
                    d="M30.71 116.64L6.54 106.57l5.61-24.74-1.2-56.38 61.16-7.18v5.34l14.55 1.84z"
                  ></path>
                  <path
                    fill="#fef3ea"
                    d="M91.85 107.44L30.7 116.7l-5.2-32.38V34.7l61.16-9.25v49.61z"
                  ></path>
                  <path
                    fill="#fef3ea"
                    d="M25.5 34.7v-5.58l-14.55-3.67 61.28-6.8 1.96 4.34 12.47 2.46z"
                  ></path>
                  <path
                    fill="#b83143"
                    d="M6.54 106.57c.42 0 14.48-11.15 14.48-11.15l9.68 21.28-2.08-33.93-3.15-48.07-4.09 51.95-14.84 19.92z"
                  ></path>
                  <path
                    fill="#b83143"
                    d="M72.05 19.29l1.48 3.42.19.45.47.12 7.45 1.91-55.14 8.35v-5.2l-.76-.19-9.28-2.34 55.59-6.52m.63-1.08l-61.72 7.24 14.55 3.67v5.59l61.15-9.26-12.21-3.14-1.77-4.1z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fefff1"
                    strokeMiterlimit="10"
                    strokeWidth="1.792"
                    d="M43.95 38.45C43.2 32.78 35.39 11 50.34 8.22c11.3-2.1 16.29 21.97 16.95 27.25"
                  ></path>
                  <path
                    fill="#fefff1"
                    d="M45.81 40.03c-.87-2.93-1.78-8.85-1.82-9.11l2.96-.45c.01.06 1.07 6.1 2.23 8.93l-3.37.63zM69.13 36.48c-.87-2.93-1.78-8.85-1.82-9.11l2.96-.45c.01.06 1.24 6.2 2.27 8.94l-3.41.62zM46.84 114.26l8.4-14.55-4.01-38.79 33.57-6.53-18 56.89z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fefff1"
                    strokeMiterlimit="10"
                    strokeWidth="1.792"
                    d="M73.07 57.05s-3.78-20.07 8.81-18.74c6.85.72 6.57 16.65 6.57 16.65"
                  ></path>
                  <path
                    fill="#d7578a"
                    d="M74.46 123.99l-18.57-7.77 4.32-19.02-.92-43.34 47-5.52v4.11l11.18 1.41z"
                  ></path>
                  <path
                    fill="#fefff1"
                    d="M121.46 116.88l-47 7.12-3.99-24.89V60.98l47-7.12V92z"
                  ></path>
                  <path
                    fill="#fefff1"
                    d="M70.47 60.98l-3.76-2.88-7.42-4.24 47-5.52 4.27 2.69 6.91 2.83z"
                  ></path>
                  <path
                    fill="#fefff1"
                    d="M106.11 49.37l8.05 3.97-43.48 6.58-8.49-5.4 43.92-5.15m.18-1.03l-47 5.52 11.18 7.12 47-7.12-11.18-5.52z"
                  ></path>
                  <path
                    fill="#d7578a"
                    d="M86.36 64.81c-.67-2.24-1.36-6.79-1.39-6.98l2.64-.34c.01.05.68 4.63 1.3 6.74l-2.55.58zM104.25 62.06c-.67-2.24-1.36-6.79-1.39-6.98l2.61-.33c.01.05.55 4.77 1.17 6.88l-2.39.43z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fefff1"
                    strokeMiterlimit="10"
                    strokeWidth="1.792"
                    d="M84.88 64.91c-.58-4.36-6.52-22.74 4.68-24.29 8.75-1.21 12.52 16.89 13.03 20.94"
                  ></path>
                  <path
                    fill="#fefff1"
                    d="M55.89 116.22l9.49-8.04L74.46 124l-3.97-24.74.04-38.16-1.12-.46-3.54 38.79z"
                  ></path>
                </g>
              </svg>
            </NavLink>
            <div
              className="input-group mt-3 ms-3 rounded align-self-center py-0 px-0"
              style={{
                maxHeight: "40px",
                border: "1px solid #b83143",
              }}
            >
              <button className="input-group-text border-0 bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </button>
              <input
                className="form-control border border-0 "
                placeholder={searchPlaceholder}
                value={searchInput}
                onChange={(e) => searchInputHandler(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-lg-2 col-sm-6 col-md-4 mt-3">
            <div
              className="ms-auto d-flex justify-content-between"
              style={{ color: "#b83143" }}
            >
              <NavLink
                to={isUserLoggedIn ? "/profile" : "/login"}
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="#5f6368"
                    className=""
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                  </svg>
                  {isUserLoggedIn && (
                    <span className="ms-2 text-dark">
                      {loggedInUser.firstName}
                    </span>
                  )}
                </div>
              </NavLink>
              <NavLink className="position-relative" to="/wishlist">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  fill="#5f6368"
                  className="ms-3 me-1"
                >
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle text-bg-danger mt-1">
                  {loggedInUser.wishlist.length}
                </span>
              </NavLink>
              <NavLink className="position-relative me-2" to="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  fill="#5f6368"
                  className="ms-4"
                >
                  <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle text-bg-danger mt-1">
                  {loggedInUser.cart.length}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
