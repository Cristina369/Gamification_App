import axiosI from "../axios";
import * as actions from "./index";

const apiUrl = "http://localhost:8080/api";

export const getUser = async (payload, dispatch) => {
  dispatch(actions.getUserStart());
  try {
    const { data } = await axiosI.get(apiUrl + `/users/${payload}`);
    dispatch(actions.getUserSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getUserFailure());
    return false;
  }
};

export const updateUser = async (payload, dispatch) => {
  dispatch(actions.updateUserStart());
  try {
    const url = apiUrl + `/users/${payload.id}`;
    const { data } = await axiosI.put(url, payload.data);
    dispatch(actions.updateUserSuccess(data.data));
    alert(data.message);
    return true;
  } catch (error) {
    dispatch(actions.updateUserFailure());
    return false;
  }
};

export const apBlogs = async (payload, dispatch) => {
  dispatch(actions.apBlogsStart());
  try {
    const { data } = await axiosI.put(apiUrl + `/blog/apr/${payload}`);
    dispatch(actions.apBlogsSuccess(payload));
    alert(data.message);
    return true;
  } catch (error) {
    dispatch(actions.apBlogsFailure());
    return false;
  }
};

export const getAllUsers = async (dispatch) => {
  dispatch(actions.getAllUsersStart());
  try {
    const { data } = await axiosI.get("/users");
    dispatch(actions.getAllUsersSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getAllUsersFailure());
    return false;
  }
};
