import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/api";
import AllQuestsPanel from "../allquests/AllQuestsPanel";
import Chart from "./../leaderboard/Chart";
import Joi from "joi";
import { logout } from "../../redux/auth";

const Panel = () => {
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

  const handleLogout = () => {
    dispatch(logout());
    window.location = "/login";
  };

  return (
    <section className="w-10/12 h-full absolute block right-0  bg-white p-10">
      <div>
        <h1>Your progress</h1>
        <div className="w-12/12 flex flex-row justify-center items-center gap-1 h-[320px]">
          <div className="w-4/12 flex flex-row gap-2 mobile:flex-col tablet:flex-row shadow-lg px-6  profile justify-center">
            <div className="p-10 w-full flex flex-col justify-center items-center">
              <div className="flex flex-col">
                <img
                  className="object-cover rounded-full w-40 h-40"
                  src={data.image}
                  alt={"image" + data.firstName + data.lastName}
                />
                {/* <Badge badges={data.badges} size={20} /> */}
              </div>
              <h1 className="text-white text-2xl font-bold flex flex-row gap-2 pt-5">
                {data.firstName} {data.lastName}
              </h1>
              <h1 className="text-white text-xl font-thin mt-3">
                {data.position}
              </h1>
            </div>
          </div>
          <div className="w-8/12 p-4 h-fit">
            <AllQuestsPanel />
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Panel;
