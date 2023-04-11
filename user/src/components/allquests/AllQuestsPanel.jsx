import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosI from "../../redux/axios";
import QuestContainer from "./QuestContainer";
import { Link } from "react-router-dom";

const AllQuests = () => {
  const [quests, setQuests] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    points: "",
  });

  const getAllQuests = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/quests/proposed";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 3);
      setQuests(array1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      const dk = {
        points: user.points,
      };
      setData(dk);
    }
  }, [user]);

  useEffect(() => {
    getAllQuests();
  }, []);

  return (
    <section>
      <QuestContainer quests={quests} />
    </section>
  );
};

export default AllQuests;
