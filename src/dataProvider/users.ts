import {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from "react-admin";
import axios from "axios";
import { USERS_API_URL } from "../util";

const userProvider: DataProvider<"user"> = {
  // @ts-ignore
  getList: async (resource: "user", { pagination }: GetListParams) => {
    const response = await axios.get<User[]>(`${USERS_API_URL}/users`);
    return {
      data: response.data.slice(
        (pagination.page - 1) * pagination.perPage,
        pagination.page * pagination.perPage,
      ),
      total: response.data.length,
    };
  },
  getOne: <T>(resource: "user", params: GetOneParams) => {
    console.log("getOne", resource, params);
    return Promise.resolve({ data: {} as T });
  },
  getMany: (resource: "user", params: GetManyParams) => {
    console.log("getMany", resource, params);
    return Promise.resolve({ data: [] });
  },
  getManyReference: (resource: "user", params: GetManyReferenceParams) => {
    console.log("getManyReference", resource, params);
    return Promise.resolve({ data: [], total: 0 });
  },
  create: <T>(resource: "user", params: CreateParams) => {
    console.log("create", resource, params);
    return Promise.resolve({ data: {} as T });
  },
  update: <T>(resource: "user", params: UpdateParams) => {
    console.log("update", resource, params);
    return Promise.resolve({ data: {} as T });
  },
  updateMany: (resource: "user", params: UpdateManyParams) => {
    console.log("updateMany", resource, params);
    return Promise.resolve({ data: [] });
  },
  delete: <T>(resource: "user", params: DeleteParams) => {
    console.log("delete", resource, params);
    return Promise.resolve({ data: {} as T });
  },
  deleteMany: (resource: "user", params: DeleteManyParams) => {
    console.log("deleteMany", resource, params);
    return Promise.resolve({ data: [] });
  },
};

export default userProvider;
