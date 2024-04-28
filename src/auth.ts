import { AuthProvider } from "react-admin";
import axios from "axios";
import { USERS_API_URL } from "./util";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await axios.post(`${USERS_API_URL}/login`, {
      email: username,
      password,
    });
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    localStorage.setItem("userId", response.data.id);
  },
  logout: async () => {
    localStorage.removeItem("userId");
    if (axios.defaults.headers.common.Authorization) {
      await axios.post(`${USERS_API_URL}/logout`);
      delete axios.defaults.headers.common.Authorization;
    }
  },
  checkAuth: async () => {
    return axios.defaults.headers.common.Authorization
      ? Promise.resolve()
      : Promise.reject();
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
