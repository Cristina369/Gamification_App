import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/api";
import { Link } from "react-router-dom";
import Joi from "joi";

const Profile = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    points: "",
    badges: "",
    quests: "",
    proposedQuests: "",
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
    res && history("/acasa");
  };

  useEffect(() => {
    if (user) {
      const dk = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: user.birthDate,
        points: user.points,
        badges: user.badges,
        quests: user.quests,
        proposedQuests: user.proposedQuests,
      };
      setData(dk);
    }
  }, [user]);

  return (
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <div>
        <div className="px-48 py-10">
          <h1 className="text-black font-light desktop:text-7xl text-center pb-10 mobile:text-2xl tablet:text-4xl">
            Profile
          </h1>
          <div>
            <h1>{data.firstName}</h1>
            <h1>{data.lastName}</h1>
            <h1>{data.email}</h1>
            <h1>{data.birthDate}</h1>
          </div>
          <div>
            <h1>Points: {data.points}</h1>
            <h1>Badge: {data.badges}</h1>
            <h1>Quests: {data.quests}</h1>
            <h1>
              Proposed Quests:
              {data.proposedQuests}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <button>
          <Link to="/edit-profile">
            <h1>Edit profile</h1>
          </Link>
        </button>
      </div>
    </section>
  );
};
export default Profile;
