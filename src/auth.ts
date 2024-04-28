import { AuthProvider } from "react-admin";
import axios from "axios";
import { USERS_API_URL } from "./util";

const axiosHeaders = axios.defaults.headers.common;

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await axios.post(`${USERS_API_URL}/login`, {
      email: username,
      password,
    });
    axiosHeaders.Authorization = `Bearer ${response.data.token}`;
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("token", response.data.token);
  },
  logout: async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    if (axiosHeaders.Authorization) {
      await axios.post(`${USERS_API_URL}/logout`);
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
  checkError: async (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === axios.HttpStatusCode.Unauthorized
    ) {
      throw error;
    }
  },
  getPermissions: async () => {
    return {};
  },
  getIdentity: async () => {
    const response = await axios.get<User>(`${USERS_API_URL}/users/me`);
    return {
      id: response.data.id,
      fullName: `${response.data.name} ${response.data.surname}`,
      avatar: response.data.image_url,
    };
  },
};
export default authProvider;
