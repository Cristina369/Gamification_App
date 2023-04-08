import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosI from "../../redux/axios";
// import LBlogs from "./LBlogs";
// import Blogs from "./Blogs";
// import AllBlogsC from "../allblogs/AllBlogsC";
// import ContactInfo from "../contact/ContactInfo";

const Home = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/users/";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 10);
      setUsers(array1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <section className="mobile:mt-16 mobile:pt-4 tablet:mt-20 tablet:pt-8">
        <div className="homepage relative z-0">
          <h1 className="font-medium pb-60 pt-44 text-center px-24 mobile:px-5 tablet:px-24">
            <div className="py-28 backdrop-opacity-10 backdrop-invert bg-white/50">
              <h1 className="text-black font-light mobile:text-3xl desktop:text-7xl">
                Your future is here.
              </h1>
              <h2 className="text-black font-light mobile:text-4xl desktop:text-8xl">
                Are you ready to touch it ?
              </h2>
            </div>
          </h1>
        </div>
        <div>
          {users
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map((user, index) => (
              <Link to={`/users/${user._id}`}>
                <div key={index}>
                  <div>
                    <h1>{user.firstName}</h1>
                    <h2>{user.lastName}</h2>
                  </div>
                  <div className="flex flex-row justify-center items-center mt-10">
                    <h1>{user.points}</h1>
                  </div>
                  {/* <h2>{blog.content ? blog.content.substring(0, 165) : ""}...</h2> */}
                  <button className="mt-5 border border-gray-200 px-3 py-2 font-extrabold"></button>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};

export default Home;