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
      <section className="bg-white w-2/12 flex flex-col h-full fixed pl-6 justify-center border-r border-black">
        <div>
          <ul>
            <li className="nav-link">
              <Link to="/" onClick={() => setOpen(!open)}>
                Panel
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/users" onClick={() => setOpen(!open)}>
                Users
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/leaderboard" onClick={() => setOpen(!open)}>
                Leaderboard
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/all-quests" onClick={() => setOpen(!open)}>
                All Quests
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/finished-quests" onClick={() => setOpen(!open)}>
                Finished Quests
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/proposed-quests" onClick={() => setOpen(!open)}>
                Proposed Quests
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/accepted-quests" onClick={() => setOpen(!open)}>
                Accepted Quests
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/badges" onClick={() => setOpen(!open)}>
                Badges
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
