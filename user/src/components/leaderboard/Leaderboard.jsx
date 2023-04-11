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
      <div className="flex flex-col justify-center items-center">
        <Leaders />
        <div class="w-10/12 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 flex flex-col justify-center px-20 mb-16">
          <div class="flex justify-center items-center mb-4">
            <h1 class="text-4xl font-normal leading-none text-gray-900 my-6 pb-3 text-center border-b-[2px] border-gray-100 w-full">
              Leaderboard
            </h1>
          </div>
          {users
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map((user, index) => (
              <Link to={`/users/${user._id}`}>
                <div class="flow-root">
                  <ul
                    role="list"
                    class="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="w-20 h-20 rounded-full object-cover"
                            src={user.image}
                            alt="Neil image"
                          />
                          <Badge badges={data.badges} />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-xl font-medium text-gray-900 truncate flex flex-row gap-2">
                            {user.firstName}
                            <span className="ml-[2px]">{user.lastName}</span>
                          </p>
                          <p class="text-base text-gray-500 truncate ">
                            {user.position}
                          </p>
                        </div>
                        <div class="inline-flex items-center text-xl font-semibold text-gray-900">
                          {user.points}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
