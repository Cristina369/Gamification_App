import React from "react";

const QuestContainer = ({ quests }) => {
  return (
    <section className="">
      <div className="grid grid-cols-2 w-fit justify-center place-items-center mobile:grid-cols-1 tablet:grid-cols-2 mobile:w-full tablet:w-fit">
        {quests.map((quest, index) => (
          <div>
            <h1>Title: {quest.title}</h1>
            <h1>Desc: {quest.description}</h1>
            <h1>Points: {quest.points}</h1>
            <h1>Author: {quest.user}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestContainer;
