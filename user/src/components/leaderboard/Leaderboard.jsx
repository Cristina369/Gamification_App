import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosI from "../../redux/axios";
// import LBlogs from "./LBlogs";
// import Blogs from "./Blogs";
// import AllBlogsC from "../allblogs/AllBlogsC";
// import ContactInfo from "../contact/ContactInfo";

const Leaderboard = () => {
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
      <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
        <h1 className="text-black text-lg">Leaderboard</h1>
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
                  <div>
                    <h1>{user.points}</h1>
                    <h2>-----</h2>
                  </div>
                  {/* <h2>{blog.content ? blog.content.substring(0, 165) : ""}...</h2> */}
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
