import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/api";
import Joi from "joi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
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

  const datas = {
    labels: ["Badges", "Quests", "Proposed Quests", "Finished Quests"],
    datasets: [
      {
        label: "numbers of",
        data: [
          data.badges.length,
          data.quests.length,
          data.proposedQuests.length,
          data.points.length,
        ],
        backgroundColor: [
          "rgb(255, 0, 0)",
          "rgb(128, 255, 255)",
          "rgb(51, 255, 51)",
          "rgb(255, 163, 26)",
        ],
        borderColor: [
          "rgb(255, 0, 0)",
          "rgb(128, 255, 255)",
          "rgb(51, 255, 51)",
          "rgb(255, 163, 26)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={datas} />;
}

export default Chart;
