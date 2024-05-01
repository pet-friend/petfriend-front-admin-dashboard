import type {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams,
} from "react-admin";
import axios from "axios";
import { USERS_API_URL } from "../util";

const userProvider: DataProvider<"users"> = {
  getList: async (_r: "users", { pagination, sort, filter }: GetListParams) => {
    const response = await axios.get(`${USERS_API_URL}/admin/users`, {
      params: {
        sort_by: sort.field,
        sort_order: sort.order.toLowerCase(),
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
        filters: JSON.stringify(filter),
      },
    });
    return {
      data: response.data.users,
      total: response.data.amount,
    };
  },
  getOne: async (_r: "users", { id }: GetOneParams) => {
    const r = await axios.get(`${USERS_API_URL}/users/${id}`);
    return { data: r.data };
  },
  getMany: async (_r: "users", params: GetManyParams) => {
    return {
      data: await Promise.all(
        params.ids.map((id) =>
          userProvider.getOne("users", { id }).then((r) => r.data),
        ),
      ),
    };
  },
  getManyReference: () => {
    throw new Error("Method not implemented.");
  },
  create: async (_r: "users", params: CreateParams) => {
    const r = await axios.post(`${USERS_API_URL}/users`, params.data);
    return { data: r.data };
  },
  update: async (_r: "users", params: UpdateParams) => {
    const r = await axios.put(
      `${USERS_API_URL}/admin/users/${params.id}`,
      params.data,
    );
    return { data: r.data };
  },
  updateMany: () => {
    throw new Error("Method not implemented.");
  },
  delete: async (_r: "users", params: DeleteParams) => {
    await axios.delete(`${USERS_API_URL}/admin/users/${params.id}`);
    return { data: params.previousData };
  },
  deleteMany: async (_r: "users", params: DeleteManyParams) => {
    await Promise.all(
      params.ids.map((id) => userProvider.delete("users", { id })),
    );
    return { data: params.ids };
  },
};

export default userProvider;
