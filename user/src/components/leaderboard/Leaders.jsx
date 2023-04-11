import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosI from "../../redux/axios";
import Image from "./../../images/profile.jpg";

const Leaders = () => {
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
    <section className="my-10 w-10/12">
      <div className="mb-14">
        <div className="w-full grid grid-cols-3 grid-rows-1 gap-5">
          {users
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map((user, index) => (
              <Link
                to={`/users/${user._id}`}
                className={` grid w-11/12 p-6 border border-gray-200 rounded-lg shadow hover:bg-blue-100 ${
                  index + 1 === 1
                    ? "bg-blue-300 col-start-2 col-end-3  row-end-1 row-start-1 -mt-10 mb-10"
                    : "bg-blue-200 col-start-auto col-end-auto row-end-1 row-start-1"
                }`}
              >
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center${
                    index + 1 === 1 ? "" : ""
                  }`}
                >
                  <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 ">
                    {index + 1}
                  </h5>
                  <div class="flex-shrink-0">
                    <img
                      class="w-20 h-20 rounded-full object-cover"
                      src={Image}
                      alt="Neil image"
                    />
                  </div>
                  <p class="font-normal text-gray-700">
                    {user.firstName}
                    <span className="ml-[4px]">{user.lastName}</span>
                  </p>
                  <p class="font-normal text-gray-700 text-2xl">
                    {user.points}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Leaders;
