import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosI from "../../redux/axios";
import Image from "./../../images/profile.jpg";
import Leaders from "./Leaders";
import Badge from "../profile/Badge";

function Leaderboard() {
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
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-16">
      <div className="flex flex-col justify-center items-center ">
        <Leaders />
        <div class="w-10/12 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 flex flex-col justify-center px-28 mb-16">
          <div class="flex justify-center items-center mb-4">
            <h1 class="text-4xl font-normal leading-none text-gray-900 my-8 pb-3 text-center border-b-[2px] border-gray-100 w-full">
              Leaderboard
            </h1>
          </div>
          <div className="mb-16">
            {users
              .sort((a, b) => (a.points < b.points ? 1 : -1))
              .map((user, index) => (
                <Link to={`/users/${user._id}`}>
                  <div className="">
                    <ul
                      role="list"
                      className="my-2 px-6 border-b-[1px] border-gray-200"
                    >
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col">
                            <img
                              className="w-28 h-28 rounded-full object-cover"
                              src={user.image}
                              alt="Neil image"
                            />
                            <Badge
                              badges={user.badges}
                              size={5}
                              className="badge"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-2xl font-medium text-gray-900 truncate flex flex-row gap-2 ml-7">
                              {user.firstName}
                              <span className="ml-[2px]">{user.lastName}</span>
                            </p>
                            <p className="text-base text-gray-500 truncate ml-8">
                              {user.position}
                            </p>
                          </div>
                          <div className="">
                            <h1 className="items-center text-3xl font-medium text-gray-900">
                              {user.points}
                            </h1>
                            <h1 className="items-center text-xl font-normal text-gray-700 mt-2">
                              points
                            </h1>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
