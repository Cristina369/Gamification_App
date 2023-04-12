import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/api";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Badge from "./Badge";
import Chart from "./../leaderboard/Chart";
import Image from "./../../images/avatar-default-svgrepo-com.svg";
import Joi from "joi";

const Profile = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    image: "",
    email: "",
    birthDate: "",
    points: "",
    badges: "",
    quests: "",
    proposedQuests: "",
  });
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (user) {
      const dk = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        position: user.position,
        image: user.image,
        birthDate: user.birthDate,
        points: user.points,
        badges: user.badges,
        quests: user.quests,
        proposedQuests: user.proposedQuests,
      };
      setData(dk);
    }
  }, [user]);

  return (
    <section className="w-10/12 h-fit absolute block right-0 pt-10 bg-white p-5">
      <div className="px-48 py-10">
        <div className="flex flex-row gap-5 mobile:flex-col tablet:flex-row shadow-lg px-6 py-10 profile">
          <div className="p-10 w-5/12 flex flex-col justify-center items-center">
            <div className="absolute top-[120px] left-[530px]">
              <button>
                <Link to="/edit-profile">
                  <FiEdit size={24} className="icon-profile-edit" />
                </Link>
              </button>
            </div>
            <div className="flex flex-col">
              <img
                className="object-cover rounded-full w-48 h-48"
                src={data.image ? data.image : Image}
                alt={"image" + data.firstName + data.lastName}
              />
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
export default Profile;
