import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { acceptQuest } from "../../redux/blog/api";
// import Quest from "./Quest";

const QuestContainer = ({ quests }) => {
  const dispatch = useDispatch();
  // const [setLoading] = useState(true);

  // setTimeout(() => setLoading(false), 4000);

  const handleAccept = (id) => {
    acceptQuest(id, dispatch);
    window.location.reload();
  };
  return (
    <section className=" w-12/12 px-28">
      <h1 className="text-black font-normal text-4xl ">All Quests</h1>
      <div className="flex flex-col justify-center w-full gap- m-10">
        {quests.map((quest, index) => (
          <div
            key={index}
            className="bg-white shadow-lg flex flex-row items-center justify-between px-16 py-10 my-5 rounded-lg"
          >
            <div className="px-9 py-4 border-[1px] border-gray-500 rounded-xl">
              <h1 className="text-black font-normal text-3xl flex flex-col justify-center">
                {quest.points}
              </h1>
              <h1 className="text-gray-700 font-normal text-base">puncte</h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-black font-normal text-2xl mb-2">
                {quest.title}
              </h1>
              <h1 className="text-black font-normal text-base">
                {quest.description ? quest.description.substring(0, 30) : ""}...
              </h1>
            </div>
            <div>
              <button
                onClick={() => handleAccept(quest._id)}
                className="bg-green-100 px-4 py-3 rounded-md"
              >
                Accept quest
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestContainer;
