import type {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  UpdateParams,
} from "react-admin";
import axios from "axios";
import { USERS_API_URL } from "../util";

const adminProvider: DataProvider<"admin"> = {
  getList: async () => {
    const response = await axios.get(`${USERS_API_URL}/admin`);
    return { data: response.data, total: response.data.length };
  },
  getOne: () => {
    throw new Error("Method not implemented.");
  },
  getMany: () => {
    throw new Error("Method not implemented.");
  },
  getManyReference: () => {
    throw new Error("Method not implemented.");
  },
  create: async (_r: "admin", params: CreateParams) => {
    const r = await axios.put(
      `${USERS_API_URL}/admin/${params.data.id}`,
      params.data,
    );
    return { data: r.data };
  },
  update: async (_r: "admin", params: UpdateParams) => {
    const r = await axios.put(
      `${USERS_API_URL}/admin/${params.id}`,
      params.data,
    );
    return { data: r.data };
  },
  updateMany: () => {
    throw new Error("Method not implemented.");
  },
  delete: async (_r: "admin", params: DeleteParams) => {
    const r = await axios.delete(`${USERS_API_URL}/admin/${params.id}`);
    return { data: r.data };
  },
  deleteMany: async (_r: "admin", params: DeleteManyParams) => {
    await Promise.all(
      params.ids.map((id) => adminProvider.delete("admin", { id })),
    );
    return { data: params.ids };
  },
};

export default adminProvider;
