import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/api";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Chart from "./../leaderboard/Chart";
import Image from "./../../images/profile.jpg";
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
  const { user, updateUserProgress } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleInputState = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    firstName: Joi.string().min(5).max(10).required().label("Name"),
    lastName: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { data, id: user._id };
    const res = await updateUser(payload, dispatch);
    res && history("/acasa");
  };

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
    <section className="w-10/12 h-full absolute block right-0 pt-10 bg-white p-5">
      <div className="px-48 py-10">
        <div className="flex flex-row gap-5 mobile:flex-col tablet:flex-row">
          <div className="bg-white shadow-2xl p-10 w-5/12 flex flex-col justify-center items-center">
            <div className="absolute top-[120px] left-[555px]">
              <button>
                <Link to="/edit-profile">
                  <FiEdit size={24} className="icon-profile-edit" />
                </Link>
              </button>
            </div>
            <div>
              <img
                className="object-cover rounded-full w-40 h-40"
                src={Image}
                alt={"image" + data.firstName + data.lastName}
              />
            </div>
            <h1 className="text-black text-3xl font-thin flex flex-row gap-2 pt-5">
              {data.firstName} {data.lastName}
            </h1>
            <h1 className="text-gray-700 text-2xl font-thin mt-3">
              {data.position}
            </h1>
          </div>
          <div className="bg-white shadow-2xl w-7/12 flex justify-center">
            <ul className="flex flex-col gap-4 justify-center p-4 w-10/12">
              <li className="flex flex-row justify-between items-center border-b-[1px] border-gray-200 ">
                <h1 className="text-black font-normal text-2xl pr-4">
                  Full name:
                </h1>
                <h1 className="text-gray-500 font-medium text-xl ">
                  {data.firstName} {data.lastName}{" "}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-gray-200 ">
                <h1 className="text-black font-normal text-2xl pr-4">Email:</h1>
                <h1 className="text-gray-500 font-medium text-xl ">
                  {data.email}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-gray-200 ">
                <h1 className="text-black font-normal text-2xl pr-4">
                  Position:
                </h1>
                <h1 className="text-gray-500 font-medium text-xl ">
                  {data.position}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-gray-200 ">
                <h1 className="text-black font-normal text-2xl pr-4">
                  Birth date:
                </h1>
                <h1 className="text-gray-500 font-medium text-xl ">
                  {data.birthDate}
                </h1>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-5 mt-3">
          <ul className="bg-white shadow-2xl py-10 w-5/12 flex flex-col justify-center px-20">
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">Points </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.points}
              </h1>
            </li>
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">Badges </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.badges.length}
              </h1>
            </li>
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">Quests </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.quests.length}
              </h1>
            </li>
            <li className="flex flex-row justify-between">
              <h1 className="text-black font-normal text-xl">
                Proposed Quests{" "}
              </h1>
              <h1 className="text-gray-700 font-medium text-lg text-right">
                {data.proposedQuests.length}
              </h1>
            </li>
          </ul>
          <div className="bg-white shadow-2xl w-7/12 py-10 flex flex-col gap-4 justify-center items-center px-24">
            <Chart />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
