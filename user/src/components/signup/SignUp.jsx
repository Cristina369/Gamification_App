import React from "react";
import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    birthDate: "",
  });

  const [errors] = useState({});

  const history = useNavigate();

  const handleInputState = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    firstName: Joi.string().min(5).max(10).required().label("Name"),
    lastName: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    console.log("path -> " + process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const url = process.env.REACT_APP_API_URL + "/users";
        await axios.post(url, data);
        alert("Cont creat cu succes");
        history.push("/login");
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
      <section className="mobile:mt-16 mobile:pt-4 tablet:mt-32 tablet:pt-16 z-0 flex justify-center items-center">
        <div className="profil-container p-20  shadow-2xl flex flex-col items-center mobile:p-5 tablet:p-10 desktop:p-20 mobile:flex-col tablet:flex-col mobile:w-11/12 tablet:w-5/12">
          <h1 className="text-black font-light desktop:text-4xl text-center pb-10 mobile:text-2xl tablet:text-4xl">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="w-[300px]">
            <div className="input_container">
              <input
                label="First Name"
                placeholder="First Name"
                name="firstName"
                onChange={handleInputState}
                value={data.firstName}
                className="block py-3 px-2 text-sm w-full my-3 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                required={true}
              />
            </div>
            <div>
              <input
                label="Last Name"
                placeholder="Last Name"
                name="lastName"
                onChange={handleInputState}
                schema={schema.lastName}
                value={data.lastName}
                className="block py-3 px-2 text-sm w-full my-3 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                error={errors.lastName}
                required={true}
              />
            </div>
            <div className="aut-input">
              <input
                label="Introduceti adresa de email"
                placeholder="Email"
                name="email"
                onChange={handleInputState}
                schema={schema.email}
                value={data.email}
                className="block py-3 px-2 text-sm w-full my-3 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                error={errors.email}
                required={true}
              />
            </div>
            <div className="aut-input">
              <input
                label="Introduceti o parola"
                placeholder="Password"
                name="password"
                onChange={handleInputState}
                schema={schema.password}
                value={data.password}
                className="block py-3 px-2 text-sm w-full my-3 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                error={errors.password}
                type="password"
                required={true}
              />
            </div>
            <div className="input_container">
              <input
                label="Introduceti ziua de nastere"
                placeholder="Ziua de nastere"
                name="birthDate"
                type="date"
                onChange={handleInputState}
                schema={schema.birthDate}
                value={data.birthDate}
                className="block py-3 px-2 text-sm w-full my-3 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                error={errors.birthDate}
                required={true}
              />
            </div>
            <div className="btn_submit">
              <button
                type="submit"
                className="bg-transparent border-[1px] border-gray-300 px-3 py-2 mt-2 "
              >
                Submit
              </button>
            </div>
            <h1 className="mt-10 text-xl font-medium text-center">
              You already have an account?
              <Link to="/login">
                <span className="text-2xl font-medium pl-2">Login</span>
              </Link>
            </h1>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
