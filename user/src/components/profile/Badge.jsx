import React from "react";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosI from "../../redux/axios";
import Chart from "./../leaderboard/Chart";
// import Badge from "../user/Badge";

const Badge = ({ badges, size }) => {
  const [data, setData] = useState({
    image: "",
    title: "",
    points: "",
  });
  const { users } = useSelector((state) => state.user);

  //   const { id } = useParams();
  //   console.log("ID-ul AICI" + id);
  //   const id = badges;

  const [badgesList, setBadgesList] = useState([]);

  const getAllBadges = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + `/badges/specific/${badges}`;
      const { data } = await axiosI.get(url);
      const array1 = data.data;
      console.log("Badges " + array1);
      setBadgesList(array1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBadges();
  }, []);

  //   useEffect(() => {
  //     const Badges = badgesList.filter((badge) => badge._id === badges);
  //     console.log(" -- " + badgesList.filter((badge) => badge._id === badges));
  //     if (badges && Badges) {
  //       const dk = {
  //         image: Badges.image,
  //         title: Badges.title,
  //         points: Badges.points,
  //       };
  //       setData(dk);
  //     }
  //     console.log("Data -- " + Badges.title);
  //   }, [badges, badgesList]);

  return (
    // <section className="w-10/12 h-full absolute block right-0 pt-10 p-5 -mb-10">
    <div className="border-[1px] border-gray-200 fill-black p-3 w-10 h-10 rounded-full bg-white -mt-10">
      <img src={badgesList.image} alt={badgesList.title} className="w-7" />
    </div>
    // </section>
  );
};

export default Badge;
