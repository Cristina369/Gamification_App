import React, { useState } from "react";
import { services } from "../../data";

const FAQ = () => {
  const [click, setClick] = useState(false);

  const toggle = (index) => {
    if (click === index) {
      return setClick(null);
    }
    setClick(index);
  };

  return (
    <>
      <section className="mt-20 pb-32">
        <h1 className="text-primary font-medium text-5xl mb-5">FAQ</h1>
        <div className="px-10">
          {services.map((val, index) => (
            <div className="border border-b-gray-300 p-8 border-t-0 border-l-0 border-r-0 mobile:p-2 desktop:p-8 hover:bg-gray-100 hover:rounded-sm">
              <button
                className=" ease-linear duration-1000"
                onClick={() => toggle(index)}
                key={index}
              >
                <h2>
                  {val.title}
                  <span>
                    {click === index ? (
                      <i className="fa fa-chevron-down"></i>
                    ) : (
                      <i className="fa fa-chevron-right"></i>
                    )}
                  </span>
                </h2>
              </button>
              {click === index ? (
                <div>
                  <p className="pt-8 mobile:pt-2 tablet:pt-4 desktop:pt-4">
                    {val.desc}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FAQ;
