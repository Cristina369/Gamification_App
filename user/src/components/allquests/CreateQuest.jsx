import React from "react";
import { useState } from "react";
import axiosI from "../../redux/axios";
import { useNavigate } from "react-router-dom";

const CreateQuest = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    points: "",
  });

  const [errors, setErrors] = useState({});

  const history = useNavigate();

  const handleInputState = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleInput = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // const schema = {
  //   title: Joi.string().email({ tlds: false }).required().label("Title"),
  //   desc: passwordComplexity().required().label("Description"),
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const url = process.env.REACT_APP_API_URL + "/quests";
        await axiosI.post(url, data);
        alert("Quest creat cu succes");
        history("/all-quests");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          alert(error.response.data);
        } else {
          console.log(error);
          alert("Ceva a mers gresit!");
        }
      }
    } else {
      console.log("please fill out properly");
    }
  };

  return (
    <>
      <section className="w-10/12 h-full absolute  right-0 top-14 bg-white py-32 flex justify-center">
        <div className="w-full profil-container  shadow-2xl flex flex-col items-center justify-center mobile:p-5 tablet:p-10 desktop:p-20 mobile:flex-col tablet:flex-col mobile:w-11/12 tablet:w-8/12 profile">
          <h1 className="text-white font-light desktop:text-6xl text-center pb-10 mobile:text-2xl tablet:text-4xl">
            Add Quest
          </h1>
          <form
            onSubmit={handleSubmit}
            className="profil-form pt-5 flex flex-col justify-center items-center w-full desktop:pr-16 tablet:pr-10 mobile:pr-0 mobile:w-full tablet:w-7/12"
          >
            <div className="flex flex-row w-full m-2 gap-4">
              <input
                label="Introduceti titlul"
                placeholder="Title"
                name="title"
                onChange={handleInputState}
                className="block py-3 px-2 text-sm w-full my-2 text-white bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                value={data.title}
                required={true}
              />
              <input
                label="Introduceti descriere"
                placeholder="Description"
                name="description"
                onChange={handleInputState}
                className="block py-3 px-2 text-sm w-full my-2 text-white bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                value={data.description}
                required={true}
              />
            </div>
            <div className="w-full">
              <input
                label="Introduceti continutul"
                placeholder="Points"
                name="points"
                onChange={handleInputState}
                value={data.points}
                className="block py-3 px-2 text-sm w-full my-2 text-white bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                required={true}
              />
            </div>
            <div className="w-full flex justify-end items-end">
              <button
                type="submit"
                className="bg-transparent border-[2px] border-white text-white px-6 py-3 rounded-3xl mt-7"
              >
                Add quest
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateQuest;
