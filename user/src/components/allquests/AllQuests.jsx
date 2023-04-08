import React from "react";
import { useEffect, useState } from "react";
import axiosI from "../../redux/axios";
import QuestContainer from "./QuestContainer";
import { Link } from "react-router-dom";

const AllQuests = () => {
  const [quests, setQuests] = useState([]);

  const getAllQuests = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/quests/proposed";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 20);
      setQuests(array1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuests();
  }, []);

  return (
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <div>
        <Link to="/create-quest">
          <h1>Create a quest</h1>
        </Link>
      </div>
      <QuestContainer quests={quests} />
    </section>
  );
};

export default AllQuests;
