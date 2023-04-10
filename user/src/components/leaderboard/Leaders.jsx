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
    <section>
      <div>
        <div className="w-full flex flex-row gap-5 justify-center">
          {users
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map((user, index) => (
              <Link to={`/users/${user._id}`}>
                <div
                  key={index}
                  className={`${
                    index + 1 === 1 ? "bg-blue-300" : "bg-green-300"
                  }`}
                >
                  <a
                    href="#"
                    class="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100"
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
                    <div className="w-7/12 h-[1px] bg-slate-200 mb-3"></div>
                    <p class="font-normal text-gray-700">
                      {user.firstName}
                      {user.lastName}
                    </p>
                  </a>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Leaders;
