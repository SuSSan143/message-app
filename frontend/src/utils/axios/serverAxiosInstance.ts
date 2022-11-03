import axios from "axios";

const IS_BACKEND_LIVE = false;

const BASEURL = IS_BACKEND_LIVE
  ? import.meta.env.VITE_BACNEND_PROD
  : import.meta.env.VITE_BACNEND_DEV;

export default axios.create({
  baseURL: BASEURL,
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },
});
