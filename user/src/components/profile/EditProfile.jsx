import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/api";
import Joi from "joi";

const EditProfile = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });
  const { user, updateUserProgress } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

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
        birthDate: user.birthDate,
      };
      setData(dk);
    }
  }, [user]);

  return (
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <div>
        <form onSubmit={handleSubmit} className="px-48 py-10">
          <h1 className="text-black font-light desktop:text-7xl text-center pb-10 mobile:text-2xl tablet:text-4xl">
            Edit Profile
          </h1>
          <div className="flex flex-row w-full m-2">
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
          <div className="flex justify-end w-full pt-3">
            <button
              type="submit"
              className="bg-transparent border-[1px] border-gray-300 px-6 py-3 "
            >
              Update profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default EditProfile;
