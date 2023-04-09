import React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../redux/auth";
// import axiosI from "../../redux/axios";
// import Users from "../users/Users";
// import AllBlog from "../allblogs/AllBlogs";

const Home = () => {
  // const [blogs, setBlogs] = useState([]);

  // const getAllBlogs = async () => {
  //   try {
  //     const url = process.env.REACT_APP_API_URL + "/blog/";
  //     const { data } = await axiosI.get(url);
  //     const array1 = data.data.splice(0, 12);
  //     setBlogs(array1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllBlogs();
  // }, []);

  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   window.location = "/login";
  // };
  return (
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <div>
        <h1>Home Page</h1>
      </div>
    </section>
  );
};

export default Home;
