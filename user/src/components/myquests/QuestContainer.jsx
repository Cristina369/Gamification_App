import React from "react";
import { Link } from "react-router-dom";

const QuestContainer = ({ quests }) => {
  return (
    <section className=" w-12/12 px-28 py-10 bg-white">
      <h1 className="text-black font-normal text-2xl mb-7 pb-4 border-gray-100 border-b-[2px]">
        My Quests
      </h1>
      <div className=" bg-white flex flex-col justify-center w-full gap-4">
        {quests.map((quest, index) => (
          // <Quest quest={quest} />
          <div
            key={index}
            className="border-b-[2px] border-gray-100 flex flex-row items-center justify-between px-16 py-7"
          >
            <h1 className="text-black font-normal text-xl w-[250px]">
              {quest.title}
            </h1>
            <h1 className="text-black font-normal text-xl">
              {quest.description ? quest.description.substring(0, 15) : ""}...
            </h1>
            <h1 className="text-black font-normal text-xl">{quest.points}</h1>
            <div>
              <button className="bg-green-100 px-4 py-3 rounded-md">
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
