import React from "react";
// import { useEffect, useState } from "react";
// import axiosI from "../../redux/axios";
// import LBlogs from "./LBlogs";
// import Blogs from "./Blogs";
// import AllBlogsC from "../allblogs/AllBlogsC";
// import ContactInfo from "../contact/ContactInfo";

const Home = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);

  // const getAllBlogs = async () => {
  //   try {
  //     setIsFetching(true);
  //     const url = process.env.REACT_APP_API_URL + "/blog/";
  //     const { data } = await axiosI.get(url);
  //     const array1 = data.data.splice(0, 4);
  //     setBlogs(array1);
  //     setIsFetching(false);
  //   } catch (error) {
  //     setIsFetching(false);
  //   }
  // };

  // useEffect(() => {
  //   getAllBlogs();
  // }, []);

  return (
    // <>
    //   <section className="mobile:mt-16 mobile:pt-4 tablet:mt-20 tablet:pt-8">
    //     <div className="homepage relative z-0">
    //       <h1 className="font-medium pb-60 pt-44 text-center px-24 mobile:px-5 tablet:px-24">
    //         <div className="py-28 backdrop-opacity-10 backdrop-invert bg-white/50">
    //           <h1 className="text-black font-light mobile:text-3xl desktop:text-7xl">
    //             Your future is here.
    //           </h1>
    //           <h2 className="text-black font-light mobile:text-4xl desktop:text-8xl">
    //             Are you ready to touch it ?
    //           </h2>
    //         </div>
    //       </h1>
    //     </div>
    //     <div className="py-10 -mt-44 z-30 relative mobile:hidden desktop:block">
    //       <LBlogs blogs={blogs} />
    //     </div>
    //     <div className="-mt-10">
    //       <Blogs blogs={blogs} />
    //     </div>
    //     <div className="flex flex-row-reverse px-20 mobile:px-5 desktop:px-20">
    //       <div className="w-4/12 mobile:hidden tablet:display">
    //         <ContactInfo />
    //       </div>
    //       <div className="w-8/12 -mt-3 pl-7 mobile:mt-4 tablet:-mt-[200px] desktop:-mt-3 mobile:pl-0 desktop:pl-7 mobile:w-full tablet:w-8/12">
    //         <h1 className="text-black font-light text-4xl text-center pb-4 mt-20">
    //           New Blogs
    //         </h1>
    //         <AllBlogsC blogs={blogs} />
    //       </div>
    //     </div>
    //   </section>
    // </>
    <section>
      <h1>Home Page</h1>
    </section>
  );
};

export default Home;
