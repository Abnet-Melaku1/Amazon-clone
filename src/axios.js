import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "https://amazon-backend-api-production.up.railway.app/",
});

export default instance;
