import React, { useState } from "react";
import axiosI from "../../redux/axios";
import Joi from "joi";

function Quest({ quest }) {
  const id = quest._id;
  const [errors, setErrors] = useState({});
  const [data, setActive] = useState(false);

  const handleInputState = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const url = process.env.REACT_APP_API_URL + `/quests/accept/d${id}`;
        await axiosI.put(url, data);
        alert("Blog acceptat cu succes");
        history("/blogs");
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
    <section>
      <form onChange={handleSubmit}>
        <div>
          <h1>Title: {quest.title}</h1>
          <h1>Desc: {quest.description}</h1>
          <h1>Points: {quest.points}</h1>
          <h1>Author: {quest.user}</h1>
          <div>
            <button type="submit" className="bg-green-300">
              Accept quest
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Quest;
