import axios from "axios";

let token = null;
const root = JSON.parse(window.localStorage.getItem("persist:root"));

if (root) {
  const { auth } = root;
  console.log(root + " - " + auth);
  const { user } = JSON.parse(auth);
  if (user) token = user.token;
}

const axiosI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token ? token : "",
  },
});

axiosI.interceptors.request.use(
  (req) => {
    return Promise.resolve(req);
  },
  (error) => {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      alert(error.response.data.message);
    } else {
      console.log(error);
      alert("Ceva a mers gresit!");
    }
    return Promise.reject(error);
  }
);

export default axiosI;
