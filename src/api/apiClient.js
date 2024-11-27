import axios from "axios";
import { getEnvSafely } from "utils";


export const apiClient = axios.create({
  baseURL: getEnvSafely("REACT_APP_API_URL"),
  headers: {
    "Accept": "application/json",
  },
});

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
};
