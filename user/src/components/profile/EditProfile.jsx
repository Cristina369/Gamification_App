import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Image from "./../../images/profile.jpg";
import FileInput from "../common/fileinput/FileInput";
import { AiOutlineFileImage } from "react-icons/ai";
import { updateUser } from "../../redux/user/api";
import Joi from "joi";

const EditProfile = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    image: "",
    email: "",
    birthDate: "",
  });
  const { user, updateUserProgress } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleInput = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputState = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    firstName: Joi.string().min(5).max(10).required().label("Name"),
    lastName: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { data, id: user._id };
    const res = await updateUser(payload, dispatch);
    res && history("/panel");
  };

  useEffect(() => {
    if (user) {
      const dk = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        position: user.position,
        birthDate: user.birthDate,
      };
      setData(dk);
    }
  }, [user]);

  return (
    <section className="w-10/12 h-full absolute block right-0 pt-32 bg-gray-100 px-5">
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row w-10/12 justify-center items-center p-10 gap-7"
        >
          <div className="bg-white py-16 w-4/12 flex flex-col justify-center items-center">
            <div>
              <img
                className="object-cover rounded-full w-40 h-40"
                src={Image}
                alt={"image" + data.firstName + data.lastName}
              />
            </div>
            <h1 className="text-black text-3xl font-thin flex flex-row gap-2 pt-5">
              {data.firstName} {data.lastName}
            </h1>
            <h1 className="text-gray-700 text-2xl font-thin mt-3">
              {data.position}
            </h1>
          </div>
          <div className="flex flex-col w-8/12 justify-center items-center bg-white py-20 px-10">
            <h1 className="text-black font-light text-3xl mb-5 ">
              Edit profile
            </h1>
            <div className="flex flex-row m-3 w-full">
              <input
                label="Introduceti numele"
                placeholder="Nume"
                name="firstName"
                onChange={handleInputState}
                schema={schema.firstName}
                value={data.firstName}
                className="block py-3 px-2 text-sm w-full mr-1 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                required={true}
              />
              <input
                label="Introduceti numele"
                placeholder="Nume"
                name="lastName"
                onChange={handleInputState}
                value={data.lastName}
                className="block py-3 px-2 text-sm w-full ml-1 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                required={true}
              />
            </div>
            <input
              label="Introduceti numele"
              placeholder="Nume"
              name="email"
              type="email"
              onChange={handleInputState}
              value={data.email}
              className="block py-3 px-2 text-sm w-full m-2 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              required={true}
            />
            <input
              label="Introduceti numele"
              placeholder="Position"
              name="position"
              type="position"
              onChange={handleInputState}
              value={data.position}
              className="block py-3 px-2 text-sm w-full m-2 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              required={true}
            />
            <input
              label="Introduceti ziua de nastere"
              name="birthDate"
              type="text"
              placeholder="DD-MM-YYYY"
              onChange={handleInputState}
              schema={schema.birthDate}
              value={data.birthDate}
              className="block py-3 px-2 text-sm w-full m-2 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              required={true}
            />
            <div className="w-full flex justify-start items-start">
              <FileInput
                label="Alege Imagine(*.png, *.jpg)"
                icon={<AiOutlineFileImage />}
                type="image"
                name="image"
                value={data.image}
                className="my-4"
                handleInputState={handleInput}
              />
            </div>
            <div className="flex justify-end w-full pt-3">
              <button
                type="submit"
                className="bg-transparent border-[1px] border-gray-300 px-6 py-3 "
              >
                Update profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default EditProfile;
