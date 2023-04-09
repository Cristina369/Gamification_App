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
              <Link to="/blogs" onClick={() => setOpen(!open)}>
                All Quests
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/my-blogs" onClick={() => setOpen(!open)}>
                Finished Quests
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/add-blog" onClick={() => setOpen(!open)}>
                Proposed Quests
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/add-blog" onClick={() => setOpen(!open)}>
                Badges
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
