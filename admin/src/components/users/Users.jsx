import React from "react";
import { useEffect, useState } from "react";
import axiosI from "../../redux/axios";
import UserContainer from "./UserContainer";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/users/";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 12);
      setUsers(array1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <div className="w-[80vw]">
        <h1 className="text-black font-light desktop:text-4xl text-center pb-10 mobile:text-2xl tablet:text-4xl">
          Users
        </h1>
        <div className="playlisturi">
          <UserContainer users={users} />
        </div>
      </div>
    </section>
  );
};

export default Users;
