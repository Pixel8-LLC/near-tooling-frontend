import axios from "axios";
import { API_ENDPOINT_URL } from "../../constants/default";
import getNTToken from "./getNTToken";

const ntAxios = axios.create({
  baseURL: API_ENDPOINT_URL,
  timeout: 1000,
  headers: {
    common: {
      Authorization: `bearer ${getNTToken()}`,
    },
  },
});

// axios.defaults.baseURL = API_ENDPOINT_URL;
// axios.defaults.headers.common["Authorization"] = `bearer ${AUTH_TOKEN}`;

export default ntAxios;
