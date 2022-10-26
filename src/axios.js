import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "https://wild-red-caterpillar-tie.cyclic.app/",
});

export default instance;
