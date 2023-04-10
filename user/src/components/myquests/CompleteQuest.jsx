import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosI from "../../redux/axios";
import Joi from "joi";

const CompleteQuest = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    points: "",
  });

  const [errors, setErrors] = useState({});
  const [quests, setQuests] = useState([]);

  const { id } = useParams();
  console.log("Id-ul este : " + id);
  //   const { blogs } = useSelector((state) => state.blog);
  const history = useNavigate();
  //   console.log("Blogul este" + blogs.title, blogs.desc);

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

  const handleInput = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const schema = {
    title: Joi.string().min(5).max(60).required().label("Title"),
    content: Joi.string().min(5).max(60).required().label("Content"),
    desc: Joi.string().min(5).max(200).required().label("Description"),
    img: Joi.required().label("Image"),
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (Object.keys(errors).length === 0) {
  //       try {
  //         const url = process.env.REACT_APP_API_URL + `/quests/${id}`;
  //         await axiosI.put(url, data);
  //         alert("Blog actualizat cu succes");
  //         history("/blogs");
  //       } catch (error) {
  //         if (
  //           error.response &&
  //           error.response.status >= 400 &&
  //           error.response.status < 500
  //         ) {
  //           alert(error.response.data);
  //         } else {
  //           console.log(error);
  //           alert("Ceva a mers gresit!");
  //         }
  //       }
  //     } else {
  //       console.log("please fill out properly");
  //     }
  //   };

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
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <div className="shadow-2xl w-9/12 flex flex-col items-start desktop:p-20 tablet:p-10 mobile:w-full tablet:w-9/12">
        <h1 className="text-black font-light desktop:text-7xl text-center pb-10 mobile:text-2xl tablet:text-4xl mobile:p-5 tablet:pb-10 mobile:w-full tablet:w-auto">
          Edit Blog
        </h1>
        {/* <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-center items-center w-full mobile:flex-col-reverse tablet:flex-row"
        > */}
        <div className="flex flex-col justify-center items-center tablet:w-6/12 desktop:pr-10 tablet:pr-4 mobile:w-10/12">
          <div className="flex flex-row justify-center items-center w-full gap-5">
            <div>
              <h1>Title: {data.title}</h1>
              <h1>Desc: {data.description}</h1>
              <h1>Points: {data.points}</h1>
            </div>
          </div>

          {/* <textarea
              label="Introduceti continutul"
              type="message"
              placeholder="Descriere"
              name="content"
              onChange={handleInputState}
              value={data.content}
              className="block resize-y py-3 px-2 text-sm w-full h-[200px] my-2 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              required={true}
            /> */}
          <div className="flex justify-start w-full pt-3">
            <button
              type="submit"
              className=" bg-transparent border-[1px] border-gray-300 px-6 py-3 mobile:mb-5 tablet:mb-0"
            >
              Submit
            </button>
          </div>
        </div>
        {/* <div className="tablet:w-6/12 mx-5 flex flex-col justify-start items-center mobile:w-10/12 mobile:pb-5 tablet:pb-0 ">
            <img src={data.img} className="w-full tablet:-mt-20 mobile:mt-0" />
          </div> */}
        {/* </form> */}
      </div>
    </section>
  );
};

export default CompleteQuest;
