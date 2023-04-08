import React from "react";
import { Fragment, useEffect } from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/user/api";
// import { getBlog } from "./redux/blog/api";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Header from "./components/common/heading/Header";
// import About from "./components/about/About";
// import AllBlogs from "./components/allblogs/AllBlogs";
// import Blogs from "./components/blog/Blogs";
// import Profile from "./components/user/Profile";
// import AddBlog from "./components/blog/AddBlog";
// import EditBlog from "./components/blog/EditBlog";
// import Footer from "./components/common/footer/Footer";
// import Contact from "./components/contact/Contact";
// import UserBlog from "./components/allblogs/UserBlog";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    let token = null;
    const root = JSON.parse(window.localStorage.getItem("persist:root"));

    if (root) {
      const { auth } = root;
      const { user } = JSON.parse(auth);
      if (user) token = user.token;
    }

    if (user && token) {
      getUser(user._id, dispatch);
      // getBlog(dispatch);
    }
  }, [dispatch, user]);

  return (
    <Fragment>
      <Header />
      {user &&
        location.pathname !== "/signup" &&
        location.pathname !== "/" &&
        location.pathname !== "/login" && <Fragment></Fragment>}
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route exact path="/about" element={<About />} />
        <Route exact path="/all-blogs" element={<AllBlogs />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/add-blog" element={<AddBlog />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/blog/:id" element={<UserBlog />} />
        <Route exact path="/edit-blog/:id" element={<EditBlog />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default App;
