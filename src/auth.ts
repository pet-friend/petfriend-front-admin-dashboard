import type { AuthProvider } from "react-admin";
import axios, { isAxiosError, HttpStatusCode } from "axios";
import { USERS_API_URL } from "./util";

const axiosHeaders = axios.defaults.headers.common;

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await axios.post(`${USERS_API_URL}/login`, {
      email: username,
      password,
    });
    if (!response.data.admin)
      throw new Error("The logged in user is not an admin");
    axiosHeaders.Authorization = `Bearer ${response.data.token}`;
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("token", response.data.token);
  },
  logout: async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    if (axiosHeaders.Authorization) {
      try {
        await axios.post(`${USERS_API_URL}/logout`);
      } catch (error) {
        console.error("Failed to logout", error);
      }
      delete axiosHeaders.Authorization;
    }
  },
  checkAuth: async () => {
    if (!axiosHeaders.Authorization) {
      const token = localStorage.getItem("token");
      if (token) axiosHeaders.Authorization = `Bearer ${token}`;
    }
    return axiosHeaders.Authorization ? Promise.resolve() : Promise.reject();
  },
  checkError: (error: unknown) => {
    if (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      return Promise.reject(error);
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve({});
  },
  getIdentity: async () => {
    const response = await axios.get(`${USERS_API_URL}/users/me`);
    return {
      id: response.data.id,
      fullName: `${response.data.name} ${response.data.surname}`,
      avatar: response.data.image_url,
    };
  },
};
export default authProvider;
