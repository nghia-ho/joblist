import axios from "axios";
import { BASE_URL } from "./config";
const apiService = axios.create({
  baseURL: BASE_URL,
});
apiService.interceptors.request.use(
  (request) => {
    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("request error", error);
  }
);
apiService.interceptors.response.use(
  (request) => {
    console.log("Start response", request);
    return request;
  },
  function (error) {
    console.log("response error", error);
  }
);
export default apiService;
