import axios from "axios";

const apiUrlV1 = axios.create({
  baseURL: "http://localhost:4001/api/v1",
});

export default apiUrlV1;
