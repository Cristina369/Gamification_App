import React from "react";
import { Link } from "react-router-dom";

const Badge = ({ data }) => {
  console.log("DATA" + data);
  return (
    <section className="mobile:mt-16 mobile:pt-4 tablet:mt-32 tablet:pt-8 px-5 flex justify-center items-center">
      <div>
        {data.map((datas, index) => (
          <div key={index}>
            <div>
              <h1>{datas.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Badge;
