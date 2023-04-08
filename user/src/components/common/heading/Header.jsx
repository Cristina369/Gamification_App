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
      <section className="bg-white w-2/12 flex flex-col h-full fixed pl-6 justify-center border-r border-black">
        <div>
          <ul>
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
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
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <Link
                to="/all-quests"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
              >
                All Quests
              </Link>
            </li>
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <Link
                to="/blogs"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
              >
                My Quests
              </Link>
            </li>
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <Link
                to="/blogs"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
              >
                Finished Quests
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
                Proposed Quests
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
                Leaderboard
              </Link>
            </li>
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <Link
                to="/blogs"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
              >
                Instructions
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
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
