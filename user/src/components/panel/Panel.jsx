import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/user/api";
// import { getBlog } from "../../../redux/blog/api";
import { AiOutlineMenu } from "react-icons/ai";
import { logout } from "../../redux/auth";

const Panel = () => {
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
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <div>
        <h1>Panel</h1>
      </div>
    </section>
  );
};

export default Panel;
