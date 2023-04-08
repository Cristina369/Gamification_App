import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosI from "../../redux/axios";
import Badge from "../user/Badge";

const UserContainer = () => {
  const [data, setData] = useState([]);
  //   const { users } = useSelector((state) => state.user);

  const { id } = useParams();
  console.log("ID-ul AICI" + id);

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/users/";
      const { data } = await axiosI.get(url);
      const array1 = data.data.splice(0, 4);
      setUsers(array1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const Users = users.filter((user) => user._id === id);
    // console.log("ID-ul AICI" + id);
    if (id && Users[0]) {
      const dk = {
        firstName: Users[0].firstName,
        lastName: Users[0].lastName,
        points: Users[0].points,
        quests: Users[0].quests,
        badge: Users[0].badge,
      };
      setData(dk);
    }
  }, [id, users]);

  //   console.log("Blogurile sunt" + blogs.title);
  return (
    <section className="mobile:mt-16 mobile:pt-4 tablet:mt-32 tablet:pt-8 px-5 flex justify-center items-center">
      <div>
        <div>
          <div>
            <h1>{data.firstName}</h1>
            <h1>{data.lastName}</h1>
            <h1>{data.birthDate}</h1>
          </div>
        </div>
        <div>
          {/* <div>
            {data.badges.map((badge, index) => (
              <div>
                <h1>{badge.title}</h1>
              </div>
            ))}
          </div> */}
          {/* <Badge data={data.badge} /> */}
          <h1>{data.points}</h1>
          <h1>{data.badge}</h1>
          {/* <h1>{data.badges}</h1>
          <h1>{data.quests}</h1>
          <h1>{data.proposedQuests}</h1> */}
        </div>
      </div>
    </section>
  );
};

export default UserContainer;
