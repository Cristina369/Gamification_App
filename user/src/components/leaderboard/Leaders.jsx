import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosI from "../../redux/axios";
import Image from "./../../images/avatar-default-svgrepo-com.svg";
import Badge from "../profile/Badge";

const Leaders = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/users/";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 3);
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
                className={` grid w-11/12 p-6 border border-gray-200 rounded-lg shadow hover:bg-third ${
                  index + 1 === 1
                    ? "bg-white col-start-2 col-end-3  row-end-1 row-start-1 -mt-10 mb-10"
                    : "bg-white col-start-auto col-end-auto row-end-1 row-start-1"
                }`}
              >
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center${
                    index + 1 === 1 ? "" : ""
                  }`}
                >
                  <h5 class="text-8xl font-bold tracking-tight text-secondary -mt-16 mb-5 -ml-40">
                    {index + 1}
                  </h5>
                  <div className="flex flex-col">
                    <img
                      className="w-40 h-40 rounded-full object-cover"
                      src={user.image ? user.image : Image}
                      alt="Neil image"
                    />
                    <div className="p-3  rounded-full w-16 h-16 -mt-10 bg-primary flex justify-center items-center">
                      <p class="font-2xl text-white font-semibold text-2xl">
                        {user.points}
                      </p>
                    </div>
                    {/* <Badge badges={user.badges} size={5} /> */}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl text-gray-700 mt-5">
                      {user.firstName}
                      <span className="ml-[4px] text-2xl">{user.lastName}</span>
                    </p>
                    <span className="ml-[4px] text-lg text-gray-500">
                      {user.position}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Leaders;
