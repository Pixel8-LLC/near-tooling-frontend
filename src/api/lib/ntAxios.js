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

export default ntAxios;
