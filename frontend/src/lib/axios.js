import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  //Allows the browser to send cookies and authentication data along with the request.
  withCredentials: true,  // send cookies in every single request
});