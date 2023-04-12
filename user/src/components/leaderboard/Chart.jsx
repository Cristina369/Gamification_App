import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/api";
import Joi from "joi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ badges, quests, proposedQuests }) {
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
    labels: ["Badges", "Quests", "Proposed Quests"],
    datasets: [
      {
        label: "numbers of",
        data: [badges, quests, proposedQuests],
        backgroundColor: ["#82a4e3", "#acc2ec", "#97b3e7"],
        borderColor: ["#82a4e3", "#acc2ec", "#97b3e7"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={datas} />;
}

export default Chart;
