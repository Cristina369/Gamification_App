import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/user/api";
// import { getBlog } from "../../../redux/blog/api";
import { AiOutlineMenu } from "react-icons/ai";
import { logout } from "../../../redux/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let token = null;
    const root = JSON.parse(window.localStorage.getItem("persist:root"));

    if (root) {
      const { auth } = root;
      const { user } = JSON.parse(auth);
      if (user) token = user.token;
    }

    if (user && token) {
      getUser(user._id, dispatch);
      // getBlog(dispatch);
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    window.location = "/login";
  };

  return (
    <>
      <section className="shadow-md w-full fixed top-0 left-0 z-50">
        <div className="tablet:flex items-center justify-around  bg-white py-8 tablet:pl-20 tablet:pr-0  px-7 desktop:px-40">
          <div className="absolute desktop:top-10 desktop:left-16 tablet:top-11 tablet:left-4 mobile:top-4">
            <Link
              to="/"
              onClick={() => setOpen(!open)}
              className="desktop:text-4xl desktop:font-normal tablet:text-3xl mobile:text-3xl "
            >
              BLUE
            </Link>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer tablet:hidden"
          >
            <AiOutlineMenu name={open ? "close" : "menu"} />
          </div>
          <ul
            className={`tablet:flex tablet:gap-7 items-center tablet:pb-0  mobile:h-[100vh] tablet:h-auto pt-20 absolute tablet:static bg-white tablet:z-auto z-[-1] left-0  w-full tablet:w-auto tablet:pl-0 transition-all duration-500 ease-in tablet:py-0  mobile:text-center tablet:text-left mobile:px-0 ${
              open ? "top-14" : "top-[-630px]"
            }`}
          >
            <li className="nav-link">
              <Link to="/" onClick={() => setOpen(!open)}>
                Home
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/about" onClick={() => setOpen(!open)}>
                About
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/all-blogs" onClick={() => setOpen(!open)}>
                Blogs
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/contact" onClick={() => setOpen(!open)}>
                Contact
              </Link>
            </li>
            {user ? (
              <div className="tablet:flex">
                <div className="relative inline-block text-left tablet:absolute tablet:top-6 tablet:right-20 desktop:right-24 mobile:relative">
                  <div>
                    <button
                      type="button"
                      className=" tablet:font-thin tablet:text-xl flex w-full justify-center items-center tablet:rounded-md tablet:border tablet:border-solid tablet:border-gray-300 tablet:bg-white px-4 py-2 tablet:shadow-sm tablet:hover:bg-gray-50 tablet:focus:outline-none tablet:focus:ring-2 tablet:focus:ring-indigo-500 tablet:focus:ring-offset-2 tablet:focus:ring-offset-gray-100 mobile:font-extralight mobile:text-3xl mt-4 mobile:focus:none mobile:shadow-none mobile:border-none desktop:text-2xl"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      onClick={() => setActive(!active)}
                    >
                      Actions
                      <svg
                        className="-mr-1 ml-2 h-5 w-5 "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={`tablet:absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mobile:shadow-none mobile:ring-white mobile:inherit tablet:ring-gray-200 ${
                      active ? "display " : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div
                      className="py-1 mobile:flex mobile:flex-col mobile:justify-center mobile:items-center"
                      role="none"
                    >
                      <li
                        className="nav-link links-user"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        <Link
                          to="/profile"
                          onClick={() => {
                            setActive(!active);
                            setOpen(!open);
                          }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li
                        className="nav-link links-user"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        <Link
                          to="/blogs"
                          onClick={() => {
                            setOpen(!open);
                            setActive(!active);
                          }}
                        >
                          My Blogs
                        </Link>
                      </li>
                      <li className="nav-link links-user">
                        <Link
                          to="/add-blog"
                          onClick={() => {
                            setOpen(!open);
                            setActive(!active);
                          }}
                        >
                          Add new blog
                        </Link>
                      </li>
                      <li className="nav-link links-user">
                        <Link
                          to="/login"
                          onClick={() => {
                            setOpen(!open);
                            setActive(!active);
                            handleLogout();
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-2 absolute desktop:right-[5vw] tablet:right-[2vw] tablet:gap-[2px]">
                <li className=" links-l">
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className=" links-l">
                  <Link to="/login">Login</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
