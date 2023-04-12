import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosI from "../../redux/axios";

const Badge = ({ badges, size }) => {
  const [data, setData] = useState({
    image: "",
    title: "",
    points: "",
  });
  const { users } = useSelector((state) => state.user);

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

  return (
    <div className="border-[1px] border-gray-200 fill-black p-3 w-10 h-10 rounded-full bg-third -mt-10">
      <img src={badgesList.image} alt={badgesList.title} className="w-7" />
    </div>
  );
};

export default Badge;
