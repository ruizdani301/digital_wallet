import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const PROD = true;
export const SERVER_PROD = "https://jc123.pythonanywhere.com";
export const SERVER_LOCAL = "http://127.0.0.1:8000";

export const client = axios.create({
  baseURL: PROD ? SERVER_PROD : SERVER_LOCAL
});

const user = JSON.parse(localStorage.getItem("user"));

export const token = {
  headers: { Authorization: `Bearer ${user?.token}` }
};
