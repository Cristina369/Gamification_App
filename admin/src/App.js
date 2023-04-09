import React from "react";
import { Fragment, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/user/api";
// import { getBlog } from "./redux/blog/api";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Header from "./components/common/heading/Header";
import Users from "./components/users/Users";
import Leaderboard from "./components/leaderboard/Leaderboard";
// import AllBlog from "./components/allblogs/AllBlogs";
// import Users from "./components/users/Users";
// import MyBlogs from "./components/blog/MyBlogs";
// import EditBlog from "./components/blog/EditBlog";
// import AddBlog from "./components/blog/AddBlog";
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
      {user && user.admin && (
        <Fragment>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />

            {/* <Route exact path="/my-blogs" element={<MyBlogs />} />
            <Route exact path="/blogs" element={<AllBlog />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/add-blog" element={<AddBlog />} />
            <Route exact path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/signup" element={<Login />} />
            <Route exact path="/blog/:id" element={<UserBlog />} /> */}
          </Routes>
        </Fragment>
      )}
      {!user && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default App;
