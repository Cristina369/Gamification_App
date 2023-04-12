import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../redux/auth/api";
import Joi from "joi";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors] = useState({});
  const dispatch = useDispatch();

  const handleInputState = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      auth(data, dispatch);
    } else {
      console.log("Va rugam sa completati corespunzator");
    }
  };

  return (
    <section className="mobile:mt-16 mobile:pt-4 tablet:mt-32 tablet:pt-16 z-0 flex justify-center items-center">
      <div className="profil-container p-20  shadow-2xl w-7/12 flex flex-col items-center mobile:p-5 tablet:p-10 desktop:p-20 mobile:flex-col tablet:flex-col mobile:w-11/12 tablet:w-5/12">
        <div className="w-[20rem]">
          <h1 className="text-black font-light desktop:text-4xl text-center pb-10 mobile:text-2xl tablet:text-4xl">
            Log in
          </h1>
          <form onSubmit={handleSubmit} className="form_autentificare">
            <div className="input_autentificare">
              <input
                label="Introduceti adresa de email"
                placeholder="Email"
                name="email"
                onChange={handleInputState}
                value={data.email}
                className="block py-3 px-2 text-sm w-full my-2 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              />
            </div>
            <div className="input_autentificare">
              <input
                label="Introduceti parola"
                placeholder="Password"
                name="password"
                onChange={handleInputState}
                schema={schema.password}
                value={data.password}
                className="block py-3 px-2 text-sm w-full my-2 text-black bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                error={errors.password}
                type="password"
                required={true}
              />
            </div>
            <div className="btn_submit">
              <button
                type="submit"
                label="Autentificare"
                className="bg-transparent border-[1px] border-gray-300 px-3 py-2 mt-2 "
              >
                Submit
              </button>
            </div>
          </form>
          <h1 className="mt-10 text-xl font-medium text-center">
            You don't have an account?
            <Link to="/signup">
              <span className="text-2xl font-medium pl-2">Create now</span>
            </Link>
          </h1>
          <Link to="/signup"></Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
