import React from "react";
import { Link } from "react-router-dom";

const QuestContainer = ({ quests }) => {
  return (
    <section className=" w-12/12 px-28 ">
      <h1 className="text-black font-normal text-[67px] text-start ml-10 -mt-12 mb-5">
        My Quests
      </h1>
      <div className="flex flex-col justify-center w-full gap- m-10">
        {quests.map((quest, index) => (
          <div
            key={index}
            className="bg-white border-[1px] border-gray-400 flex flex-row items-center justify-between px-16 py-4 my-4 rounded-lg"
          >
            <div className="px-6 py-3 bg-secondary rounded-xl">
              <h1 className="text-white font-normal text-3xl flex flex-col justify-center">
                {quest.points}
              </h1>
              <h1 className="text-gray-700 font-normal text-base">puncte</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-black font-normal text-3xl mb-2">
                {quest.title}
              </h1>
              <h1 className="text-black font-normal text-lg">
                {quest.description ? quest.description.substring(0, 30) : ""}...
              </h1>
            </div>
            <div>
              <button className="bg-white border-primary border-[2px] px-4 py-3 rounded-md">
                <Link to={`/complete-quest/${quest._id}`}>
                  Complete the quests
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestContainer;
