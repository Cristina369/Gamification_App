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
    <section className="">
      <div className="grid grid-cols-2 w-fit justify-center place-items-center mobile:grid-cols-1 tablet:grid-cols-2 mobile:w-full tablet:w-fit">
        {quests.map((quest, index) => (
          // <Quest quest={quest} />
          <div key={index}>
            <h1>Title: {quest.title}</h1>
            <h1>Desc: {quest.description}</h1>
            <h1>Points: {quest.points}</h1>
            <h1>Author: {quest.user}</h1>
            <div>
              <button
                onClick={() => handleAccept(quest._id)}
                className="bg-green-300"
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
