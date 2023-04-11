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
      const array1 = data.data.splice(0, 20);
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
    <section className="w-10/12 h-full absolute block right-0 pt-28 px-5 ">
      <div>
        {data.points > 500 ? (
          <Link to="/create-quest">
            <div className="border-[1px] border-primary bg-secondary p-4 w-fit text-white rounded-3xl absolute top-24 right-32">
              <h1>Create a quest</h1>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      <QuestContainer quests={quests} />
    </section>
  );
};

export default AllQuests;
