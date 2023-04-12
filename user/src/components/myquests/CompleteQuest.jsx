import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FileInput from "../common/fileinput/FileInput";
import axiosI from "../../redux/axios";
import { AiOutlineFileImage } from "react-icons/ai";
import Joi from "joi";

const CompleteQuest = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    details: "",
    demonstration: "",
    points: "",
  });

  const [errors] = useState({});
  const [quests, setQuests] = useState([]);

  const { id } = useParams();
  console.log("Id-ul este : " + id);
  const history = useNavigate();

  const handleInput = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllBadges = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/quests";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 20);
      setQuests(array1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBadges();
  }, []);

  const handleInputState = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const url = process.env.REACT_APP_API_URL + `/quests/complete/${id}`;
        await axiosI.put(url, data);
        alert("Quest submited successfully");
        history("/my-quests");
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

  useEffect(() => {
    const Quests = quests.filter((quest) => quest._id === id);
    console.log("aici" + quests.title);
    if (id && Quests[0]) {
      const dk = {
        title: Quests[0].title,
        description: Quests[0].description,
        points: Quests[0].points,
      };
      setData(dk);
    }
  }, [id, quests]);

  return (
    <section className="w-10/12 h-full absolute flex justify-center right-0 top-3 bg-white p-10">
      <div className="shadow-2xl w-8/12 flex flex-col justify-center items-center profile">
        <h1 className="text-white font-light desktop:text-5xl w-full text-center mobile:text-2xl mb-14">
          Complete Quest
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-/12/12 flex flex-row justify-center w-full mobile:flex-col-reverse tablet:flex-row"
        >
          <div className="flex justify-center flex-col w-12/12">
            <ul className=" w-12/12 flex flex-col gap-4 justify-center mb-6">
              <li className="flex flex-row justify-between border-b-[1px] border-white ">
                <h1 className="text-white font-thin text-lg pr-4">Title:</h1>
                <h1 className="text-white font-medium text-2xl ">
                  {data.title}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-white ">
                <h1 className="text-white font-thin text-lg pr-4">
                  Description:
                </h1>
                <h1 className="text-white font-medium text-2xl ">
                  {data.description}
                </h1>
              </li>
              <li className="flex flex-row justify-between border-b-[1px] border-white ">
                <h1 className="text-white font-thin text-lg pr-4">Points:</h1>
                <h1 className="text-white font-medium text-2xl ">
                  {data.points}
                </h1>
              </li>
            </ul>

            <div className="flex flex-col w-12/12">
              <textarea
                label="Introduceti continutul"
                type="message"
                placeholder="Details"
                name="details"
                onChange={handleInputState}
                value={data.details}
                className="block resize-y py-3 px-2 text-sm w-full h-[200px] my-2 text-white bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                required={true}
              />
              <div className="w-full flex justify-start items-start mb-10">
                <FileInput
                  label="Alege Demonstratia (*.pdf, *.png)"
                  icon={<AiOutlineFileImage />}
                  type="demonstration"
                  name="demonstration"
                  value={data.demonstration}
                  className="my-4"
                  handleInputState={handleInput}
                />
              </div>
            </div>
            <div className="w-full pt-3 ml-[350px] -mt-10">
              <button
                type="submit"
                className=" bg-transparent border-[2px] border-gray-300 px-6 py-3 mobile:mb-5 tablet:mb-0 rounded-3xl text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CompleteQuest;
