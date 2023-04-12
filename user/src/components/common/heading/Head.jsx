import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/user/api";
import { AiOutlineMenu } from "react-icons/ai";
import { logout } from "../../../redux/auth";

const Head = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <section className="shadow-md w-full fixed top-0 left-0 z-50">
        <div className="tablet:flex items-center justify-around  bg-white py-8 tablet:pl-20 tablet:pr-0  px-7 desktop:px-40">
          <div className="absolute desktop:top-10 desktop:left-16 tablet:top-11 tablet:left-4 mobile:top-4">
            <Link
              to="/"
              onClick={() => setOpen(!open)}
              className="desktop:text-4xl desktop:font-normal tablet:text-3xl mobile:text-3xl logo"
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
              <Link to="#" onClick={() => setOpen(!open)}>
                Home
              </Link>
            </li>
            <li className="nav-link">
              <Link to="#" onClick={() => setOpen(!open)}>
                Leaderboard
              </Link>
            </li>
            <li className="nav-link">
              <Link to="#" onClick={() => setOpen(!open)}>
                Instructions
              </Link>
            </li>
            <li className="nav-link">
              <Link to="#" onClick={() => setOpen(!open)}>
                Contact
              </Link>
            </li>
            <div className="flex flex-row gap-2 absolute desktop:right-[5vw] tablet:right-[2vw] tablet:gap-[2px]">
              <li className=" links-l">
                <Link to="/signup">Sign Up</Link>
              </li>
              <li className=" links-l">
                <Link to="/login">Login</Link>
              </li>
            </div>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Head;
