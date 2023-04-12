import React from "react";
import { Fragment, useEffect } from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/user/api";
// import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Header from "./components/common/heading/Header";
import CreateQuest from "./components/allquests/CreateQuest";
import AllQuests from "./components/allquests/AllQuests";
import UserContainer from "./components/user/UserContainer";
// import Head from "./components/common/heading/Head";
import Panel from "./components/panel/Panel";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import Instructions from "./components/instructions/Instructions";
import Leaderboard from "./components/leaderboard/Leaderboard";
import MyQuests from "./components/myquests/MyQuests";
import ProposedQuests from "./components/proposedquests/ProposedQuests";
import FinishedQuests from "./components/finisedquests/FinishedQuests";
import CompleteQuest from "./components/myquests/CompleteQuest";

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
      {user && (
        <Fragment>
          <Header />
          <Routes>
            <Route exact path="/users/:id" element={<UserContainer />} />
            <Route exact path="/panel" element={<Panel />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/edit-profile" element={<EditProfile />} />
            <Route exact path="/all-quests" element={<AllQuests />} />
            <Route exact path="/instructions" element={<Instructions />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/my-quests" element={<MyQuests />} />
            <Route exact path="/create-quest" element={<CreateQuest />} />
            <Route exact path="/proposed-quest" element={<ProposedQuests />} />
            <Route exact path="/finished-quests" element={<FinishedQuests />} />
            <Route
              exact
              path="/complete-quest/:id"
              element={<CompleteQuest />}
            />
          </Routes>
        </Fragment>
      )}
      {!user && (
        <Fragment>
          {/* <Head /> */}
          <Routes>
            {/* <Route path="/" exact element={<Home />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
