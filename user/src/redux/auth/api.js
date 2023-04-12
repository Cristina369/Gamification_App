import axiosI from "axios";
import jwt_decode from "jwt-decode";
import { authStart, authSuccess, authFailure } from "./index";

const apiUrl = "http://localhost:8080/api";

export const auth = async (payload, dispatch) => {
  dispatch(authStart());
  try {
    const url = apiUrl + "/auth";
    const { data } = await axiosI.post(url, payload);

    const decodeData = jwt_decode(data.data);
    dispatch(authSuccess({ ...decodeData, token: data.data }));
    alert(data.message);
    window.location = "/profile";
    return true;
  } catch (error) {
    dispatch(authFailure());
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      alert(error.response.data.message);
    } else {
      console.log(error);
      alert("Something went wrong!");
    }
    return false;
  }
};
