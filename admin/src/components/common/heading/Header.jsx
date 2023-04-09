import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/user/api";
import { getBlog } from "../../../redux/blog/api";
import { logout } from "../../../redux/auth";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location = "/login";
  };

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
      getBlog(dispatch);
    }
  }, [dispatch, user]);

  return (
    <>
      <section className="shadow-md w-full fixed top-0 left-0 z-[100]">
        <div className="tablet:flex items-center justify-around  bg-white py-8 tablet:pl-20 tablet:pr-0  px-7 desktop:px-40">
          <div className="absolute desktop:top-10 desktop:left-16 tablet:top-11 tablet:left-4 mobile:top-4">
            <Link
              to="/"
              onClick={() => setOpen(!open)}
              className="desktop:text-4xl desktop:font-normal tablet:text-3xl mobile:text-3xl "
            >
              THE Retrospective
            </Link>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer tablet:hidden"
          >
            <HiOutlineMenuAlt1 name={open ? "close" : "menu"} />
          </div>
          <ul
            className={`tablet:flex tablet:gap-7 items-center tablet:pb-0  mobile:h-[100vh] tablet:h-auto table:pt-20 mobile:pt-32 absolute tablet:static bg-white tablet:z-auto z-[-1] left-0 w-full tablet:w-auto tablet:pl-0 transition-all duration-500 ease-in tablet:py-0  mobile:text-center tablet:text-left mobile:px-0 ${
              open ? "top-14" : "top-[-630px]"
            }`}
          >
            <li className="nav-link">
              <Link to="/" onClick={() => setOpen(!open)}>
                Home
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/users" onClick={() => setOpen(!open)}>
                Users
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/blogs" onClick={() => setOpen(!open)}>
                Blogs
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/my-blogs" onClick={() => setOpen(!open)}>
                My Blogs
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/add-blog" onClick={() => setOpen(!open)}>
                Add New
              </Link>
            </li>
            <li
              className="nav-link mobile:block tablet:hidden logout"
              onClick={handleLogout}
            >
              Logout
            </li>
            <li>
              <div className="text-left absolute right-20 top-10 mobile:hidden tablet:display">
                <li className="text-2xl px-3 py-2 border-[1px] border-gray-300 ">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
