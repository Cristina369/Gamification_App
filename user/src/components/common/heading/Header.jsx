import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/user/api";
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
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    window.location = "/";
  };

  return (
    <>
      <section className="bg-white w-2/12 flex flex-col h-full fixed pl-6 justify-center border-r border-blue-900">
        <div>
          <ul>
            <li
              className="absolute top-10 text-[84px] ml-4 font-extrabold logo"
              tabIndex="-1"
              id="menu-item-0"
            >
              <Link to="/panel">BLUE</Link>
            </li>
            {/* <li className="nav-link w-full" tabIndex="-1" id="menu-item-0">
              <NavLink
                to="/panel"
                onClick={() => {
                  setActive(!active);
                  setOpen(!open);
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "border-l-4 border-primary pl-3 my-6 w-full py-2"
                    : ""
                }
              >
                Panel
              </NavLink>
            </li> */}
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <NavLink
                to="/profile"
                onClick={() => {
                  setActive(!active);
                  setOpen(!open);
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "border-l-4 border-primary pl-3 my-6 w-full py-2"
                    : ""
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <NavLink
                to="/all-quests"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "border-l-4 border-primary pl-3 my-6 w-full py-2"
                    : ""
                }
              >
                All Quests
              </NavLink>
            </li>
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <NavLink
                to="/my-quests"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "border-l-4 border-primary pl-3 my-6 w-full py-2"
                    : ""
                }
              >
                My Quests
              </NavLink>
            </li>
            {/* <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <Link
                to="/finished-quests"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
              >
                Finished Quests
              </Link>
            </li> */}
            {/* <li className="nav-link links-user">
              <NavLink
                to="/proposed-quest"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "border-l-4 border-blue-400 pl-3 my-6 w-full py-2"
                    : ""
                }
              >
                Proposed Quests
              </NavLink>
            </li> */}
            <li className="nav-link links-user">
              <NavLink
                to="/leaderboard"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "border-l-4 border-primary pl-3 my-6 w-full py-2"
                    : ""
                }
              >
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-link links-user" tabIndex="-1" id="menu-item-0">
              <NavLink
                to="/instructions"
                onClick={() => {
                  setOpen(!open);
                  setActive(!active);
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "border-l-4 border-primary pl-3 my-6 w-full py-2"
                    : ""
                }
              >
                Instructions
              </NavLink>
            </li>
            <li className="nav-link links-user">
              <Link
                onClick={handleLogout}
                className="absolute bottom-10 text-2xl"
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
