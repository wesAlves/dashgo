import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const authApi = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["dashgo.token"]}`,
  },
});
