import React from "react";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosI from "../../redux/axios";
import Chart from "./../leaderboard/Chart";
import Badge from "../profile/Badge";
// import Badge from "../user/Badge";

const UserContainer = () => {
  const [data, setData] = useState([]);
  //   const { users } = useSelector((state) => state.user);

  const { id } = useParams();
  console.log("ID-ul AICI" + id);

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/users/";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 4);
      setUsers(array1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const Users = users.filter((user) => user._id === id);
    // console.log("ID-ul AICI" + id);
    if (id && Users[0]) {
      const dk = {
        firstName: Users[0].firstName,
        lastName: Users[0].lastName,
        position: Users[0].position,
        image: Users[0].image,
        email: Users[0].email,
        birthDate: Users[0].birthDate,
        points: Users[0].points,
        badges: Users[0].badges,
        quests: Users[0].quests,
        proposedQuests: Users[0].proposedQuests,
      };
      setData(dk);
    }
  }, [id, users]);

  //   console.log("Blogurile sunt" + blogs.title);
  return (
    <section className="w-10/12 h-fit absolute block right-0 pt-10 bg-white p-5">
      <div className="px-48 py-10">
        <div className="flex flex-row gap-5 mobile:flex-col tablet:flex-row shadow-lg px-6 py-10 profile">
          <div className="p-10 w-5/12 flex flex-col justify-center items-center">
            <div className="flex flex-col">
              <img
                className="object-cover rounded-full w-48 h-48"
                src={data.image}
                alt={"image" + data.firstName + data.lastName}
              />
              {/* <Badge badges={data.badges} size={20} /> */}
            </div>
            <h1 className="text-white text-3xl font-bold flex flex-row gap-2 pt-5">
              {data.firstName} {data.lastName}
            </h1>
            <h1 className="text-white text-2xl font-thin mt-3">
              {data.position}
            </h1>
          </div>
          <div className=" w-8/12 flex justify-center">
            <ul className="flex flex-col gap-4 justify-center p-4 w-10/12">
              <li className="flex flex-row justify-between items-center border-b-[1px] border-white ">
                <h1 className="text-white font-thin text-lg pr-4">
                  Full name:
                </h1>
                <h1 className="text-white font-medium text-2xl ">
                  {data.firstName} {data.lastName}{" "}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-white ">
                <h1 className="text-white font-thin text-lg pr-4">Email:</h1>
                <h1 className="text-white font-medium text-2xl ">
                  {data.email}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-white ">
                <h1 className="text-white font-thin text-lg pr-4">Position:</h1>
                <h1 className="text-white font-medium text-2xl ">
                  {data.position}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-white ">
                <h1 className="text-white font-thin text-lg pr-4">
                  Birth date:
                </h1>
                <h1 className="text-white font-medium text-2xl ">
                  {data.birthDate}
                </h1>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-5 mt-3 h-[22vw] ">
          <ul className="bg-white shadow-2xl py-5 w-5/12 flex flex-col justify-center px-14 border-[1px] border-primary gap-3">
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">Points </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.points}
              </h1>
            </li>
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">Badges </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.badges ? data.badges.length : 0}
              </h1>
            </li>
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">Quests </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.quests ? data.quests.length : 0}
              </h1>
            </li>
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">
                Proposed Quests{" "}
              </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.proposedQuests ? data.proposedQuests.length : 0}
              </h1>
            </li>
          </ul>
          <div className="bg-white shadow-2xl w-8/12 py-10 flex flex-col gap-4 justify-center items-center px-20 border-[1px] border-primary">
            <Chart
              badges={data.badges.length}
              quests={data.quests ? data.quests.length : 0}
              proposedQuests={
                data.proposedQuests ? data.proposedQuests.length : 0
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserContainer;
